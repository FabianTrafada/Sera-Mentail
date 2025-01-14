"use client";

import { useState, useEffect } from "react";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { BookOpen, Home, Loader2, Menu, MessageSquare, Newspaper } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAuth } from '@clerk/nextjs';

type NavProps = {
  mode: "sidebar" | "navbar";
};

const Navbar = ({ mode = "navbar" }: NavProps) => {
  const { isSignedIn } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const [isDashboard, setIsDashboard] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActive = (href: string) => pathname === href;

  return (
    <div>
      {isMobile || mode === "sidebar" ? (
        <div>
          <button
            className="fixed top-4 xl:hidden md:block sm:block right-4 z-50 p-2 bg-gray-800 text-white rounded-md"
            onClick={toggleSidebar}
          >
            <Menu className="size-4" />
          </button>
          <aside
            className={`fixed top-0 left-0 h-screen w-64 bg-gradient-to-br bg-slate-50 text-black shadow-lg p-6 flex flex-col justify-between z-10 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              } md:translate-x-0`}
          >
            {/* Header */}
            <div>
              <h1 className="text-2xl font-bold text-primaryColor tracking-wide text-center mb-8">
                <Link href="/">
                  Mentail
                </Link>

              </h1>
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-3 p-3 rounded-lg text-lg ${isActive("/dashboard")
                      ? "bg-primaryColor text-white shadow-md"
                      : "hover:bg-primaryColor hover:text-white transition-all"
                    }`}
                >
                  <Home className="w-5 h-5" />
                  Home
                </Link>
                <Link
                  href="/diary"
                  className={`flex items-center gap-3 p-3 rounded-lg text-lg ${isActive("/diary")
                      ? "bg-primaryColor text-white shadow-md"
                      : "hover:bg-primaryColor hover:text-white transition-all"
                    }`}
                >
                  <BookOpen className="w-5 h-5" />
                  Diary
                </Link>
                <Link
                  href="/ChatWithJoy"
                  className={`flex items-center gap-3 p-3 rounded-lg text-lg ${isActive("/ChatWithJoy")
                      ? "bg-primaryColor text-white shadow-md"
                      : "hover:bg-primaryColor hover:text-white transition-all"
                    }`}
                >
                  <MessageSquare className="w-5 h-5" />
                  Chat With Joy
                </Link>

                <Link
                  href="/article"
                  className={`flex items-center gap-3 p-3 rounded-lg text-lg ${isActive("/article")
                      ? "bg-primaryColor text-white shadow-md"
                      : "hover:bg-primaryColor hover:text-white transition-all"
                    }`}
                >
                  <Newspaper className="w-5 h-5" />
                  Article            
                  </Link>
              </nav>
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-4">
              <SignedIn>
                <ClerkLoading>
                  <div className="text-center">
                    <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto"></div>
                  </div>
                </ClerkLoading>
                <ClerkLoaded>
                  <UserButton afterSignOutUrl="/" />
                </ClerkLoaded>
              </SignedIn>
              <SignedOut>
                <Link href="/sign-in">
                  <button className="w-full p-3 rounded-lg  border-primaryColor border-2  text-black font-bold shadow-md hover:bg-indigo-600 hover:text-white transition-all">
                    Sign In
                  </button>
                </Link>
                <Link href="/sign-up">
                  <button className="w-full p-3 rounded-lg bg-primaryColor text-white font-bold shadow-md hover:bg-indigo-600 transition-all">
                    Sign Up
                  </button>
                </Link>
              </SignedOut>
            </div>
          </aside>

        </div>

      ) : (
        <header className="w-full h-16 text-black flex items-center justify-between px-4 fixed z-10 bg-white">
          <div className="flex items-center">
            <Image src="/Logo.svg" alt="logo" width={30} height={30} />
            <h1 className="pl-2 text-lg font-bold text-primaryColor">Mentail</h1>
          </div>
          <nav className="absolute left-1/2 transform -translate-x-1/2 flex gap-x-12 items-center">
            <Link
              href="/"
              className={`pb-1 ${isActive("/")
                  ? "border-b-2 border-primaryColor"
                  : "hover:border-b-2 hover:border-gray-300"
                }`}
            >
              Home
            </Link>
            {isSignedIn && (<Link
              href="/dashboard"
              className={`pb-1 ${isActive("/dashboard")
                  ? "border-b-2 border-primaryColor"
                  : "hover:border-b-2  hover:border-gray-300"
                }`}
            >
              Dashboard
            </Link>)}
            <Link
              href="#features"
              className={`pb-1 ${isActive("#features")
                  ? "border-b-2 border-primaryColor"
                  : "hover:border-b-2 hover:border-gray-300"
                }`}
            >
              Features
            </Link>
            <Link
              href="#testimonial"
              className={`pb-1 ${isActive("testimonial")
                  ? "border-b-2 border-primaryColor"
                  : "hover:border-b-2 hover:border-gray-300"
                }`}
            >
              Testimonial
            </Link>

            <Link
              href="/article"
              className={`pb-1 ${isActive("/article")
                  ? "border-b-2 border-primaryColor"
                  : "hover:border-b-2 hover:border-gray-300"
                }`}
            >
              Article
            </Link>
          </nav>
          <div className="flex gap-x-4">
            <SignedIn>
              <ClerkLoading>
                <Loader2 className="animate-spin" />
              </ClerkLoading>
              <ClerkLoaded>
                <UserButton />
              </ClerkLoaded>
            </SignedIn>
            <SignedOut>
              <Button variant="primaryOutline">
                <Link href="/sign-in" className="text-primaryColor">
                  Sign in
                </Link>
              </Button>
              <Button>
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </SignedOut>
          </div>
        </header>
      )}
      {isMobile && mode !== "sidebar" && (
        <button
          className="fixed top-4 right-4 z-50 p-2 bg-gray-800 text-white rounded-md"
          onClick={toggleSidebar}
        >
          <Menu className="size-4" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
