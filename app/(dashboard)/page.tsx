// pages/index.tsx
import React from 'react'
import Hero from '@/components/home/Hero'
import NewsGrid from '@/components/home/NewsGrid'
import ResourceGrid from '@/components/home/ResourceGrid'

const Home: React.FC = () => {
  return (
    <>
    <Hero />
    {/* <BlogGrid /> */}
    <NewsGrid />
    <ResourceGrid />
    </>
  )
}

export default Home