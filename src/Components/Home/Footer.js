import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray py-6 text-center mt-auto">
      <div className="mx-auto max-w-7xl px-6 text-xs md:text-sm text-black">
        <span>&copy;</span> {new Date().getFullYear()} Spend-Wise. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
