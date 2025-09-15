"use client";
import { UserNavigation } from "@/app/components/userNavigation";
import {
  FaLock,
  FaBell,
  FaPalette,
  FaGlobe,
  FaSignOutAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();

  return (
    <>
      <UserNavigation />

      <div className="min-h-screen bg-gray-50 p-6 md:p-12">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition"
        >
          <FaArrowLeft className="text-lg" />
          <span className="font-medium">Back</span>
        </button>

        {/* Page Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">⚙️ Settings</h1>
          <p className="text-gray-500 text-lg">
            Manage your account preferences and customization
          </p>
        </header>

        <main className="flex flex-col gap-12 max-w-3xl mx-auto">
          {/* Account Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-5">
              Account
            </h2>
            <div className="bg-white rounded-2xl shadow-md divide-y">
              <div className="flex justify-between items-center p-5 hover:bg-gray-50 cursor-pointer transition">
                <div className="flex items-center gap-4">
                  <FaLock className="text-pink-500 text-xl" />
                  <div>
                    <p className="font-medium text-gray-800">
                      Privacy & Security
                    </p>
                    <p className="text-sm text-gray-500">
                      Manage password & data
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center p-5 hover:bg-gray-50 cursor-pointer transition">
                <div className="flex items-center gap-4">
                  <FaGlobe className="text-yellow-500 text-xl" />
                  <div>
                    <p className="font-medium text-gray-800">
                      Language & Region
                    </p>
                    <p className="text-sm text-gray-500">
                      Select your preferences
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Preferences Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-5">
              Preferences
            </h2>
            <div className="bg-white rounded-2xl shadow-md divide-y">
              <div className="flex justify-between items-center p-5 hover:bg-gray-50 cursor-pointer transition">
                <div className="flex items-center gap-4">
                  <FaBell className="text-blue-500 text-xl" />
                  <div>
                    <p className="font-medium text-gray-800">Notifications</p>
                    <p className="text-sm text-gray-500">
                      Choose alert preferences
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center p-5 hover:bg-gray-50 cursor-pointer transition">
                <div className="flex items-center gap-4">
                  <FaPalette className="text-purple-500 text-xl" />
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
            <h2 className="text-2xl font-semibold text-gray-800 mb-5">
              Danger Zone
            </h2>
            <div className="bg-white rounded-2xl shadow-md p-6">
              <button className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-gradient-to-r from-pink-500 to-yellow-400 hover:opacity-90 text-white font-semibold transition">
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
