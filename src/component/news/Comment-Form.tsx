"use client";
import React, { useState } from 'react';
import SubmitButton from '../user/SubmitButton';
import { useRouter } from "next/navigation";
import { ErrorToast, IsEmpty, SuccessToast } from "@/utility/FormHelper";

// Define types for props and state
interface CommentFormProps {
  postId: number;
}

interface CommentFormData {
  postId: number;
  description: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const router = useRouter();
  const [data, setData] = useState<CommentFormData>({ postId, description: "" });
  const [submit, setSubmit] = useState<boolean>(false);

  const inputOnChange = (name: keyof CommentFormData, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formSubmit = async () => {
    if (IsEmpty(data.description)) {
      ErrorToast("Description Required!");
    } else {
      setSubmit(true);
      const options: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };
      const res = await (await fetch("/api/comment/manage", options)).json();
      setSubmit(false);

      if (res['status'] === "success") {
        SuccessToast("Request Completed");
        router.refresh();
      } else {
        router.replace("/user/login");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="w-full max-w-lg mx-auto">
        <h5 className="text-lg font-semibold mb-3">Write Yours</h5>
        <textarea
          value={data.description}
          rows={6}
          onChange={(e) => inputOnChange('description', e.target.value)}
          className="w-full p-2 border rounded-md mb-2 resize-none"
        />
        <SubmitButton
          onClick={formSubmit}
          className={`w-full py-2 px-4 bg-red-400 text-white font-semibold rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 ${submit ? 'opacity-50 cursor-not-allowed' : ''}`}
          submit={submit}
          text={submit ? 'Submitting...' : 'Submit'}
        />
      </div>
    </div>
  );
};

export default CommentForm;
