import { NextResponse } from 'next/server';
import { listObjects, BUCKET_NAME, endpointUrl } from '@/lib/minio';

export async function GET() {
  try {
    const objects = await listObjects();

    return NextResponse.json({
      success: true,
      bucket: BUCKET_NAME,
      endpoint: endpointUrl,
      objectCount: objects.length,
      objects: objects.slice(0, 10).map(obj => ({
        key: obj.Key,
        size: obj.Size,
        lastModified: obj.LastModified,
      })),
    });
  } catch (error) {
    console.error('MinIO connection error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      endpoint: endpointUrl,
    }, { status: 500 });
  }
}
