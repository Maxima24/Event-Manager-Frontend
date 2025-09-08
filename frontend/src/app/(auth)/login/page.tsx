"use client";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; 
import { useAuth } from "@/app/hooks/userContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setshowpassword] = useState<boolean>(false)
  const {login} =useAuth()

  const handleSubmit = async  (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { email, password });
    await login(email,password)

  };

  return (
    <div
      className=" h-80 font-sans flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 mt-20 rounded-lg shadow-lg w-140 h-140 mb-20"
      >

        <div className="flex justify-center items-center gap-2 mb-2 mt-3">
          <img src="/imageLogo.png" width={50} height={50} alt="Logo" />
          <h1 className="text-2xl text-purple-950 font-bold">UniEvent</h1>
        </div>

        <h2 className="font-bold text-3xl mb-6 text-center">Welcome Back!</h2>

        <input
          type="email"
          name="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full text-xs h-8 p-3 border border-gray-300 rounded-md mb-4"
        />

        <div className="relative mb-4">
          <input
            type={showpassword ? "text" : "password"}
            name="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-xs h-8 p-3 border border-gray-300 rounded-md"
          />
          <button
            type="button"
            onClick={() => setshowpassword(!showpassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs"
          >
            {showpassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <label className="flex items-center text-xs">
            <input
              type="checkbox"
              className="w-3 h-3 mr-1 accent-blue-600"
            />
            Remember Me
          </label>

          <Link
            href="/forgot"
            className="text-blue-600 hover:text-blue-900 hover:underline text-xs"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full text-xs h-8 font-bold bg-purple-800 text-white py-2 rounded hover:bg-purple-950 transition"
        >
          Submit
        </button><br />

        <p className="text-xs pt-2">Haven't registered?<Link href='/auth/Register' className=" text-blue-600 hover:text-blue-900 hover:underline"> Click here.</Link></p>


        <div className="flex items-center gap-2 mt-4">
             <hr className="flex-grow border-gray-300" />
           <span className="text-xs text-gray-500">Or log in with</span>
           <hr className="flex-grow border-gray-300" />
        </div>
        <p 
        className="text-xs pt-2 mt-3">
            By clicking on Login or  Apple, Google, or Facebook icons,
             you agree to UniEvent’s 
             <Link href='/' 
             className="text-blue-600 hover:text-blue-900 hover:underline"> Terms of Service</Link> and <Link href='/' className ="text-blue-600 hover:text-blue-900  hover:underline">Privacy Policy</Link>.
        </p>

        <div className="flex items-center justify-center gap-20 mt-5">
            <button className="p-2 border rounded hover:bg-gray-100">
                <img src="/apple.png" alt="Apple" className="w-6 h-6" />
            </button>
            <button className="p-2 border rounded hover:bg-gray-100">
                <img src="/google.png" alt="Google" className="w-6 h-6" />
            </button>
            <button className="p-2 border rounded hover:bg-gray-100">
                <img src="/facebook.png" alt="Facebook" className="w-6 h-6" />
            </button>
        </div>
        <p className="text-blue-500 text-xs mt-6 justify-center flex">Need help finding your tickets?</p>
      </form>
    </div>
  );
}
