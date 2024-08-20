// app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Blog {
  id: string
  title: string
  smallDesc: string
  date: string // Add this to sort by date
  // Add other properties as needed
}

export default function BlogGrid() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setError(null)
      const response = await axios.get<Blog[]>('/api/blogs')
      // Sort blogs by date (newest first) and take only the first 5
      const sortedBlogs = response.data
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5)
      setBlogs(sortedBlogs)
    } catch (error) {
      console.error('Error fetching blogs:', error)
      setError('Failed to fetch blogs. Please try again later.')
    }
  }

  return (
    <div className="container mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold mb-6">Recent Blogs</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {blogs.length === 0 && !error ? (
        <p>No blogs found.</p>
      ) : (
        <Carousel className="w-full  mx-auto">
          <CarouselContent>
            {blogs.map((blog) => (
              <CarouselItem key={blog.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{blog.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{blog.smallDesc}</p>
                    <p className="text-sm text-gray-500 mt-2">{new Date(blog.date).toLocaleDateString()}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/blogs/${blog.id}`} passHref>
                      <Button variant="outline">Read More</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
        </Carousel>
      )}
      <div className="text-center mt-8">
        <Link href="/blogs" passHref>
          <Button className='bg-[#0841ae]'>View All Blogs</Button>
        </Link>
      </div>
    </div>
  )
}