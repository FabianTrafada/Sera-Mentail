"use client";

import { useState, useEffect } from "react";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Loader2, Menu } from "lucide-react";
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
        <aside
          className={`w-64 h-screen bg-white text-black absolute p-4 flex flex-col justify-between  z-10 transition-transform duration-300 ${
            mode === "sidebar" || isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }`}
        >
          <div>
            <h1 className="text-lg font-bold text-primaryColor">SideNav</h1>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className={`p-2 rounded ${
                  isActive("/")
                    ? "border-b-2 border-primaryColor"
                    : "hover:border-b-2 hover:border-gray-300"
                }`}
              >
                Home
              </Link>
              <Link
                href="/diary"
                className={`p-2 rounded ${
                  isActive("/diary")
                    ? "border-b-2 border-primaryColor"
                    : "hover:border-b-2 hover:border-gray-300"
                }`}
              >
                Diary
              </Link>
              <Link
                href="/ChatWithJoy"
                className={`p-2 rounded ${
                  isActive("/ChatWithJoy")
                    ? "border-b-2 border-primaryColor"
                    : "hover:border-b-2 hover:border-gray-300"
                }`}
              >
                Chat With Joy
              </Link>
            </nav>
          </div>
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
        </aside>
      ) : (
        <header className="w-full h-16 text-black flex items-center justify-between px-4 fixed z-10 bg-white">
          <div className="flex items-center">
            <Image src="/favicon.ico" alt="logo" width={25} height={25} />
            <h1 className="pl-2 text-lg font-bold text-primaryColor">Carepulse</h1>
          </div>
          <nav className="absolute left-1/2 transform -translate-x-1/2 flex gap-x-12 items-center">
            <Link
              href="/"
              className={`pb-1 ${
                isActive("/")
                  ? "border-b-2 border-primaryColor"
                  : "hover:border-b-2 hover:border-gray-300"
              }`}
            >
              Home
            </Link>
            {isSignedIn && (<Link
              href="/dashboard"
              className={`pb-1 ${
                isActive("/dashboard")
                  ? "border-b-2 border-primaryColor"
                  : "hover:border-b-2 hover:border-gray-300"
              }`}
            >
              Dashboard
            </Link>)}
            <Link
              href="#features"
              className={`pb-1 ${
                isActive("#features")
                  ? "border-b-2 border-primaryColor"
                  : "hover:border-b-2 hover:border-gray-300"
              }`}
            >
              Features
            </Link>
            <Link
              href="#testimonial"
              className={`pb-1 ${
                isActive("testimonial")
                  ? "border-b-2 border-primaryColor"
                  : "hover:border-b-2 hover:border-gray-300"
              }`}
            >
              Testimonial
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
