"use client";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [fullname, setfullname] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [showpassword, setshowpassword] = useState<boolean>(false);
  const [showconfirmpassword, setshowconfirmpassword] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register:", { fullname, phonenumber, email, password, confirmpassword });
  };

  return (
    <div
      className="h-80 font-sans flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 mt-19 rounded-lg shadow-lg w-140 h-154 mb-19"
      >
        <div className="flex justify-center items-center mt-0 gap-2">
          <img src="/imageLogo.png" width={50} height={50} alt="Logo" />
          <h1 className="text-2xl text-purple-950 font-bold">UniEvent</h1>
        </div>

        <h2 className="font-bold text-3xl mb-4 text-center">Sign Up</h2>

        <input
          type="text"
          name="full-name"
          value={fullname}
          placeholder="Full Name"
          onChange={(e) => setfullname(e.target.value)}
          className="w-full text-xs h-8 p-3 border border-gray-300 rounded-md mb-4"
        />

        <input
          type="tel"
          name="phone-number"
          value={phonenumber}
          placeholder="Phone Number"
          onChange={(e) => setphonenumber(e.target.value)}
          className="w-full text-xs h-8 p-3 border border-gray-300 rounded-md mb-4"
        />

        <input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
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

        <div className="relative mb-4">
          <input
            type={showconfirmpassword ? "text" : "password"}
            name="confirm-password"
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(e) => setconfirmpassword(e.target.value)}
            className="w-full text-xs h-8 p-3 border border-gray-300 rounded-md"
          />
          <button
            type="button"
            onClick={() => setshowconfirmpassword(!showconfirmpassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs"
          >
            {showconfirmpassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <div className="flex justify-between items-center mt-1 mb-1">
          <label className="flex items-center text-xs">
            <input type="checkbox" className="w-3 h-3 mr-1 accent-blue-600" />
            Remember Me
          </label>
        </div>

        <button
          type="submit"
          className="w-full text-xs h-8 font-bold bg-purple-800 text-white py-2 rounded hover:bg-purple-950 transition"
        >
          Submit
        </button>

        <p className="text-xs pt-2">
          Already registered?{" "}
          <Link
            href="/auth/Login"
            className="text-blue-600 hover:text-blue-900 hover:underline"
          >
            Login here.
          </Link>
        </p>

        <div className="flex items-center gap-2 mt-2 mb-1">
          <hr className="flex-grow border-gray-300" />
          <span className="text-xs text-gray-500">Or sign up with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <p className="text-xs mt-1 mb-2 text-gray-600">
          By clicking on Login or Apple, Google, or Facebook icons, you agree to
          UniEvent’s{" "}
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-900 hover:underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-900 hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>

        <div className="flex items-center justify-center gap-20">
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

        <p className="text-blue-500 text-xs mt-4 justify-center flex">
          Need help finding your tickets?
        </p>
      </form>
    </div>
  );
}
