'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Resource } from '@prisma/client'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const ResourceList: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/resources?limit=6')
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

  const ResourceSkeleton = () => (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <Skeleton className="h-6 w-2/3" />
      </CardHeader>
      <CardContent className="flex-grow">
        <Skeleton className="h-40 w-full mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-4 w-24" />
      </CardFooter>
    </Card>
  )

  return (
    <div className="w-full container mx-auto px-4 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Featured Resources</h2>
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 sm:-ml-4">
          {isLoading
            ? Array(6).fill(0).map((_, index) => (
                <CarouselItem key={index} className="pl-2 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <ResourceSkeleton />
                </CarouselItem>
              ))
            : resources.map((item) => (
                <CarouselItem key={item.id} className="pl-2 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-lg sm:text-xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      {item.imageUrl && (
                        <div className="mb-4 relative w-full h-40 sm:h-48">
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className="rounded object-cover"
                          />
                        </div>
                      )}
                      <p className="line-clamp-3 text-sm sm:text-base">{item.description}</p>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-2">
                      <Link href={`/resources/${item.id}`}>
                        <Button variant="outline" size="sm">Learn More</Button>
                      </Link>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline text-xs sm:text-sm"
                      >
                        Visit Resource
                      </a>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))
          }
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex -left-4" />
        <CarouselNext className="hidden sm:flex -right-4" />
      </Carousel>
      <div className="mt-8 text-center">
        <Link href="/resources">
          <Button className='bg-[#0841ae] w-full sm:w-auto'>View All Resources</Button>
        </Link>
      </div>
    </div>
  )
}

export default ResourceList