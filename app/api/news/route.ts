import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';


export async function GET(request: Request) {
  console.log('News GET route called');
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get('categoryId');

  try {
    const news = await prisma.news.findMany({
      where: categoryId ? { categoryId } : undefined,
      include: { category: true },
    });
    console.log('News fetched:', news);
    return NextResponse.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newsItem = await prisma.news.create({
      data: body,
    });
    return NextResponse.json(newsItem, { status: 201 });
  } catch (error) {
    console.error('Error creating news item:', error);
    return NextResponse.json({ error: 'Failed to create news item' }, { status: 500 });
  }
}