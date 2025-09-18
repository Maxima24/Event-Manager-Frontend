"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import NavigationSpan from "./subnavigatoin";

export function UserNavigation() {
  const { user } = useAuth();

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
      <Link href="/home">
          <NavigationSpan name="Home" />
        </Link>
        <Link href="/home/event">
          <NavigationSpan name="Find Event" />
        </Link>
        <Link href="/home/event/createevent">
          <NavigationSpan name="Create Event" />
        </Link>
        <Link href="/home/tickets">
          <NavigationSpan name="My Tickets" />
        </Link>

        {/* User Profile Section */}
        <Link
          href="/home/profile"
          className="flex items-center gap-2 px-3 py-1 border rounded-full hover:bg-gray-50 transition"
        >
          <FaUserCircle size={20} className="text-purple-800" />
          <span className="capitalize">{user?.firstName || "Guest"}</span>
        </Link>
      </nav>
    </header>
  );
}
