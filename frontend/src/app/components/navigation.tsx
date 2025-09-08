"use client";
import React from "react";
import Image from "next/image";
import { FaSearch as SearchIcon } from "react-icons/fa";
import { FaLocationPin as LocationIcon } from "react-icons/fa6";
import NavigationSpan from "./subnavigatoin";
import Link from "next/link";

export function Navigation() {
  return (
    <div className="flex items-center w-auto justify-between mt-2">
      <div className="ml-2 flex  justify-center items-center gap-1.5 ">
        <div>
          <Image
            src={"/imageLogo.png"}
            alt="Logo"
            width={40}
            height={40}
            style={{ filter: "grayscale(100%) brightness(0)" }}
          />
        </div>
        <div>
          <span className=" font-black text-2xl"> EventHive</span>
        </div>
      </div>
      {/* search bar section*/}
      <div className="flex justify-center item ml-6">
        <div className="flex  justify-end items-center ">
          <div className="flex justify-center items-center gap-2 border-3 rounded-3xl  py-2  border-gray-200 ">
            <div className="ml-2">
              <SearchIcon size={16} />
            </div>
            <div>
              <form action="submit">
                <input
                  placeholder="search"
                  className=" placeholder-regular"
                ></input>
              </form>
            </div>
            <div className=" flex  gap-2">
              <span className="mx-28">|</span>
              <div className="flex justify-center gap-2">
                <div className=" flex items-center ">
                  <LocationIcon size={16}></LocationIcon>
                </div>
                <div>
                  <span>Obafemi Awolowo University</span>
                </div>

                <div className=" flex rounded-3xl border-2 p-1 justify-center  items-center mx-2">
                  <SearchIcon size={14}></SearchIcon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*navigation section */}

      <section className="mr-8 ml-[-100px]">
        <div className="flex gap-7 text-[14px] font-semibold leading-5 mr-2 ">
         
          <Link href='/login' prefetch={true}>
            <NavigationSpan name={"Login"} />
          </Link>
          <Link href='/register' prefetch={true}>
            <NavigationSpan name={"Signup"} />
          </Link>
        </div>
      </section>
    </div>
  );
}
