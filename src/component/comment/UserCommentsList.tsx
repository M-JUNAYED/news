"use client";
import React from 'react';
import { ErrorToast, SuccessToast } from "@/utility/FormHelper";
import { useRouter } from "next/navigation";

interface Comment {
    id: number;
    descriptions: string;
    news_list: {
        title: string;
    };
}

interface UserCommentsListProps {
    data: Comment[];
}

const UserCommentsList: React.FC<UserCommentsListProps> = (props) => {
    const router = useRouter();

    const onDelete = async (id: number) => {
        const options = { method: 'DELETE', body: JSON.stringify({ id }) };
        let res = await (await fetch("/api/comment/manage", options)).json();
        if (res.status === "success") {
            SuccessToast("Request Completed");
            router.refresh();
        } else {
            ErrorToast("Invalid Request");
        }
    };

    return (
        <div className="container mx-auto mt-3">
            <div className="flex flex-col">
                <div className="w-full">
                    <div className="card py-2">
                        <ul className="list-group bg-transparent list-group-flush">
                            {props.data.map((item, i) => (
                                <li key={i} className="list-group-item bg-transparent">
                                    <h6 className="text-dark">
                                        <i className="bi bi-newspaper"></i> {item.news_list.title}
                                    </h6>
                                    <p className="text-secondary">{item.descriptions}</p>
                                    <button onClick={() => onDelete(item.id)} className="btn btn-danger btn-sm px-2">Remove</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCommentsList;
