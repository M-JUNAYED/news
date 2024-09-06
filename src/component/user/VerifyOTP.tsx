'use client'
import React, { useState, useEffect } from 'react';
import SubmitButton from './SubmitButton';
import { useRouter } from 'next/navigation';
import { ErrorToast, SuccessToast, GetEmail, SetOTP } from '@/utility/FormHelper';

const VerifyOTP = () => {
  const [data, setData] = useState({ email:GetEmail(), otp: '' });
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

    if (data.otp.trim() === "") {
      ErrorToast("OTP is required!");
      return;
    }

    setIsSubmitting(true);
    try {
      const options: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };
      const response = await fetch(`/api/user/recovery/OTPverify`, options);
      const result = await response.json();

      if (response.ok) {
        if (result.status.toLowerCase() === 'success') {
          SuccessToast('Successful');
          SetOTP(data.otp);
          router.push('/user/resetPassword');
        } else {
          ErrorToast('Invalid OTP');
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
          <h5 className="text-lg font-medium mb-3">OTP Code</h5>
          <label className="block text-gray-700 text-sm font-bold mb-2">Code</label>
          <input 
            value={data.otp} 
            onChange={(e) => inputOnChange('otp', e.target.value)} 
            type="text" 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />
          <SubmitButton className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-3" submit={isSubmitting} text="Next" />
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
