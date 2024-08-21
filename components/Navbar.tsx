'use client'
import Image from "next/image";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-dark2 py-3 md:h-14 flex items-center text-center justify-center border-b">
        <h1 className="text-[#98989A] text-sm md:text-base px-4 md:px-0">Subscribe to our Newsletter For New & latest Blogs and Resources</h1>
        <Image src={'/newl.svg'} alt="" width={24} height={24} className="hidden md:inline-block" />
      </nav>
      <nav className="border-b">
        <div className="mx-auto px-4 py-3 flex flex-wrap justify-between items-center container">
          <div className="flex items-center gap-x-3">
            <Image src="/DOCLINK.svg" alt="FutureTech Logo" width={150} height={150} />
          </div>
          
          <div className="flex items-center md:hidden">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-4 p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
          
          <div className={`w-full md:w-auto md:flex ${isMenuOpen ? 'block' : 'hidden'}`}>
            <NavLink />
          </div>
          
          <div className="hidden md:block">
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;