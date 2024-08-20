"use server"
import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: Request, { params }: { params: { id: string } }) {
  console.log('Categories GET route called');
  try {
    const categories = await prisma.category.findMany();
    console.log('Categories fetched:', categories);
    return NextResponse.json(categories);

    const blogs = await prisma.blog.findMany({
      where: { categoryId: params.id },
      include: { category: true }
    })
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}


