// // app/api/blogs/route.ts
// import { NextResponse } from 'next/server';
// import prisma from '@/lib/db';
// import { auth } from '@clerk/nextjs/server';

// export async function POST(request: Request) {
//   try {

//     const { userId } = auth()

//     if(!userId) {
//       return new Error("unauthorized")
//     }

//     const body = await request.json();
//     const { title, smallDesc, categoryId, bigDesc, coverImage, coverImage1 } = body;

//     const blog = await prisma.blog.create({
//       data: {
//         title,
//         smallDesc,
//         categoryId,
//         bigDesc,
//         coverImage,
//         coverImage1,
//         userId: userId
//       }
//     });

//     return NextResponse.json(blog);
//   } catch (error) {
//     console.error('Error creating blog:', error);
//     return NextResponse.json({ message: 'Error creating blog', error }, { status: 500 });
//   }
// }

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const categories = searchParams.get('categories')?.split(',') || [];

//   try {
//     const blogs = await prisma.blog.findMany({
//       where: categories.length > 0 ? {
//         categoryId: {
//           in: categories
//         }
//       } : undefined,
//       include: {
//         category: true
//       }
//     });
//     return NextResponse.json(blogs);
//   } catch (error) {
//     console.error('Error fetching blogs:', error);
//     return NextResponse.json({ message: 'Error fetching blogs', error }, { status: 500 });
//   }
// }