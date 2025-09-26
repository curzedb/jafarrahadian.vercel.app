
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function GET() {

  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    console.error("Vercel KV Credential not found.");
    return new NextResponse('KV environment variables not configured.', { status: 500 });
  }

  try {
    const views = await kv.incr('portfolio-views');
    return NextResponse.json({ views });
  } catch (error) {
    console.error("Failed connected to Vercel KV:", error);
    return new NextResponse('Internal Server Error: Failed to connect to KV store.', { status: 500 });
  }
}