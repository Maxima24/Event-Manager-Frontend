"use client";
import { UserNavigation } from "@/app/components/userNavigation";
import { FaLock, FaBell, FaPalette, FaGlobe, FaSignOutAlt, FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();

  return (
    <>
      <UserNavigation />

      <div className="min-h-screen bg-gray-50 p-8 ml-5 mt-6 mr-4">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-5 text-gray-700 hover:text-gray-900 transition"
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>

        {/* Page Header */}
        <div className="mb-5 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-500 mt-1">
            Manage your account preferences and customization
          </p>
        </div>

        <div className="space-y-12 max-w-3xl ml-4">
          {/* Account Section */}
          <section className="mb-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Account</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 divide-y">
              <div className="flex justify-between items-center p-5 hover:bg-gray-50 cursor-pointer transition">
                <div className="flex items-center gap-4">
                  <FaLock className="text-gray-600 text-lg" />
                  <div>
                    <p className="font-medium text-gray-800">Privacy & Security</p>
                    <p className="text-sm text-gray-500">Manage password & data</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center p-5 hover:bg-gray-50 cursor-pointer transition">
                <div className="flex items-center gap-4">
                  <FaGlobe className="text-gray-600 text-lg" />
                  <div>
                    <p className="font-medium text-gray-800">Language & Region</p>
                    <p className="text-sm text-gray-500">Select your preferences</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Preferences Section */}
          <section className="mb-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Preferences</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 divide-y">
              <div className="flex justify-between items-center p-5 hover:bg-gray-50 cursor-pointer transition">
                <div className="flex items-center gap-4">
                  <FaBell className="text-gray-600 text-lg" />
                  <div>
                    <p className="font-medium text-gray-800">Notifications</p>
                    <p className="text-sm text-gray-500">Choose alert preferences</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center p-5 hover:bg-gray-50 cursor-pointer transition">
                <div className="flex items-center gap-4">
                  <FaPalette className="text-gray-600 text-lg" />
                  <div>
                    <p className="font-medium text-gray-800">Appearance</p>
                    <p className="text-sm text-gray-500">Light / Dark mode</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Danger Zone</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
              <button className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition">
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
