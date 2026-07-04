"use client";

import Navbar from "@/Components/Home/Navbar";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-h-screen overflow-hidden">
      <Navbar />
      <div className="flex h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="text-9xl font-extrabold text-black tracking-widest">
          404
        </h1>

        <div className="absolute rotate-12 rounded bg-red-500 px-2 text-sm font-semibold text-white">
          Page Not Found
        </div>

        <p className="mt-6 max-w-md text-lg text-gray-800">
          Oops! The page you’re looking for doesn’t exist or may have been moved.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/"
            className="rounded-lg bg-black  text-white px-6 py-3 font-semibold t transition "
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="rounded-lg bg-black border px-6 py-3 font-semibold text-slate-200 transition"
          >
            Go Back
          </button>
        </div>

        <p className="mt-10 text-sm text-gray-800">
          If you think this is a mistake, contact support.
        </p>
      </div>
    </div>
  );
}
