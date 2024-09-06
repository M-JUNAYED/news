'use client'
import React, { useState } from 'react';
import SubmitButton from './SubmitButton'; // Adjust the path as necessary
import { useRouter } from 'next/navigation'; // Use `useRouter` for redirection
import { ErrorToast, IsEmail, IsEmpty, SuccessToast } from '@/utility/FormHelper';

const RegistrationForm = () => {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Add this line to manage submission state
  const router = useRouter(); // Move useRouter here

  const inputOnChange = (name: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (IsEmpty(data.firstName)) {
      ErrorToast("Enter First Name");
      return;
    }
    if (IsEmpty(data.lastName)) {
      ErrorToast("Enter Last Name");
      return;
    }
    if (IsEmpty(data.mobile)) {
      ErrorToast("Enter Phone Number");
      return;
    }
    if (IsEmail(data.email)) {
      ErrorToast("Valid Email Address Required!");
      return;
    }
    if (IsEmpty(data.password)) {
      ErrorToast("Valid Password Required!");
      return;
    }

    setIsSubmitting(true);
    try {
      const options: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };
      const response = await fetch('/api/user/registration', options);
      const result = await response.json();

      if (response.ok) {
        if (result.status.toLowerCase() === 'success') {
          SuccessToast('Registration Successful');
          router.push('/user/login');
        } else {
          ErrorToast('Registration Failed: ' + result.message);
        }
      } else {
        ErrorToast('Failed to submit the form. Please try again.');
      }
    } catch (error) {
      ErrorToast('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
      setData({
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        password: '',
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="w-full w-lg mx-10 bg-white rounded-lg shadow-lg ">
        <h5 className="text-xl font-semibold mb-4 mt-2 text-center">User Registration</h5>
        <form onSubmit={formSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1 m-2">First Name</label>
              <input
                type="text"
                value={data.firstName}
                onChange={(e) => inputOnChange('firstName', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md m-2"
                placeholder="Enter your first name"
                required
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1 m-2">Last Name</label>
              <input
                type="text"
                value={data.lastName}
                onChange={(e) => inputOnChange('lastName', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md m-2"
                placeholder="Enter your last name"
                required
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1 m-2">Mobile</label>
              <input
                type="text"
                value={data.mobile}
                onChange={(e) => inputOnChange('mobile', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md m-2"
                placeholder="Enter your mobile number"
                required
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1 m-2">Email</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => inputOnChange('email', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md m-2"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1 m-2">Password</label>
              <input
                type="password"
                value={data.password}
                onChange={(e) => inputOnChange('password', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md m-2"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          <div className="flex justify-center ">
          <SubmitButton
          onClick={formSubmit}
          className={`max-w-full py-2 m-2 px-20 bg-red-400 text-white font-semibold rounded-md hover:bg-red-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          submit={isSubmitting}
          text={isSubmitting ? 'Submitting...' : 'Registration'}
        />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
