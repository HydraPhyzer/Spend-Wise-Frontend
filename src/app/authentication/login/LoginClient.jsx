"use client";
import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import API from "@/app/Libs/Axios/Axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { updateLoginStatus } from "@/app/Redux/Slices/Slice";
import Brand from "@/Components/UI/Brand";
import ThemeToggle from "@/Components/UI/ThemeToggle";
import AuthAside from "@/Components/UI/AuthAside";

const LoginClient = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loginUserData, setLoginUserData] = useState({
    emailAddress: "",
    password: "",
  });

  const userLoginDataHandler = (e) => {
    const { name, value } = e.target;
    setLoginUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  let loginUserAccount = () => {
    const { emailAddress, password } = loginUserData;

    if (!emailAddress || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      toast.promise(API.post("/users/login", loginUserData), {
        loading: "Logging In ...",
        success: (response) => {
          if (response.data.loginResult) {
            dispatch(updateLoginStatus(response.data));
            router.push("/dashboard");
            return "User Logged In Successfully";
          } else {
            throw new Error("Unable to Log In User");
          }
        },
        error: (err) => "Unable to Log In User",
      });
    } catch (error) {
      toast.error("Unable to Log In User");
    }
  };

  return (
    <div
      className="flex min-h-screen bg-bg"
      onKeyDown={(event) => event.key === "Enter" && loginUserAccount()}
    >
      <section className="flex w-full flex-col justify-center px-5 py-8 sm:px-10 lg:w-1/2 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-[420px]">
          <div className="mb-8 flex items-start justify-between gap-4">
            <Brand href="/" subtitle="Funds Management" />
            <ThemeToggle />
          </div>

          <div className="eyebrow">Welcome back</div>
          <h1 className="display mt-2 text-[32px] md:text-[38px]">
            Log in to Spend-Wise
          </h1>
          <p className="mt-3 text-[13.5px] leading-[1.6] text-text2">
            Pick up where you left off — your ledger, categories, and reports
            are exactly as you left them.
          </p>

          <div className="my-7 border-t border-line" />

          <div className="flex flex-col gap-4">
            <div>
              <label className="field-label" htmlFor="login-email">
                Email address
              </label>
              <input
                id="login-email"
                className="field h-11"
                type="email"
                placeholder="you@example.com"
                name="emailAddress"
                autoComplete="email"
                onChange={userLoginDataHandler}
              />
            </div>

            <div>
              <label className="field-label" htmlFor="login-password">
                Password
              </label>
              <input
                id="login-password"
                className="field h-11"
                type="password"
                placeholder="••••••••"
                name="password"
                autoComplete="current-password"
                onChange={userLoginDataHandler}
              />
            </div>

            <button
              type="submit"
              className="btn btn-lg btn-primary mt-2 w-full"
              onClick={loginUserAccount}
            >
              Log in
            </button>
          </div>

          <div className="my-7 border-t border-line" />

          <p className="num text-[11px] text-text3">
            Don&apos;t have an account?{" "}
            <Link href="/authentication/signup" className="text-accent">
              Create one →
            </Link>
          </p>
        </div>
      </section>

      <AuthAside />
    </div>
  );
};

export default LoginClient;
