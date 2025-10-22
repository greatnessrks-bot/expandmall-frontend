"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full backdrop-blur-md border-b border-zinc-200 transition-all duration-500 z-50 ${
        isShrunk ? "h-14 bg-white/70 shadow-sm" : "h-20 bg-white/50"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        
        {/* Left Section - Logo + Links */}
        <div
          className={`flex items-center gap-4 transition-all duration-500 ${
            isShrunk ? "md:-ml-6" : "md:-ml-10"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none">
            <div
              className={`font-extrabold tracking-tight transition-all duration-500 ${
                isShrunk ? "text-3xl" : "text-4xl"
              }`}
            >
              <span className="text-amber-600">X</span>
              <span className="text-teal-700">pand</span>
              <span className="text-orange-500">Mall</span>
            </div>
            <span
              className={`tracking-wider mt-[1px] text-zinc-400 transition-all duration-500 ${
                isShrunk ? "text-[6px]" : "text-[7px]"
              }`}
            >
              Connecting Businesses, Expanding Possibilities
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-3 ml-4">
            <Link href="/products" className="text-zinc-600 hover:text-zinc-900 px-2 py-1 rounded">
              Products
            </Link>
            <Link href="/about" className="text-zinc-600 hover:text-zinc-900 px-2 py-1 rounded">
              About
            </Link>
          </div>
        </div>

        {/* Right Section - Auth Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/login" className="text-sm text-zinc-700 hover:text-zinc-900 whitespace-nowrap">
            Sign in
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800 whitespace-nowrap"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}