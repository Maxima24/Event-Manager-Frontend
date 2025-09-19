"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import NavigationSpan from "./subnavigatoin";

export function Navigation() {

  return (
    <header className="flex items-center justify-between w-full px-6 py-3 bg-white shadow-sm">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <Image
          src="/imageLogo.png"
          alt="Logo"
          width={36}
          height={36}
          className="object-contain"
        />
        <h1 className="font-bold text-xl text-purple-900">UniEvents</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center gap-6 text-sm font-medium">
        <Link href="/login">
          <NavigationSpan name="Login" />
        </Link>
        <Link href="/register">
          <NavigationSpan name="Register" />
        </Link>
      

    
        
      </nav>
    </header>
  );
}
