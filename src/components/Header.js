"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-black shadow-md fixed top-0 w-full z-50 h-16 flex items-center"> {/* ✅ Set fixed height */}
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href={isLoggedIn ? "/dashboard" : "/"} className="text-2xl font-bold text-gray-900 dark:text-white">
          Noovos
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link href="/services" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            Services
          </Link>
          <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            About
          </Link>
          <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            Contact
          </Link>

          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Dashboard
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/auth" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Login
            </Link>
          )}
        </nav>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700 dark:text-white">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
