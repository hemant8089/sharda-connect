// src/types/post.ts

export interface Comment {
    id: string;
    author: {
      name?: string;
      email?: string;
    };
    content: string;
    createdAt: string;
    replies?: Comment[];
  }
  
  export interface Post {
    id: string;
    title: string;
    content: string;
    authorId: string;
    createdAt?: string;
    likes: number;
    comments: Comment[];
    shares: number;
    description?: string;
    mainImg?: string;
  }
  