'use client'
import React, { useState, useEffect } from 'react';
import SubmitButton from './SubmitButton';
import { useRouter } from 'next/navigation';
import { ErrorToast, SuccessToast, GetEmail, SetOTP, GetOTP } from '@/utility/FormHelper';

const VerifyOTP = () => {
  const [data, setData] = useState({ email: GetEmail(), otp: GetOTP(), password: '', repassword: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const email = GetEmail();
    if (email) {
      setData((prevData) => ({ ...prevData, email }));
    }
  }, []);

  const inputOnChange = (name: string, value: any) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (data.password === "" || data.repassword === "") {
      ErrorToast("Both password fields are required!");
      return;
    }

    if (data.password !== data.repassword) {
      ErrorToast("Passwords do not match!");
      return;
    }

    setIsSubmitting(true);
    try {
      const options: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };
      const response = await fetch(`/api/user/recovery/resetPassword`, options);
      const result = await response.json();

      if (response.ok) {
        if (result.status.toLowerCase() === 'success') {
          SuccessToast('Password reset successful!');
          sessionStorage.clear();
          router.push('/user/login');
        } else {
          ErrorToast(result.message || 'Failed to reset the password. Please try again.');
        }
      } else {
        ErrorToast('Failed to submit the form. Please try again.');
      }
    } catch (error) {
      ErrorToast('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-full max-w-md">
        <form onSubmit={formSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 animate-fadeIn">
          <h5 className="text-lg font-medium mb-3">Reset Password</h5>
          <label className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
          <input 
            value={data.password} 
            onChange={(e) => inputOnChange('password', e.target.value)} 
            type="password" 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />
          <label className="block text-gray-700 text-sm font-bold mb-2">Re-enter New Password</label>
          <input 
            value={data.repassword} 
            onChange={(e) => inputOnChange('repassword', e.target.value)} 
            type="password" 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />
          <SubmitButton className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-3" submit={isSubmitting} text="Next" />
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
