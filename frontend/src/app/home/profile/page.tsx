"use client";
import React from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { UserNavigation } from "@/app/components/userNavigation";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import { ToastContext, useToast } from "@/app/contexts/toastContext";
function ProfilePage() {
  const router = useRouter();
  const {user,logout} = useAuth()
  const {toast} = useToast()
  const [profilePic,setProfilePic] = React.useState<File>()
  const [pic,setPic] = React.useState<string>('')

 
  /// handle Profile Picture upload
 
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

  const handleProfilePicUpload =  async ()=>{
    const formData = new FormData();
   
      if(!profilePic) return console.log("profileImage content is Empty");
      formData.append("profile-pic", profilePic);
  

    const res = await fetch(`/api/single-upload`, {
      method: "POST",
      body: formData,
    });
    //get response from the next api /cloidinary service
    const data = await res.json()
    //if image exists 
       setPic(data)
  }
}
const handleLogout = async () =>{
    try{
      const res = await logout()
    }catch(err){
      console.error(err.message)
      toast({
        title: "Logout Failed",
        description: "Failed to Logout",
        variant:  "destructive",
        duration: 3000
      })
    }finally{
      toast({
        title: "Logout Successful",
        description: "Successfully Logged out",
        variant:  "success",
        duration: 3000
      })
    }
}
  return (
    <>
      <UserNavigation />

      <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-12 flex justify-center">
        <div className="w-full max-w-lg">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition"
          >
            <FaArrowLeft className="text-lg" />
            <span className="font-medium">Back</span>
          </button>

          {/* Profile Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            {/* Header */}
            <div className="flex flex-col items-center gap-4 mb-8">
              {
              // user?.avatar ? (
              //   <img
              //     src={user?.avatar}
              //     alt={user?.firstName}
              //     className="w-28 h-28 rounded-full object-cover border-4 border-transparent bg-gradient-to-r from-pink-500 to-yellow-400 p-[2px]"
              //   />
              // ) : 
              (
                <div className="relative w-28 h-28 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 p-[2px]">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <FaUserCircle className="text-gray-300 w-24 h-24" />
                  </div>
                </div>
              )}

              <h1 className="text-3xl font-bold text-gray-800">{user?.firstName} {user?.lastName}</h1>
              <p className="text-gray-500 flex items-center gap-2">
                <FaEnvelope className="text-gray-400" /> {user?.email}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => router.push("profile/settings")}
                className="w-full flex items-center justify-between py-4 px-5 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
              >
                <span className="flex items-center gap-3 text-gray-700 font-medium">
                  <FaCog className="text-gray-500" /> Account Settings
                </span>
                <span className="text-gray-400 text-xl">›</span>
              </button>

              <button
                onClick={() => router.push("/home/event/myevent")}
                className="w-full flex items-center justify-between py-4 px-5 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
              >
                <span className="flex items-center gap-3 text-gray-700 font-medium">
                  <FaCog className="text-gray-500" />My Events               </span>
                <span className="text-gray-400 text-xl">›</span>
              </button>

              <button className="w-full flex items-center justify-between py-4 px-5 rounded-xl bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-medium hover:opacity-90 transition" onClick={()=>handleLogout()}>
                 <span className="flex items-center gap-3">
                  <FaSignOutAlt /> Logout
                </span>
                <span className="text-white text-xl">›</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}
export default ProfilePage;
