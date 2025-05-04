"use client"
import React from 'react'
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Footer() {
  const router = useRouter();
const headers = ["Resources","Legal","Company"]
const resources ={
  "FAQ":"/about-us",
  "Wiki":"/about-us"
}
const legal ={
  "Privacy Policy":"/policies",
  "Terms of Service":"/policies"
}
const company ={
  "Contact":"/about-us",
  "Email":"mailto:inquiry@realtorai.com",
}

const classNames = {
  header : "text-lg font-bold",
  options : "text-sm font-normal hover:cursor-pointer"
}
  return (
    <div className='bg-gray-200'>
<section>
    {/* This DIV will be handling the social media icons */}
    <div className='py-6 xl:py-6 2xl:py-6 flex justify-between'>
  <ul className='flex ml-16 xl:ml-0 2xl:ml-0 mt-4 xl:mt-0 2xl:mt-0 xl:px-10 2xl:px-10'>
    <li className='mr-4'> <Link href={"https://x.com/"}><AiFillTwitterCircle size="30px"/></Link></li>
    <li className='mr-4'><Link href={"https://www.instagram.com/"}><FaInstagram size="30px"/> </Link></li>
    <li className='mr-4'><Link href={"https://www.facebook.com/"}><FaFacebook size="28px"/></Link></li>
  </ul>
  
  <div className='flex flex-col md:flex-row xl:flex-row 2xl:flex-row gap-6 xl:gap-0 2xl:gap-0'>
    <div className="mr-20 xl:ml-8 xl:mr-8 2xl:ml-8 2xl:mr-8">
    <div>
    <h1 className={classNames['header']}>{headers[0]}</h1>
    <p className={classNames['options']} onClick={()=>router.push(resources["FAQ"])}>{Object.keys(resources)[0]}</p>
    <p className={classNames['options']} onClick={()=>router.push(resources["Wiki"])}>{Object.keys(resources)[1]}</p>
    </div>
    </div>
    <div className="mr-10 xl:ml-8 xl:mr-8 2xl:ml-8 2xl:mr-8"> {/* Add margin between each Bottom component */}
    <div>
    <h1 className={classNames['header']}>{headers[1]}</h1>
    <p className={classNames['options']} onClick={()=>router.push(legal["Privacy Policy"])}>{Object.keys(legal)[0]}</p>
    <p className={classNames['options']} onClick={()=>router.push(legal["Terms of Service"])}>{Object.keys(legal)[1]}</p>
    </div>
    </div>
    <div className="mr-10 xl:ml-8 xl:mr-8 2xl:ml-8 2xl:mr-8"> {/* Add margin between each Bottom component */}
    <div>
    <h1 className={classNames['header']}>{headers[2]}</h1>
    <p className={classNames['options']} onClick={()=>router.push(company["Contact"])}>{Object.keys(company)[0]}</p>
    <p className={classNames['options']} onClick={()=>router.push(company["Email"])}>{Object.keys(company)[1]}</p>
    </div>
    </div>
  </div>
</div>
<div className='flex items-center justify-center gap-2 md:gap-4 p-2 '>
    {/* This is the section for download images */}
    <img src="/appstore.svg" alt="appstore" onClick={()=>router.push("/503")}/>
    <img src="/googleplay.svg" alt="appstore" onClick={()=>router.push("/503")}/>
  </div>
<h1 className='text-center text-xs mt-6 mb-2 xl:mt-0 2xl:mt-0'>
   &copy; 2025 Realtor AI. All rights reserved.
  </h1>
  <div className='mt-6'>
    <img src="/footer.png" alt="footer" />
  </div>

</section>
    </div>
  )
}
