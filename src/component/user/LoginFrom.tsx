'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Use `useRouter` for redirection
import SubmitButton from './SubmitButton'; // Adjust the path as necessary
import { ErrorToast, IsEmail, IsEmpty, SuccessToast } from '@/utility/FormHelper';

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter(); // Create a router instance

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
      const response = await fetch('/api/user/login', options);
      const result = await response.json();

      if (response.ok) {
        if (result.status.toLowerCase() === 'success') {
          SuccessToast('Login Successful');
          router.push('/');
          router.refresh();
        } else {
          ErrorToast('Invalid Credentials');
        }
      } else {
        ErrorToast('Failed to submit the form. Please try again.');
      }
    } catch (error) {
      ErrorToast('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
      setData({ email: '', password: '' });
    }
  };

  return (
    <div className="p-4 shadow-lg bg-white rounded-lg max-w-md mx-auto mt-10">
      <div className="text-center text-gray-500 text-5xl mb-4">
        <i className="bi bi-person"></i> {/* Replace with an appropriate icon */}
      </div>
      <h5 className="text-center text-2xl font-bold mb-6">User Login</h5>
      <form onSubmit={formSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            User Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={data.email}
            onChange={(e) => inputOnChange('email', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            User Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={data.password}
            onChange={(e) => inputOnChange('password', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter your password"
            required
          />
        </div>
        <SubmitButton
          onClick={formSubmit}
          className={`w-full py-2 px-4 bg-red-400 text-white font-semibold rounded-md hover:bg-red-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          submit={isSubmitting}
          text={isSubmitting ? 'Submitting...' : 'Login'}
        />
        <div className="flex justify-between text-sm text-gray-600 mt-4">
          <Link href="/user/registration" className="hover:underline">
            Sign Up
          </Link>
          <Link href="/user/emailVerify" className="hover:underline">
            Forget Password
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
