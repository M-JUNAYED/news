'use client'
import { useState } from 'react';
import React from 'react';
import Link from 'next/link';
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { useRouter } from 'next/navigation'; 
// React icons import can be removed since you want to avoid using them

export default function AppNavbar({ data, isLogin }: { data: any, isLogin: any }) {

  let router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }; // Close the toggleMenu function here

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/user/login', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        router.push('/');
        router.refresh()
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };

  const refrash = () =>{
    router.refresh()
  }

  return (
    <div>
      <div className="py-2 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between">
            <div className="text-sm">
              <h6 className='flex'>
                {/* Replace react-icon with HTML/CSS for Calendar icon */}
                <span className=' mr-1'>📅</span> Today:
                <span> {new Date().getDate()}/{new Date().getMonth() + 1}/{new Date().getFullYear()} </span>
              </h6>
            </div>
            <div className="text-sm">
              <span className="flex justify-end">
                <Link target="_blank" href={data.socials[0]['facebook']} className="flex justify-center items-center">
                  <FaFacebookF className='hover:text-orange-400' />
                </Link>
                <Link target="_blank" href={data.socials[0]['youtube']} className="flex justify-center items-center mx-2">
                  <FaYoutube className='hover:text-orange-400' />
                </Link>
                <Link target="_blank" href={data.socials[0]['twitter']} className="flex justify-center items-center mx-2">
                  <FaTwitter className='hover:text-orange-400' />
                </Link>
                <Link target="_blank" href={data.socials[0]['linkdin']} className="flex justify-center items-center mx-2">
                  <FaLinkedin className='hover:text-orange-400' />
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>

      <nav className="bg-white sticky top-0 shadow-sm my-1 p-0 m-0">
        <div className="container mx-auto px-2 flex justify-between items-center">
          <div>
            <img className="nav-logo h-10" src={"/images/logo.svg"} alt="img" />
          </div>
          <button
            className="lg:hidden flex flex-col justify-center items-center px-2 py-1 border rounded"
            aria-controls="navbarScroll"
            aria-expanded={isOpen}
            onClick={toggleMenu}
          >
            <div className={`w-6 h-0.5 bg-black mb-1 transition-transform ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-black mb-1 transition-opacity ${isOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-black transition-transform ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
          </button>
          <div className="hidden lg:flex lg:items-start lg:space-x-4 ml-3">
            <Link className="text-sm font-medium text-gray-700 hover:text-orange-400" href="/">
              Home
            </Link>
            {
              data.categories.map((item: any, i: any) => (
                <Link key={i} className="text-sm font-medium text-gray-700 hover:text-orange-400" href={`/category?id=${item.id}`}>
                  {item.name}
                </Link>
              ))
            }
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex">
              <input
                onChange={(e) => { setKeyword(e.target.value) }}
                type="text"
                className="form-input block w-full border-gray-300 rounded-l px-3 py-1.5"
                placeholder="Search..."
              />
              <Link href={keyword === "" ? ("/") : (`/search?keyword=${keyword}`)} className="bg-red-500 hover:bg-red-700 text-white rounded-r px-3 py-1.5 flex items-center">
                {/* Replace react-icon with HTML/CSS for Search icon */}
                <IoMdSearch />
              </Link>
            </div>
            {
              isLogin ? (
                <>
                  <div className="relative">
                    <img
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-8 h-8 cursor-pointer rounded-full"
                      src="/images/profile.png"
                      alt="Profile"
                    />
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-black text-white shadow-lg rounded-lg z-50">
                        <div className="mt-4 text-center">
                          <img className="w-8 h-8 mx-auto rounded-full" src="/images/profile.png" alt="Profile" />
                          <hr className="border-gray-300 my-2" />
                        </div>
                        <Link href="/profile" className="block py-2 px-4 text-sm text-white hover:bg-slate-600">
                          Profile
                        </Link>
                        <Link href="/comment" className="block py-2 px-4 text-sm text-white hover:bg-slate-600">
                          Comment
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left py-2 px-4 text-sm text-white hover:bg-slate-600"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <Link href="/user/login" className="btn ms-3 btn-outline-danger hover:text-orange-400">
                  Login
                </Link>
              )
            }
          </div>
        </div >
      </nav >
    </div >
  );
}
