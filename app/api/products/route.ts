import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const skip = searchParams.get('skip') || '0';

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?limit=20&skip=${skip}`);
  if (!res.ok) {
    return new Response('Failed to fetch products', { status: 500 });
  }

  const data = await res.json();
  return Response.json(data);
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return new Response('Failed to create product', { status: 500 });
  }

  const result = await response.json();
  return Response.json(result);
}
