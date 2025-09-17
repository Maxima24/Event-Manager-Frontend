"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react"; 
import { useAuth } from "@/app/hooks/useAuth";
import { useToast } from "@/app/hooks/useToast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const {user} = useAuth()
  const {toast} = useToast()
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setshowpassword] = useState(false);
  const { login } = useAuth();

  useEffect(()=>{
      if(user){
        router.back()
      }
  },[user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      if(!email || !password){
        return  toast({
          title: "All Fields required",
          description: "Submit failed!",
          variant: "destructive",
          duration:3000
        })
      }
      await login(email, password);
      toast({
        title: "Logged in",
        description: "Login successful!",
        variant: "success",
        duration:3000
      })
    }
    catch(err:any){
      toast({
        title: "Login Failed",
        description: err.response?.data?.message,
        variant: "destructive",
        duration:3000
      })
    }
    }
   
   

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center px-4">
      {/* Floating Shapes */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full animate-pulse" />
      <div className="absolute top-1/3 left-1/2 w-24 h-24 bg-white/10 rounded-full animate-pulse" />

      {/* Login Card */}
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
          Welcome Back!
        </h2>

        {/* Inputs */}
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
        />

        <div className="relative mb-4">
          <input
            type={showpassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
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

        {/* Remember + Forgot */}
        <div className="flex justify-between items-center mb-4 text-sm">
          <label className="flex items-center">
            <input type="checkbox" className="w-4 h-4 mr-2 accent-purple-600" />
            Remember Me
          </label>

          <Link
            href="/forgot"
            className="text-purple-600 hover:text-purple-800 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Login
        </button>

        {/* Sign Up Redirect */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Haven't registered?{" "}
          <Link
            href="/register"
            className="text-purple-600 font-medium hover:underline"
          >
            Click here
          </Link>
        </p>

        {/* Divider */}
        <div className="flex items-center gap-2 my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="text-sm text-gray-500">Or log in with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Logins */}
        <div className="flex items-center justify-center gap-6">
          <button className="p-2 border rounded-lg hover:bg-gray-100">
            <img src="/apple.png" alt="Apple" className="w-6 h-6" />
          </button>
          <button className="p-2 border rounded-lg hover:bg-gray-100">
            <img src="/google.png" alt="Google" className="w-6 h-6" />
          </button>
          <button className="p-2 border rounded-lg hover:bg-gray-100">
            <img src="/facebook.png" alt="Facebook" className="w-6 h-6" />
          </button>
        </div>

        {/* Terms */}
        <p className="text-xs text-gray-500 mt-6 text-center">
          By clicking Login or using Apple, Google, or Facebook, you agree to
          UniEvent’s{" "}
          <Link href="/" className="text-purple-600 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/" className="text-purple-600 hover:underline">
            Privacy Policy
          </Link>.
        </p>
      </form>
    </div>
  );
}
