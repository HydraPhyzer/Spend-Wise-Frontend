import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="page-shell flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="num text-[10.5px] text-text3">
          <span>&copy;</span> {new Date().getFullYear()} Spend-Wise · personal
          funds management
        </div>

        <div className="num flex flex-wrap items-center gap-x-5 gap-y-2 text-[10.5px] text-text3">
          <Link href="/home#features" className="hover:text-text">
            Features
          </Link>
          <Link href="/home#how" className="hover:text-text">
            How it works
          </Link>
          <Link href="/dashboard" className="hover:text-text">
            Dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
