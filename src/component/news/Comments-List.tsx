"use client";
import React, { useState } from 'react';
import CommentForm from './Comment-Form';

interface Comment {
    user: {
        firstName: string;
    };
    description: string;
}

interface CommentsListProps {
    data: Comment[];
    postId: number;
}

const CommentsList: React.FC<CommentsListProps> = ({ data, postId }) => {
    const [key, setKey] = useState<string>("Comment");

    return (
        <div className="container mx-auto">
            <div className="mb-3">
                <ul className="flex border-b">
                    <li className={`cursor-pointer ${key === "Comment" ? "border-b-2 border-blue-500" : ""}`}
                        onClick={() => setKey("Comment")}>
                        Comment
                    </li>
                    <li className={`cursor-pointer ml-4 ${key === "Create" ? "border-b-2 border-blue-500" : ""}`}
                        onClick={() => setKey("Create")}>
                        Create
                    </li>
                </ul>
            </div>

            {key === "Comment" && (
                <ul className="space-y-4">
                    {data.map((item, i) => (
                        <li key={i} className="p-4 border rounded bg-white shadow-sm">
                            <h6 className="text-gray-900 flex items-center">
                                <i className="bi bi-person-circle mr-2"></i> {item.user.firstName}
                            </h6>
                            <p className="text-gray-600">{item.description}</p>
                        </li>
                    ))}
                </ul>
            )}

            {key === "Create" && (
                <CommentForm postId={postId} />
            )}
        </div>
    );
};

export default CommentsList;
