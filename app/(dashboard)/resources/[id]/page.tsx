'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

interface Resource {
  id: string
  title: string
  description: string
  bigDescription: string
  url: string
  imageUrl?: string
  category: {
    name: string
  }
}

export default function ResourcePage({ params }: { params: { id: string } }) {
  const [resource, setResource] = useState<Resource | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await fetch(`/api/resources/${params.id}`)
        if (!response.ok) throw new Error('Failed to fetch resource')
        const data = await response.json()
        setResource(data)
      } catch (error) {
        console.error('Error fetching resource:', error)
        router.push('/404')
      } finally {
        setIsLoading(false)
      }
    }

    fetchResource()
  }, [params.id, router])

  if (isLoading) {
    return <ResourceSkeleton />
  }

  if (!resource) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        <CardHeader className="relative h-64">
          {resource.imageUrl ? (
            <Image
              src={resource.imageUrl}
              alt={resource.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500" />
          )}
          <CardTitle className="absolute bottom-4 left-4 text-3xl font-bold text-white drop-shadow-lg">
            {resource.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-4">
          <p className="text-lg mb-4 font-semibold text-gray-700">{resource.description}</p>
          <div className="mb-4">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
              {resource.category.name}
            </span>
          </div>
          <div className="prose max-w-none">
            {resource.bigDescription.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button asChild variant="default">
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              Visit Resource
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link href="/resources">Back to List</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function ResourceSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        <CardHeader className="relative h-64">
          <Skeleton className="absolute inset-0" />
        </CardHeader>
        <CardContent className="mt-4">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/4 mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </CardFooter>
      </Card>
    </div>
  )
}