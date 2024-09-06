"use client";
import React, { useEffect, useState } from 'react';
import SubmitButton from '../user/SubmitButton';
import { ErrorToast, IsEmpty, SuccessToast } from '@/utility/FormHelper';
import { useRouter } from 'next/navigation';

interface ProfileFormProps {
  data: {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    password: string;
  };
}

const ProfileForm: React.FC<ProfileFormProps> = ({ data: initialData }) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    otp: "0",
  });

  useEffect(() => {
    setData({
      firstName: initialData.firstName,
      lastName: initialData.lastName,
      email: initialData.email,
      mobile: initialData.mobile,
      password: initialData.password,
      otp: "0",
    });
  }, [initialData]);

  const [submit, setSubmit] = useState(false);
  const router = useRouter();

  const inputOnChange = (name: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formSubmit = async () => {
    if (IsEmpty(data.firstName)) {
      ErrorToast("First Name Required!");
    } else if (IsEmpty(data.lastName)) {
      ErrorToast("Last Name Required!");
    } else if (IsEmpty(data.email)) {
      ErrorToast("Email Address Required!");
    } else if (IsEmpty(data.mobile)) {
      ErrorToast("Mobile No Required!");
    } else if (IsEmpty(data.password)) {
      ErrorToast("Password Required!");
    } else {
      setSubmit(true);
      const options = { method: 'POST', body: JSON.stringify(data) };

      const res = await (await fetch("/api/user/profile/update", options)).json();
      setSubmit(false);

      if (res.status === "success") {
        SuccessToast("Request Success");
        router.refresh();
      } else {
        ErrorToast("Invalid Request!");
      }
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h5 className="text-xl font-semibold mb-4">User Update</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                value={data.firstName}
                onChange={(e) => inputOnChange('firstName', e.target.value)}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                value={data.lastName}
                onChange={(e) => inputOnChange('lastName', e.target.value)}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile</label>
              <input
                value={data.mobile}
                onChange={(e) => inputOnChange('mobile', e.target.value)}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                value={data.email}
                onChange={(e) => inputOnChange('email', e.target.value)}
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                value={data.password}
                onChange={(e) => inputOnChange('password', e.target.value)}
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-6">
            <SubmitButton
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              submit={submit}
              onClick={formSubmit}
              text="Save Changes"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
