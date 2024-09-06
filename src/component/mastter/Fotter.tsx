'use client'
import React from 'react'
import Link from 'next/link'
import SubmitButton from '../user/SubmitButton'
import Subscribe from './Subscribe'
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


const Fotter = ({ data }: { data: any }) => {
    return (


        <>
            <div className="section-footer">
                <div className="py-5 bg-black">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="p-3">
                                <h5 className="text-white font-bold my-3">ABOUT</h5>
                                <p className="text-white">{data.socials[0]['about']}</p>
                                <div className="flex justify-start sm:justify-start text-white text-2xl my-10">
                                    <a target="_blank" href={data.socials[0]['facebook']} className="flex justify-center items-center">
                                        <FaFacebookF className='hover:text-orange-400' />
                                    </a>
                                    <a target="_blank" href={data.socials[0]['youtube']} className="flex justify-center items-center mx-2">
                                        <FaYoutube className='hover:text-orange-400' />
                                    </a>
                                    <a target="_blank" href={data.socials[0]['twitter']} className="flex justify-center items-center mx-2">
                                        <FaTwitter className='hover:text-orange-400' />
                                    </a>
                                    <a target="_blank" href={data.socials[0]['linkdin']} className="flex justify-center items-center mx-2">
                                        <FaLinkedin className='hover:text-orange-400' />
                                    </a>
                                </div>
                            </div>
                            <div className="p-3">
                                <h5 className="text-white font-bold my-3">RECOMMENDED</h5>
                                {
                                    data.categories.map((item: any, i: any) => {
                                        if (i < 4) {
                                            return <Link key={i} className=" text-white my-2 flex" href={`/category?id=${item.id}`}>
                                                {item.name}
                                            </Link>
                                        }
                                    })
                                }

                            </div>
                            <div className="p-3">
                                <h5 className="text-white font-bold my-3">LEGAL</h5>
                                <ul className="list-none text-white">
                                    <li className="my-1">
                                        <Link href="/policies" className="nav-link">Privacy Policy</Link>
                                    </li>
                                    <li className="my-1">
                                        <Link href="/terms" className="nav-link">Terms & Conditions</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="p-3">
                                <Subscribe />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Fotter