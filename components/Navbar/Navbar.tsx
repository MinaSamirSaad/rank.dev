"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Search, X, AlignJustify } from "lucide-react";
import { Switch } from "../ui/switch";
import { ModeToggle } from "../themeSwitcher";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    // Set initial state on component mount
    handleResize();

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <header className="  transition-colors duration-300 z-30 sticky top-0 bg-body dark:bg-darkmode-body py-2 shadow-md dark:text-white">
      <nav className="container flex justify-between items-center ">
        <div className="w-fit ">
          <Link href="/" className="h-18 flex items-center ">
            <Image
              src={"/images/logo/logo.png"}
              alt={"Logo"}
              height={40}
              width={40}
            />
            <span className="ml-2 text-xl font-semibold ">Rank.Dev</span>
          </Link>
        </div>
        {/* routes */}
        <ul
          className={`${
            isOpen ? " open " : "hidden"
          } sidebar order-3 pt-14 lg:pt-0  pb-6 lg:order-1 lg:flex lg:w-auto lg:space-x-2 lg:pb-0 xl:space-x-4 font-semibold`}
        >
          <li className=" py-3 px-2">
            <Link href="/">Home</Link>
          </li>
          <li className=" py-3 px-2">
            <Link href="/">Blog</Link>
          </li>
          <li className=" py-3 px-2">
            <Link href="/">About</Link>
          </li>
          <li className=" py-3 px-2">
            <Link href="/">Contact</Link>
          </li>
          <li
            onClick={() => setIsOpen(false)}
            className="absolute right-5 top-4 close lg:hidden  cursor-pointer   "
          >
            <X className="first:w-8 first:h-8" />
          </li>
        </ul>
        <div className="order-1 ml-auto flex items-center md:order-2 lg:ml-0  ">
          <Link
            href="/"
            className="h-9 flex items-center mr-5 inline-block border-r border-border pr-5 text-xl text-dark hover:text-primary dark:border-darkmode-border dark:text-white"
          >
            <Search />
          </Link>
          {/* <Link
            href="/"
            className=" mr-5 inline-block border-r border-border pr-5 text-xl text-dark hover:text-primary dark:border-darkmode-border dark:text-white"
          >
            <Switch id="airplane-mode" />
          </Link> */}
          <div className=" h-9 mr-5 inline-block border-r border-border pr-5 text-xl text-dark hover:text-primary dark:border-darkmode-border dark:text-white">
            <ModeToggle />
          </div>
          <div
            // className="btn btn-outline-primary btn-sm hidden lg:inline-block rounded-xl"
            className="hidden lg:block cursor-pointer border-2 border-black dark:border-white rounded-full border-inherit text-sm font-semibold py-1 px-3"
          >
            Create Room
          </div>

          <div
            onClick={() => setIsOpen(true)}
            // className="btn btn-outline-primary btn-sm hidden lg:inline-block rounded-xl"
            className="lg:hidden "
          >
            <AlignJustify className="first:w-10 first:h-10 cursor-pointer" />
          </div>
        </div>
      </nav>
    </header>
  );
}