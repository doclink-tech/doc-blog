'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

type Resource = {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string | null;
  publishedAt: Date;
  categoryId: string;
  category: { id: string; name: string };
}

type Category = {
  id: string;
  name: string;
}

const ResourceList: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        if (response.ok) {
          const data = await response.json()
          setCategories(data)
        } else {
          console.error('Failed to fetch categories')
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/resources')
        if (response.ok) {
          const data = await response.json()
          setResources(data)
        } else {
          console.error('Failed to fetch resources')
        }
      } catch (error) {
        console.error('Error fetching resources:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchResources()
  }, [])

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const filteredResources = selectedCategories.length > 0
    ? resources.filter(resource => selectedCategories.includes(resource.categoryId))
    : resources

  const ResourceSkeleton = () => (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <Skeleton className="h-32 sm:h-40 md:h-48 w-full" />
      </CardHeader>
      <CardContent className="p-3 sm:p-4">
        <Skeleton className="h-5 sm:h-6 w-3/4 mb-2" />
        <Skeleton className="h-3 sm:h-4 w-full mb-3 sm:mb-4" />
        <Skeleton className="h-3 sm:h-4 w-1/4" />
      </CardContent>
      <CardFooter className="p-3 sm:p-4 pt-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-8 sm:h-10 w-full sm:w-1/3" />
      </CardFooter>
    </Card>
  )

  return (
    <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Discover Resources</h2>
      <div className="mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Filter by Category</h3>
        <div className="flex flex-wrap gap-2 sm:gap-4">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => handleCategoryChange(category.id)}
              />
              <label
                htmlFor={category.id}
                className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {isLoading ? (
          <>
            <ResourceSkeleton />
            <ResourceSkeleton />
            <ResourceSkeleton />
            <ResourceSkeleton />
            <ResourceSkeleton />
            <ResourceSkeleton />
          </>
        ) : (
          filteredResources.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0">
                {item.imageUrl && (
                  <div className="relative h-32 sm:h-40 md:h-48 w-full">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-3 sm:p-4">
                <CardTitle className="text-lg sm:text-xl mb-2">{item.title}</CardTitle>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-3">{item.description}</p>
                <Badge variant="secondary" className="text-xs sm:text-sm">
                  {item.category.name}
                </Badge>
              </CardContent>
              <CardFooter className="p-3 sm:p-4 pt-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                <Link href={`/resources/${item.id}`} className="text-blue-500 hover:underline text-sm sm:text-base">
                  Learn More
                </Link>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-full text-center text-sm sm:text-base hover:bg-blue-600 transition-colors duration-300"
                >
                  Visit Resource
                </a>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default ResourceList