"use client"

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from 'next-cloudinary';

const BlogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  smallDesc: z.string().min(1, "Small description is required"),
  categoryId: z.string().min(1, "Category is required"),
  bigDesc: z.string().min(1, "Content is required"),
  coverImage: z.string().optional(),
  coverImage1: z.string().optional(),
});

type BlogFormData = z.infer<typeof BlogSchema>;

type Category = {
  id: string;
  name: string;
};

export function BlogForm({
  onSubmitSuccess,
}: {
  onSubmitSuccess?: () => void;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [coverImage1, setCoverImage1] = useState<string | null>(null);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BlogFormData>({
    resolver: zodResolver(BlogSchema),
  });

  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const onSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/blogs", {
        ...data,
        coverImage,
        coverImage1,
      });
      router.push(`/blogs/${response.data.id}`);
      console.log("Blog created:", response.data);

      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      console.error("Error creating blog:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (result: any, setter: (url: string) => void) => {
    console.log(result);
    setter(result.info.secure_url);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title
        </label>
        <Input
          id="title"
          {...register("title")}
          placeholder="Enter your blog title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && (
          <span className="text-red-500 text-sm mt-1">{errors.title.message}</span>
        )}
      </div>

      <div>
        <label
          htmlFor="smallDesc"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Small Description
        </label>
        <Textarea
          id="smallDesc"
          {...register("smallDesc")}
          placeholder="Write a brief description"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
        {errors.smallDesc && (
          <span className="text-red-500 text-sm mt-1">
            {errors.smallDesc.message}
          </span>
        )}
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Category
        </label>
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.categoryId && (
          <span className="text-red-500 text-sm mt-1">
            {errors.categoryId.message}
          </span>
        )}
      </div>

      <div>
        <label
          htmlFor="bigDesc"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Content
        </label>
        <Textarea
          id="bigDesc"
          {...register("bigDesc")}
          placeholder="Write your blog content"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={10}
        />
        {errors.bigDesc && (
          <span className="text-red-500 text-sm mt-1">
            {errors.bigDesc.message}
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cover Image
        </label>
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          onUpload={(result) => handleImageUpload(result, setCoverImage)}
        >
          {({ open }) => {
            return (
              <button
                type="button"
                onClick={() => open()}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Upload Cover Image
              </button>
            );
          }}
        </CldUploadWidget>
        {coverImage && (
          <img src={coverImage} alt="Cover" className="mt-2 max-w-xs" />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Secondary Cover Image
        </label>
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          onUpload={(result) => handleImageUpload(result, setCoverImage1)}
        >
          {({ open }) => {
            return (
              <button
                type="button"
                onClick={() => open()}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Upload Secondary Cover Image
              </button>
            );
          }}
        </CldUploadWidget>
        {coverImage1 && (
          <img src={coverImage1} alt="Secondary Cover" className="mt-2 max-w-xs" />
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating Blog..." : "Create Blog"}
      </Button>
    </form>
  );
}