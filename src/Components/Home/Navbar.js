"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useScreenType from "../Screen/Resize";
import { useDispatch, useSelector } from "react-redux";
import {
  checkBackendHealth,
  checkTokenValidity,
} from "@/app/BackendAPICalls/EndPoints";
import { AvatarDropdown } from "../SampleComponents/AvatarDropdown";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const screenType = useScreenType();
  const dispatch = useDispatch();
  const router = useRouter();

  const { status, statusMessage } = useSelector((state) => state.backendStatus);
  const { loginResult, fullName, token } = useSelector(
    (state) => state.loginStatus,
  );

  useEffect(() => {
    const runChecks = () => {
      dispatch(checkBackendHealth());
      loginResult && dispatch(checkTokenValidity(token, router));
    };
    runChecks();

    const interval = setInterval(runChecks, 60000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="border-b border-gray-300 sticky top-0 bg-white z-50">
      <main className="md:mx-6 mx-4">
        <header className="flex gap-x-6 flex-row justify-between items-center">
          <div className="flex items-center md:gap-x-3 gap-x-1">
            <Image
              src="/Logo/spend-wise-logo.png"
              alt="SpendWise Logo"
              width={50}
              height={50}
            />

            <span className="md:text-3xl font-bold">
              <Link href="/home">Spend-Wise</Link>
            </span>

            {screenType === "laptop" && (
              <section className="flex items-center gap-x-2 md:ml-4 bg-black text-white md:p-2 p-1 rounded-md">
                <span
                  className={`${status ? "bg-green" : "bg-red"} md:h-4 md:w-4 h-2 w-2 rounded-full animate-pulse`}
                ></span>
                <span
                  className={`${status ? "bg-green" : "bg-red"} md:h-4 md:w-4 h-2 w-2 rounded-full animate-pulse`}
                ></span>
                <span
                  className={`${status ? "bg-green" : "bg-red"} md:h-4 md:w-4 h-2 w-2 rounded-full animate-pulse`}
                ></span>
              </section>
            )}
          </div>

          <div className="relative flex items-center md:p-4 p-2 gap-x-4 py-4 md:px-6 font-semibold cursor-pointer text-xs md:text-base">
            {!loginResult && <Link href="/authentication/login">Log In</Link>}
            <span
              className={`bg-black text-white rounded-md ${!loginResult && "md:p-4 p-2"}`}
            >
              {loginResult ? (
                <AvatarDropdown fullName={fullName} />
              ) : screenType === "laptop" ? (
                <Link href="/authentication/signup" className="">
                  Create Account
                </Link>
              ) : (
                <Link href="/authentication/signup">Sign Up</Link>
              )}
            </span>
          </div>
        </header>
      </main>
    </div>
  );
};

export default Navbar;
