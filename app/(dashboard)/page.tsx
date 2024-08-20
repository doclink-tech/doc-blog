// pages/index.tsx
import React from 'react'
import NewsList from '../../components/NewsList'
import ResourceList from '@/components/ResoucesList'
import Hero from '@/components/home/Hero'
import BlogGrid from '@/components/home/BlogGrid'
import NewsGrid from '@/components/home/NewsGrid'
import ResourceGrid from '@/components/home/ResourceGrid'

const Home: React.FC = () => {
  return (
    <>
    <Hero />
    <BlogGrid />
    <NewsGrid />
    <ResourceGrid />
    </>
  )
}

export default Home