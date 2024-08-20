// "use client"

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import axios from 'axios';
// import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { CalendarIcon, UserIcon, EditIcon, TrashIcon } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/components/ui/use-toast";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";

// interface Blog {
//   id: string;
//   title: string;
//   smallDesc: string;
//   bigDesc: string;
//   coverImage: string | null;
//   coverImage1: string | null;
//   createdAt: string;
//   category: {
//     name: string;
//   };
//   user: {
//     name: string;
//   };
// }

// export default function BlogDetailPage() {
//   const { id } = useParams();
//   const [blog, setBlog] = useState<Blog | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();
//   const { toast } = useToast();

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const response = await axios.get(`/api/blogs/${id}`);
//         setBlog(response.data);
//       } catch (error) {
//         console.error('Error fetching blog:', error);
//         toast({
//           title: "Error",
//           description: "Failed to load blog post",
//           variant: "destructive",
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (id) {
//       fetchBlog();
//     }
//   }, [id, toast]);

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`/api/blogs/${id}`);
//       toast({
//         title: "Success",
//         description: "Blog post deleted successfully",
//       });
//       router.push('/blogs');
//     } catch (error) {
//       console.error('Error deleting blog:', error);
//       toast({
//         title: "Error",
//         description: "Failed to delete blog post",
//         variant: "destructive",
//       });
//     }
//   };

//   if (isLoading) {
//     return <BlogSkeleton />;
//   }

//   if (!blog) {
//     return <div>Blog not found</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Card className="overflow-hidden">
//         {blog.coverImage && (
//           <div className="relative h-96">
//             <img 
//               src={blog.coverImage} 
//               alt={blog.title} 
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//             <div className="absolute bottom-0 left-0 right-0 p-6">
//               <Badge className="mb-2">{blog.category.name}</Badge>
//               <h1 className="text-4xl font-bold text-white mb-2">{blog.title}</h1>
//               <div className="flex items-center space-x-4 text-white/80">
//                 <div className="flex items-center">
//                   <UserIcon className="h-4 w-4 mr-1" />
//                   <span>{blog.user.name}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <CalendarIcon className="h-4 w-4 mr-1" />
//                   <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//         <CardContent className="mt-6">
//           <p className="text-xl text-gray-700 mb-6">{blog.smallDesc}</p>
//           <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog.bigDesc }} />
//         </CardContent>
//         <CardFooter className="flex justify-between">
//           <Button variant="outline" onClick={() => router.push(`/blogs/${id}/edit`)}>
//             <EditIcon className="mr-2 h-4 w-4" /> Edit
//           </Button>
//           <AlertDialog>
//             <AlertDialogTrigger asChild>
//               <Button variant="destructive">
//                 <TrashIcon className="mr-2 h-4 w-4" /> Delete
//               </Button>
//             </AlertDialogTrigger>
//             <AlertDialogContent>
//               <AlertDialogHeader>
//                 <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//                 <AlertDialogDescription>
//                   This action cannot be undone. This will permanently delete your blog post.
//                 </AlertDialogDescription>
//               </AlertDialogHeader>
//               <AlertDialogFooter>
//                 <AlertDialogCancel>Cancel</AlertDialogCancel>
//                 <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
//               </AlertDialogFooter>
//             </AlertDialogContent>
//           </AlertDialog>
//         </CardFooter>
//       </Card>
//       {blog.coverImage1 && (
//         <Card className="mt-8">
//           <CardHeader>
//             <CardTitle>Additional Image</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <img 
//               src={blog.coverImage1} 
//               alt="Additional content" 
//               className="w-full h-auto object-cover rounded-lg"
//             />
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }

// function BlogSkeleton() {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Card>
//         <Skeleton className="w-full h-96" />
//         <CardContent className="mt-6">
//           <Skeleton className="h-8 w-3/4 mb-4" />
//           <Skeleton className="h-4 w-full mb-2" />
//           <Skeleton className="h-4 w-full mb-2" />
//           <Skeleton className="h-4 w-2/3" />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }