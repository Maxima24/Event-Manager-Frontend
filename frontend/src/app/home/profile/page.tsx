"use client";
import React from "react";
import { FaUserCircle, FaEnvelope, FaCog, FaSignOutAlt } from "react-icons/fa";
import { UserNavigation } from "@/app/components/userNavigation";
import {useRouter} from "next/navigation"
function ProfilePage() {
    const router = useRouter()
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "", // leave empty to use default icon
  };

  return (
    <>
      <UserNavigation />
      <div>
        
      </div>
      <div className="p-6 flex justify-center w-full ">
        <div className="w-full max-w-lg bg-white shadow-sm rounded-2xl border border-gray-200 p-6 mt-56">
          {/* Header */}
          <div className="flex flex-col items-center gap-3 mb-6">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border"
              />
            ) : (
              <FaUserCircle className="text-gray-400 w-24 h-24" />
            )}
            <h1 className="text-2xl font-semibold">{user.name}</h1>
            <p className="text-gray-500 flex items-center gap-2">
              <FaEnvelope /> {user.email}
            </p>
          </div>

          {/* Actions */}
          <div className="divide-y divide-gray-200">
            <button className="w-full flex items-center justify-between py-3 px-2 hover:bg-gray-50 rounded-lg transition">
              <span className="flex items-center gap-2 text-gray-700 font-medium" onClick={()=>router.push('profile/settings')}>
                <FaCog className="text-gray-500" /> Account Settings
              </span>
              <span className="text-gray-400">›</span>
            </button>
            <button className="w-full flex items-center justify-between py-3 px-2 hover:bg-gray-50 rounded-lg transition">
              <span className="flex items-center gap-2 text-red-500 font-medium">
                <FaSignOutAlt /> Logout
              </span>
              <span className="text-gray-400">›</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
