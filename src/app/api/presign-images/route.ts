import { NextRequest, NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// MinIO client configuration
const MINIO_ENDPOINT = process.env.MINIO_ENDPOINT || 'gycc-objects.zeabur.app';
const MINIO_PORT = process.env.MINIO_PORT || '443';
const MINIO_USE_SSL = process.env.MINIO_USE_SSL !== 'false';
const MINIO_BUCKET = process.env.MINIO_BUCKET || 'zeabur';

const protocol = MINIO_USE_SSL ? 'https' : 'http';
const isStandardPort = (MINIO_USE_SSL && MINIO_PORT === '443') || (!MINIO_USE_SSL && MINIO_PORT === '80');
const endpointUrl = isStandardPort
  ? `${protocol}://${MINIO_ENDPOINT}`
  : `${protocol}://${MINIO_ENDPOINT}:${MINIO_PORT}`;

const minioClient = new S3Client({
  endpoint: endpointUrl,
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY || '',
    secretAccessKey: process.env.MINIO_SECRET_KEY || '',
  },
  forcePathStyle: true,
});

async function getPresignedUrl(key: string): Promise<string | null> {
  try {
    const command = new GetObjectCommand({
      Bucket: MINIO_BUCKET,
      Key: key,
    });
    return await getSignedUrl(minioClient, command, { expiresIn: 3600 });
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { keys } = await request.json();

    if (!keys || !Array.isArray(keys)) {
      return NextResponse.json(
        { error: 'Missing or invalid keys array' },
        { status: 400 }
      );
    }

    // Limit to prevent abuse
    if (keys.length > 100) {
      return NextResponse.json(
        { error: 'Too many keys requested (max 100)' },
        { status: 400 }
      );
    }

    const urls: Record<string, string | null> = {};

    await Promise.all(
      keys.map(async (key: string) => {
        urls[key] = await getPresignedUrl(key);
      })
    );

    return NextResponse.json({ urls });
  } catch (error) {
    console.error('Error presigning images:', error);
    return NextResponse.json(
      { error: 'Failed to presign images' },
      { status: 500 }
    );
  }
}
