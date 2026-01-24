import { S3Client, ListObjectsV2Command, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// MinIO Configuration
const MINIO_ENDPOINT = process.env.MINIO_ENDPOINT || 'gycc-objects.zeabur.app';
const MINIO_PORT = process.env.MINIO_PORT || '443';
const MINIO_USE_SSL = process.env.MINIO_USE_SSL !== 'false';

// Build endpoint URL - only include port if non-standard
const protocol = MINIO_USE_SSL ? 'https' : 'http';
const isStandardPort = (MINIO_USE_SSL && MINIO_PORT === '443') || (!MINIO_USE_SSL && MINIO_PORT === '80');
const endpointUrl = isStandardPort
  ? `${protocol}://${MINIO_ENDPOINT}`
  : `${protocol}://${MINIO_ENDPOINT}:${MINIO_PORT}`;

// MinIO is S3-compatible, so we use the AWS SDK
const minioClient = new S3Client({
  endpoint: endpointUrl,
  region: 'us-east-1', // MinIO doesn't use regions, but the SDK requires one
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY || '',
    secretAccessKey: process.env.MINIO_SECRET_KEY || '',
  },
  forcePathStyle: true, // Required for MinIO
});

const BUCKET_NAME = process.env.MINIO_BUCKET || 'zeabur';

export async function listObjects(prefix?: string) {
  const command = new ListObjectsV2Command({
    Bucket: BUCKET_NAME,
    Prefix: prefix,
  });

  const response = await minioClient.send(command);
  return response.Contents || [];
}

export async function getObject(key: string) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  return minioClient.send(command);
}

export async function getPresignedUrl(key: string, expiresIn = 3600) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  return getSignedUrl(minioClient, command, { expiresIn });
}

export async function uploadObject(key: string, body: Buffer | Uint8Array | string, contentType?: string) {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: body,
    ContentType: contentType,
  });

  return minioClient.send(command);
}

export function getPublicUrl(key: string) {
  return `${endpointUrl}/${BUCKET_NAME}/${key}`;
}

export { minioClient, BUCKET_NAME, MINIO_ENDPOINT, MINIO_PORT, endpointUrl };
