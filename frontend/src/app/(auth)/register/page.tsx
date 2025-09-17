"use client";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Calendar, Users, Star } from "lucide-react";
import { useAuth } from "@/app/hooks/useAuth";
import { useToast } from "@/app/contexts/toastContext";

export default function RegisterPage() {
  const { signup, user } = useAuth();
  const {toast} = useToast()
  const [fullname, setfullname] = useState("");
  const [phoneNumber, setphonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [showpassword, setshowpassword] = useState(false);
  const [showconfirmpassword, setshowconfirmpassword] = useState(false);

  const splitFullName = (fullname: string) => {
    const [firstName, ...lastNameParts] = fullname.trim().split(" ");
    return { firstName, lastName: lastNameParts.join(" ") };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = phoneNumber;
    const { firstName, lastName } = splitFullName(fullname);
    if(!email || !password || !phoneNumber || !lastName || !firstName ||!whatsappNumber){
      return  toast({
        title: "😦 All field required!!",
        description: "Registration Failed",
        variant: "destructive",
        duration:3000
      })
    }
    await signup(email, password, phoneNumber, lastName, firstName, whatsappNumber);
    if (!user) console.log("user not signed in, an error occurred");
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center px-4">
      {/* Floating Shapes for Hero Style */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full animate-pulse" />
      <div className="absolute top-1/3 left-1/2 w-24 h-24 bg-white/10 rounded-full animate-pulse" />

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/90 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md"
      >
        {/* Logo + Title */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <img src="/imageLogo.png" width={50} height={50} alt="Logo" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            UniEvent
          </h1>
        </div>

        <h2 className="font-bold text-2xl mb-6 text-center text-gray-800">
          Create Your Account
        </h2>

        {/* Inputs */}
        <input
          type="text"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setfullname(e.target.value)}
          className="w-full mb-4 px-4 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setphonenumber(e.target.value)}
          className="w-full mb-4 px-4 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
        />

        {/* Password Fields */}
        <div className="relative mb-4">
          <input
            type={showpassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
          />
          <button
            type="button"
            onClick={() => setshowpassword(!showpassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showpassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="relative mb-6">
          <input
            type={showconfirmpassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(e) => setconfirmpassword(e.target.value)}
            className="w-full px-4 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
          />
          <button
            type="button"
            onClick={() => setshowconfirmpassword(!showconfirmpassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showconfirmpassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Sign Up
        </button>

        {/* Login Redirect */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-600 font-medium hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
