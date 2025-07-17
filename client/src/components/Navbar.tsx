"use client";

import { useEffect, useRef, useState } from "react";
import { auth } from "../lib/firebase";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { moviesService } from "../services/movies";

const menuItemsDesktop = [
  { label: "Home", href: "/" },
  { label: "TV Shows", href: "/tv-show" },
  { label: "Movies", href: "/movies" },
  { label: "New & Popular", href: "/new-and-popular" },
];

const menuItemsMobile = [
  { label: "Home", href: "/" },
  { label: "TV Shows", href: "/tv-show" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement | null>(null);

  // Monitor Firebase Auth user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  // Fetch genres on mount
  useEffect(() => {
    moviesService
      .fetchGenres(50, 0)
      .then((res) => {
        setGenres(res.data || []);
      })
      .catch((err) => {
        console.error("Error fetching genres:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setIsCategoryOpen(false);
      }
    }

    if (isCategoryOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCategoryOpen]);

  // Handle Firebase sign out
  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser(null);
      setSidebarOpen(false);
    });
  };

  if (loading) return null;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex flex-col px-6 py-4 bg-transparent bg-opacity-60 text-white">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link href="/">
              <Image
                src="/NetflixLogo.png"
                alt="Netflix"
                width={120}
                height={32}
                priority
                className="hidden md:block"
              />
              <Image
                src="/NetflixIcon.png"
                alt="Netflix Icon"
                width={40}
                height={20}
                priority
                className="block md:hidden h-8 w-auto"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              {menuItemsDesktop.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`hover:underline text-shadow-xs ${
                    pathname === href ? "font-bold text-white" : ""
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Sign In / Profile */}
          {user ? (
            <button
              onClick={() => setSidebarOpen(true)}
              className="focus:outline-none"
            >
              <Image
                src={user.photoURL ?? "/NoImageAvailable.png"}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full border border-white"
              />
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-red-600 hover:bg-red-700 font-semibold text-white px-6 py-2 rounded cursor-pointer"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu + Category Dropdown */}
        <div className="flex justify-center items-center md:hidden gap-4 mt-2 text-[14px] flex-wrap">
          {menuItemsMobile.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`hover:underline text-shadow-xs ${
                pathname === href ? "font-bold text-white" : ""
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Category dropdown (click) */}
          <div className="relative" ref={categoryRef}>
            <button
              onClick={() => setIsCategoryOpen((prev) => !prev)}
              className="cursor-pointer hover:underline text-shadow-xs font-medium"
            >
              Categories
            </button>

            {isCategoryOpen && (
              <div className="absolute left-0 mt-2 bg-black text-white text-sm rounded shadow-lg z-50 min-w-[150px] max-h-[300px] overflow-y-auto">
                {genres.map((genre) => (
                  <Link
                    key={genre}
                    href={`/movies/categories/${encodeURIComponent(
                      genre.toLowerCase()
                    )}`}
                    className="block px-4 py-2 hover:bg-white/10 whitespace-nowrap w-full text-left"
                    onClick={() => setIsCategoryOpen(false)}
                  >
                    {genre}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar drawer for profile actions */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/80 z-40"
            onClick={() => setSidebarOpen(false)}
          ></div>

          <div className="fixed right-0 top-0 w-64 h-full bg-white text-black z-50 shadow-lg flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <span className="font-bold">Account</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <p className="font-semibold mb-2">
                {user?.displayName || "Anonymous"}
              </p>
              <button
                onClick={handleSignOut}
                className="w-full bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
              >
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
