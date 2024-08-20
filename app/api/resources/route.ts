import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';


export async function GET(request: Request) {
  console.log('Resources GET route called');
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get('categoryId');

  try {
    const resources = await prisma.resource.findMany({
      where: categoryId ? { categoryId } : undefined,
      include: { category: true },
    });
    console.log('Resources fetched:', resources);
    return NextResponse.json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    return NextResponse.json({ error: 'Failed to fetch resources' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const resource = await prisma.resource.create({
      data: body,
    });
    return NextResponse.json(resource, { status: 201 });
  } catch (error) {
    console.error('Error creating resource:', error);
    return NextResponse.json({ error: 'Failed to create resource' }, { status: 500 });
  }
}