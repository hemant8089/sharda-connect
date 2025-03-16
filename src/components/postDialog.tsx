import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import axios from "axios";
import Skeleton from "./ui/Skeleton";
import { AnyARecord } from "node:dns";

// const postId = "67d039a94378947fbb9aff73";

interface Post {
  id: string;
  title: string;
  mainImg: string;
  description: string;
  secondaryImg: string[];
  secondaryDesc: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: { id: string; name: string; email: string };
}

export default function PostDialog({openPostDialog,setOpenPostDialog,postId}:any) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
//   const [openPostDialog , setOpenPostDialog] = useState<boolean>(openPostDialog);
 console.log("postId",postId)
  useEffect(() => {
    if (openPostDialog) {
      fetchPost();
    }
  }, [openPostDialog]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/api/group/getPostById", { postId });
      setPost(response.data.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpenPostDialog(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
        View Post
      </Button>

      <Dialog open={openPostDialog} onOpenChange={setOpenPostDialog}>
        <DialogContent className="max-w-3xl rounded-2xl bg-white shadow-lg">
          {loading ? (
            <div className="p-6">
              <Skeleton className="h-6 w-48 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-64 w-full mb-4" />
            </div>
          ) : post ? (
            <div className="p-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{post.title}</DialogTitle>
              </DialogHeader>

              {post.mainImg && (
                <img src={post.mainImg} alt="Post Image" className="w-full rounded-lg shadow-md mt-4" />
              )}

              <p className="text-gray-600 mt-4">{post.description}</p>

              {post.secondaryImg.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {post.secondaryImg.map((img, index) => (
                    <img key={index} src={img} alt="Secondary" className="rounded-md shadow-md" />
                  ))}
                </div>
              )}

              {post.content && (
                <div
                  className="mt-4 p-4 bg-gray-100 rounded-md shadow-sm"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              )}

              <div className="mt-6 text-sm text-gray-500">
                <p>By: <span className="font-medium">{post.author?.name}</span> ({post.author?.email})</p>
                <p className="mt-1">Published: {new Date(post.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ) : (
            <p className="text-center p-6 text-gray-500">Post not found.</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
