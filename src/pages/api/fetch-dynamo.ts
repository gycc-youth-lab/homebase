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
    if (!req.query.bucketName) {
        res.status(400).json({ error: 'bucketName is required' });
        return
    }
    const bucketName = req.query.bucketName as string;
    const queryParams: {
        TableName: string;
        KeyConditionExpression: string;
        ExpressionAttributeValues: { ":bucketName": { S: string } };
        ScanIndexForward: boolean;
    } = {
        TableName: 'gycc-db-metadata',
        KeyConditionExpression: "bucketName = :bucketName",
        ExpressionAttributeValues: {
            ":bucketName": { S: bucketName },
        },
        ScanIndexForward: true,
    }
    try {
        const command = new QueryCommand(queryParams);
        const {Items } = await db.send(command);
        const imageObj = Items?.map((item) => unmarshall(item)) || [];
        const count = imageObj?.length;
        imageObj.sort((a, b) => (a.filePath.split('.')[0]) - (b.filePath.split('.')[0])) // sort by fileName number
        const returnData = {
            images: imageObj,
            count,
        }
        res.status(200).json(returnData);
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        res.status(500).json({ 'error': (error as any).message });
    }
}

export default FetchDynamo;