import React from 'react';
import AppNavbar from './AppNavbar';
import Fotter from './Fotter';
import { Toaster } from 'react-hot-toast';
import { cookies } from 'next/headers';

interface Socials {
  facebook: string;
  youtube: string;
  twitter: string;
  linkedin: string;
}

interface Category {
  id: string;
  name: string;
}

interface LayoutData {
  socials: Socials[];
  categories: Category[];
}

async function getData(): Promise<LayoutData> {
  const responseSocials = await fetch(`${process.env.HOST}/api/sociels`);
  const socials = await responseSocials.json();
  
  const responseCategories = await fetch(`${process.env.HOST}/api/categorie`);
  const categories = await responseCategories.json();

  return { 
    socials: socials.data,
    categories: categories.data 
  };
}

const PlainLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  const data = await getData();

  const cookieStore = cookies();
  const token = cookieStore.get('token');
  const isLogin = typeof token !== "undefined";

  return (
    <>
      <AppNavbar isLogin={isLogin} data={data} />
      {children}
      <Toaster position="bottom-center" />
      <Fotter data={data} />
    </>
  );
}

export default PlainLayout;
