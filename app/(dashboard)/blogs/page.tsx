// app/blogs/page.tsx
'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { CategoryFilter } from '@/components/CategoryFilter'

interface Blog {
  id: string
  title: string
  smallDesc: string
  // Add other properties as needed
}

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBlogs()
  }, [selectedCategories])

  const fetchBlogs = async () => {
    try {
      setError(null)
      let url = '/api/blogs'
      if (selectedCategories.length > 0) {
        url += `?categories=${selectedCategories.join(',')}`
      }
      const response = await axios.get<Blog[]>(url)
      setBlogs(response.data)
    } catch (error) {
      console.error('Error fetching blogs:', error)
      setError('Failed to fetch blogs. Please try again later.')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blog List</h1>
      <div className="flex">
        <div className="w-1/4">
          <CategoryFilter onFilter={setSelectedCategories} />
        </div>
        <div className="w-3/4">
          {error && <p className="text-red-500">{error}</p>}
          {blogs.length === 0 && !error ? (
            <p>No blogs found.</p>
          ) : (
            blogs.map((blog) => (
              <div key={blog.id} className="mb-4 p-4 border rounded">
                <h2 className="text-xl font-semibold">{blog.title}</h2>
                <p>{blog.smallDesc}</p>
                {/* Add more blog details and a link to the full blog */}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}