"use client";

import Navbar from "@/Components/Home/Navbar";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-4 py-16 md:px-8">
        <div className="card animate-rise w-full max-w-[560px] overflow-hidden">
          <div className="card-head">
            <div className="card-title">Page not found</div>
            <span className="badge badge-neg">404</span>
          </div>

          <div className="px-5 py-8 md:px-8 md:py-10">
            <div className="display num text-[64px] leading-none text-text3 md:text-[84px]">
              404
            </div>

            <p className="mt-5 max-w-[52ch] text-[14px] leading-[1.65] text-text2">
              The page you&apos;re looking for doesn&apos;t exist, or it may
              have been moved.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/" className="btn btn-primary hover:text-white">
                Go home
              </Link>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="btn btn-secondary"
              >
                Go back
              </button>
            </div>
          </div>

          <div className="num border-t border-line px-5 py-4 text-[10.5px] text-text3 md:px-8">
            If you think this is a mistake, contact support.
          </div>
        </div>
      </main>
    </div>
  );
}
