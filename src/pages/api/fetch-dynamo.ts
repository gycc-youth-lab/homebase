import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

import type { NextApiRequest, NextApiResponse } from "next";


const db = new DynamoDBClient({
    region: process.env.AWS_REGION, // Use region from env
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

const FetchDynamo = async (req: NextApiRequest, res: NextApiResponse) => {
    const {lastEvaluatedKey, bucketName } = req.query;
    if (typeof bucketName !== 'string') {
        res.status(400).json({ error: 'bucketName is required' });
        return
    }
    const queryParams: {
        TableName: string;
        Limit: number;
        KeyConditionExpression: string;
        ExpressionAttributeValues: { ":bucketName": { S: string } };
        ExclusiveStartKey?: { id: { S: string } };
    } = {
        TableName: 'GYCC-db-metadata',
        Limit: 20,
        KeyConditionExpression: "bucketName = :bucketName",
        ExpressionAttributeValues: {
            ":bucketName": { S: bucketName }, // TODO: use bucket name passed in by component
        },
    }
    if (lastEvaluatedKey) {
        queryParams.ExclusiveStartKey = { id: { S: lastEvaluatedKey as string } }
    }
    try {
        // const command = new ScanCommand(params);
        const command = new QueryCommand(queryParams);
        const {Items} = await db.send(command);
        const data = Items?.map((item) => unmarshall(item));
        console.log('Fetched data');
        res.status(200).json(data);
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        res.status(500).json({ 'error': (error as any).message });
    }
}

export default FetchDynamo;