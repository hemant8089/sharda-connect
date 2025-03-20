// src/components/CommentSection.tsx

"use client";
import { useState } from "react";

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

interface CommentSectionProps {
  comments: Comment[];
}

interface ReplyContents {
  [key: string]: string;
}

export default function CommentSection({ comments }: CommentSectionProps) {
    const [replyContents, setReplyContents] = useState<ReplyContents>({});

const handleReply = (commentId: string, content: string): void => {
    // Implement actual reply submission
    console.log(`Replying to ${commentId}: ${content}`);
};

const CommentItem = ({ comment, depth = 0 }: { comment: Comment; depth?: number }) => {
    const [showReply, setShowReply] = useState(false);
    
    return (
        <div className={`ml-${depth * 4} mt-2`}>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  {comment.author.name || comment.author.email}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
                </div>
            <button
              className="text-blue-600 text-sm hover:underline"
              onClick={() => setShowReply(!showReply)}
            >
              Reply
            </button>
          </div>
          <p className="mt-1">{comment.content}</p>
        </div>

        {showReply && (
          <div className="mt-2 ml-4">
            <textarea
              value={replyContents[comment.id] || ""}
              onChange={(e) =>
                setReplyContents((prev) => ({
                  ...prev,
                  [comment.id]: e.target.value,
                }))
              }
              placeholder="Write a reply..."
              className="w-full p-2 border rounded-lg mb-2"
              rows={2}
            />
            <button
              onClick={() => handleReply(comment.id, replyContents[comment.id])}
              className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700"
            >
              Post Reply
            </button>
          </div>
        )}

        {comment.replies?.map((reply) => (
          <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Comments ({comments.length})</h3>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}