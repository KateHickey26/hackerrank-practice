// Lamda hander to read and parse CSV file from S3
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { parseCsvText } from './parseCSV.js';

const s3 = new S3Client({}); // region picked from env or role

// Helper to convert S3 Body stream to string
async function streamToString(body) {
  if (typeof body === 'string') return body;
  if (Buffer.isBuffer(body)) return body.toString('utf8');
  const chunks = [];
  for await (const chunk of body) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString('utf8');
}

export const handler = async (event) => {
  // Accept either direct params or S3 event
  let bucket, key;

  // Direct invocation: { bucket, key }
  if (event?.bucket && event?.key) {
    bucket = event.bucket;
    key = event.key;
  } else if (event?.Records?.[0]?.s3) {
    // S3 Put trigger format
    bucket = event.Records[0].s3.bucket.name;
    key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
  } else {
    console.error('Bad event:', JSON.stringify(event));
    // can throw or return a structured error depending on integration
    return { ok: false, error: 'Missing bucket/key' };
  }

  try {
    const resp = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
    const contentType = resp.ContentType || '';
    // Optional: sanity check it looks like CSV
    if (!/csv|plain|text/i.test(contentType) && !key.toLowerCase().endsWith('.csv')) {
      console.warn(`Suspicious content-type for ${key}: ${contentType}`);
    }

    const text = await streamToString(resp.Body);
    const data = parseCsvText(text);

    // Return parsed data (or write somewhere, or enqueue)
    return { ok: true, bucket, key, count: data.length, data };
  } catch (err) {
    // Robust logging for CloudWatch
    console.error(`Failed to read/parse s3://${bucket}/${key}`, {
      name: err.name,
      message: err.message,
      code: err.$metadata?.httpStatusCode
    });
    // Choose: swallow vs. rethrow
    // - API Gateway integration: return error object
    // - S3 trigger: throw to signal retry (careful with poison files)
    return { ok: false, error: err.message, bucket, key };
  }
};