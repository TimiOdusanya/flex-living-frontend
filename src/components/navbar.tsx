'use client';

import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Home, Info, Briefcase, Phone, LogIn } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="fixed w-full bg-[#284E4C] z-50">
      <div className="max-w-[90vw] mx-auto flex items-center justify-between h-[88px]">
        <div className="flex-shrink-0 cursor-pointer" onClick={() => router.push('/')}>
          <Image
            src="/images/flex-logo-2.webp"
            alt="Flex Living"
            width={120}
            height={120}
            className=""
          />
        </div>
        <div className="">

          <div className="ml-10 flex items-baseline space-x-10">
            <a
              href="#properties"
              className="flex items-center text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <Home className="w-4 h-4 mr-2 text-white" />
              Properties
            </a>
            <a
              href="#about"
              className="flex items-center text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <Info className="w-4 h-4 mr-2 text-white" />
              About us
            </a>
            <a
              href="#about"
              className="flex items-center text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <Briefcase className="w-4 h-4 mr-2 text-white" />
              Careers
            </a>
            <a
              href="#contact"
              className="flex items-center text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <Phone className="w-4 h-4 mr-2 text-white" />
              Contact
            </a>
            <Link href="/manager/login">
              <Button className="flex items-center bg-white hover:bg-white text-[#284E4C]">
                <LogIn className="w-4 h-4 mr-2" />
                Manager Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
