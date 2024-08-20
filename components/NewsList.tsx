"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

type News = {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  publishedAt: Date;
  categoryId: string;
  category: { id: string; name: string };
  href: string;
};

type Category = {
  id: string;
  name: string;
};

const NewsList: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/news");
        if (response.ok) {
          const data = await response.json();
          setNews(data);
        } else {
          console.error("Failed to fetch news");
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredNews =
    selectedCategories.length > 0
      ? news.filter((item) => selectedCategories.includes(item.categoryId))
      : news;

  const NewsSkeleton = () => (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <Skeleton className="h-40 sm:h-48 w-full" />
      </CardHeader>
      <CardContent className="p-3 sm:p-4">
        <Skeleton className="h-5 sm:h-6 w-3/4 mb-2" />
        <Skeleton className="h-3 sm:h-4 w-full mb-3 sm:mb-4" />
        <Skeleton className="h-3 sm:h-4 w-1/4" />
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Latest News</h2>
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
            <NewsSkeleton />
            <NewsSkeleton />
            <NewsSkeleton />
            <NewsSkeleton />
            <NewsSkeleton />
            <NewsSkeleton />
          </>
        ) : (
          filteredNews.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="p-0">
                {item.imageUrl && (
                  <div className="relative h-40 sm:h-48 w-full">
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
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-3">
                  {item.content}
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                  <Badge variant="secondary" className="text-xs sm:text-sm w-fit">{item.category.name}</Badge>
                  <span className="text-xs sm:text-sm text-gray-500">
                    {new Date(item.publishedAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="p-3 sm:p-4 pt-0">
                <Link href={item.href} className="w-full">
                  <button className="w-full bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base hover:bg-blue-600 transition-colors duration-300">
                    Read More
                  </button>
                </Link>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default NewsList;