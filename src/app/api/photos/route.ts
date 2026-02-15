import { NextRequest, NextResponse } from 'next/server';
import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
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

// Image file extensions to filter
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];

function isImageFile(key: string): boolean {
  const lowerKey = key.toLowerCase();
  return IMAGE_EXTENSIONS.some(ext => lowerKey.endsWith(ext));
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const prefix = searchParams.get('bucketName') || searchParams.get('prefix');

  if (!prefix) {
    return NextResponse.json(
      { error: 'Missing bucketName or prefix parameter' },
      { status: 400 }
    );
  }

  try {
    const allImages: { uuid: string; url: string; filePath: string }[] = [];
    let continuationToken: string | undefined;

    // Paginate through all objects with this prefix
    do {
      const command = new ListObjectsV2Command({
        Bucket: MINIO_BUCKET,
        Prefix: prefix.endsWith('/') ? prefix : `${prefix}/`,
        ContinuationToken: continuationToken,
        MaxKeys: 1000,
      });

      const response = await minioClient.send(command);

      if (response.Contents) {
        for (const obj of response.Contents) {
          if (obj.Key && isImageFile(obj.Key)) {
            // Generate presigned URL (valid for 1 hour)
            const command = new GetObjectCommand({
              Bucket: MINIO_BUCKET,
              Key: obj.Key,
            });
            const presignedUrl = await getSignedUrl(minioClient, command, { expiresIn: 3600 });

            allImages.push({
              uuid: obj.ETag?.replace(/"/g, '') || obj.Key,
              url: presignedUrl,
              filePath: obj.Key,
            });
          }
        }
      }

      continuationToken = response.IsTruncated ? response.NextContinuationToken : undefined;
    } while (continuationToken);

    // Sort images naturally (1-1, 1-2, ... 1-10, 1-11)
    allImages.sort((a, b) => {
      return a.filePath.localeCompare(b.filePath, undefined, { numeric: true, sensitivity: 'base' });
    });

    return NextResponse.json({
      images: allImages,
      count: allImages.length,
    });
  } catch (error) {
    console.error('Error fetching photos from MinIO:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch photos' },
      { status: 500 }
    );
  }
}
