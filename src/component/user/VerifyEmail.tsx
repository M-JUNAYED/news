'use client'
import React, { useState } from 'react';
import SubmitButton from './SubmitButton';
import { useRouter } from 'next/navigation';
import { ErrorToast, IsEmail, SetEmail, SuccessToast } from '@/utility/FormHelper';

const VerifyEmail = () => {
  const [data, setData] = useState({ email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const inputOnChange = (name: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (IsEmail(data.email)) {
      ErrorToast("Valid Email Address Required!");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/user/recovery/emailVerify?email=${data.email}`);
      const result = await response.json();

      if (response.ok) {
        if (result.status.toLowerCase() === 'success') {
          SuccessToast('Successful');
          SetEmail(data.email);
          router.push('/user/otpVerify');
        } else {
          ErrorToast('Invalid');
        }
      } else {
        ErrorToast('Failed to submit the form. Please try again.');
      }
    } catch (error) {
      ErrorToast('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
      setData({ email: '' });
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-full max-w-md">
        <form onSubmit={formSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 animate-fadeIn">
          <h5 className="text-lg font-medium mb-3">Email Address</h5>
          <label className="block text-gray-700 text-sm font-bold mb-2">User Email</label>
          <input 
            value={data.email} 
            onChange={(e) => inputOnChange('email', e.target.value)} 
            type="email" 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />
          <SubmitButton className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-3" submit={isSubmitting} text="Next" />
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
