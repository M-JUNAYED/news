'use client'
import { useState } from 'react';
import { ErrorToast, IsEmail, SuccessToast } from '@/utility/FormHelper';
import SubmitButton from '../user/SubmitButton';

interface FormData {
  email: string;
}

const Subscribe = () => {
  const [data, setData] = useState<FormData>({ email: "" });
  const [submit, setSubmit] = useState<boolean>(false);

  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formSubmit = async () => {
    if (IsEmail(data.email)) {
      ErrorToast("Valid Email Address Required!");
    } else {
      setSubmit(true);
      const options: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };
  
      try {
        const res = await fetch("/api/subscribe", options);
  
        if (res.ok) {
          const result = await res.json();
          
          // Allow for a case-insensitive check and also handle common typos
          const status = result.status.toLowerCase();
          
          if (status === "success") {
            SuccessToast("Request Success");
          } else {
            ErrorToast("Email Already Used!");
          }
        } else {
          ErrorToast("Failed to submit the form. Please try again.");
        }
        
      } catch (error) {
        ErrorToast("An error occurred. Please try again later.");
      } finally {
        setSubmit(false);
        setData({ email: "" });
      }
    }
  };
  

  return (
    <div className="p-3 shadow-sm bg-white rounded-t-lg rounded-b-lg">
      <div className="text-center text-gray-500 text-5xl mb-3">
        <i className="bi bi-envelope"></i>
      </div>
      <h6 className="text-center mb-3 mt-0 text-lg font-medium">Newsletter</h6>
      <input
        value={data.email}
        onChange={inputOnChange}
        type="text"
        name="email"
        placeholder="Email Address"
        className="form-control mb-3 w-full p-2 border border-gray-300 rounded-md"
      />
      <SubmitButton
        onClick={formSubmit}
        className="btn btn-danger mt-2 w-full bg-red-400 py-2 border-black hover:bg-red-700 rounded-full"
        submit={submit}
        text="Submit"
      />
    </div>
  );
};

export default Subscribe;
