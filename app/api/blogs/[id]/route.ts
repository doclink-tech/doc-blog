import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import prisma from '@/lib/db'
import { auth } from '@clerk/nextjs/server'


const BlogUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  smallDesc: z.string().min(1).optional(),
  categoryId: z.string().cuid().optional()
})

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const validatedData = BlogUpdateSchema.parse(body)
    const blog = await prisma.blog.findUnique({ where: { id: params.id } })
    
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 })
    }
    if (blog.userId !== userId) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    const updatedBlog = await prisma.blog.update({
      where: { id: params.id },
      data: validatedData
    })
    return NextResponse.json(updatedBlog)
  } catch (error) {
    return NextResponse.json({ message: 'Invalid data', error }, { status: 400 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const blog = await prisma.blog.findUnique({ where: { id: params.id } })
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 })
    }
    if (blog.userId !== userId) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    await prisma.blog.delete({ where: { id: params.id } })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting blog', error }, { status: 500 })
  }
}