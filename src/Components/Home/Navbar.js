"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  checkBackendHealth,
  checkTokenValidity,
} from "@/app/BackendAPICalls/EndPoints";
import { AvatarDropdown } from "../SampleComponents/AvatarDropdown";
import { useRouter } from "next/navigation";
import Brand from "../UI/Brand";
import ThemeToggle from "../UI/ThemeToggle";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { status } = useSelector((state) => state.backendStatus);
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
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
      <div className="page-shell flex items-center justify-between gap-4 py-3 md:py-4">
        <div className="flex min-w-0 items-center gap-4">
          <Brand subtitle={null} />

          <span
            className="hidden h-[var(--control-h)] items-center gap-2 rounded-[var(--control-r)] border border-line bg-surface px-3 sm:flex"
            title={status ? "Backend online" : "Backend unreachable"}
          >
            <span
              className={`h-[7px] w-[7px] shrink-0 animate-pulse rounded-full ${
                status ? "bg-pos" : "bg-neg"
              }`}
            />
            <span className="eyebrow">{status ? "Online" : "Offline"}</span>
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />

          {loginResult ? (
            <AvatarDropdown fullName={fullName} />
          ) : (
            <>
              <Link
                href="/authentication/login"
                className="btn btn-secondary"
              >
                Log in
              </Link>
              <Link
                href="/authentication/signup"
                className="btn btn-primary hover:text-white"
              >
                <span className="hidden sm:inline">Create account</span>
                <span className="sm:hidden">Sign up</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
