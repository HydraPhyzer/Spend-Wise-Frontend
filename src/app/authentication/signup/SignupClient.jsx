"use client";
import React from "react";
import Link from "next/link";
import API from "@/app/Libs/Axios/Axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Brand from "@/Components/UI/Brand";
import ThemeToggle from "@/Components/UI/ThemeToggle";
import AuthAside from "@/Components/UI/AuthAside";

const SignupClient = () => {
  const router = useRouter();
  const [userSignUpData, setUserSignUpData] = useState({
    fullName: "",
    emailAddress: "",
    password: "",
    gender: "",
  });

  const userSignUpDataHandler = (e) => {
    const { name, value } = e.target;
    setUserSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateName = (name) => {
    const nameRegex = /^[A-Z][a-zA-Z ]+$/;
    if (!nameRegex.test(name.trim())) {
      return "Name Should Start with Capital Letter and Contain only Letters & Spaces.";
    }
    return "";
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return "Please Enter a Valid Email Address";
    }
    return "";
  };

  let signUpUserAccount = () => {
    const { fullName, emailAddress, password, gender } = userSignUpData;
    if (!fullName || !emailAddress || !password || !gender) {
      toast.error("All Fields are Required");
      return;
    }
    const nameError = validateName(fullName);
    if (nameError) {
      toast.error(nameError);
      return;
    }
    const emailError = validateEmail(emailAddress);
    if (emailError) {
      toast.error(emailError);
      return;
    }

    try {
      toast.promise(API.post("/users/signup", userSignUpData), {
        loading: "Creating User Account ...",
        success: (response) => {
          if (response.data === 1) {
            router.push("/authentication/login");
            return "User Account Created Successfully";
          } else {
            throw new Error("Unable to Create User Account");
          }
        },
        error: (err) => "Unable to Create User Account",
      });
    } catch (error) {
      toast.error("Unable to Create User Account");
    }
  };

  return (
    <div className="flex min-h-screen bg-bg">
      <section className="flex w-full flex-col justify-center px-5 py-8 sm:px-10 lg:w-1/2 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-[420px]">
          <div className="mb-8 flex items-start justify-between gap-4">
            <Brand href="/" subtitle="Funds Management" />
            <ThemeToggle />
          </div>

          <div className="eyebrow">Get started</div>
          <h1 className="display mt-2 text-[32px] md:text-[38px]">
            Create your account
          </h1>
          <p className="mt-3 text-[13.5px] leading-[1.6] text-text2">
            All-in-one funds management — income, expenses, transfers, and the
            analytics to make sense of them.
          </p>

          <div className="my-7 border-t border-line" />

          <div className="flex flex-col gap-4">
            <div>
              <label className="field-label" htmlFor="signup-name">
                Full name
              </label>
              <input
                id="signup-name"
                className="field h-11"
                type="text"
                name="fullName"
                autoComplete="name"
                onChange={userSignUpDataHandler}
                placeholder="Ana Reyes"
              />
            </div>

            <div>
              <label className="field-label" htmlFor="signup-email">
                Email address
              </label>
              <input
                id="signup-email"
                className="field h-11"
                type="email"
                placeholder="you@example.com"
                name="emailAddress"
                autoComplete="email"
                onChange={userSignUpDataHandler}
              />
            </div>

            <div>
              <label className="field-label" htmlFor="signup-password">
                Password
              </label>
              <input
                id="signup-password"
                className="field h-11"
                type="password"
                placeholder="••••••••"
                name="password"
                autoComplete="new-password"
                onChange={userSignUpDataHandler}
              />
            </div>

            <div>
              <label className="field-label" htmlFor="signup-gender">
                Gender
              </label>
              <select
                id="signup-gender"
                className="field h-11"
                defaultValue=""
                name="gender"
                onChange={userSignUpDataHandler}
              >
                <option value="" disabled>
                  Specify your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-lg btn-primary mt-2 w-full"
              onClick={() => {
                signUpUserAccount();
              }}
            >
              Create account
            </button>
          </div>

          <div className="my-7 border-t border-line" />

          <p className="num text-[11px] text-text3">
            Already have an account?{" "}
            <Link href="/authentication/login" className="text-accent">
              Log in →
            </Link>
          </p>
        </div>
      </section>

      <AuthAside />
    </div>
  );
};

export default SignupClient;
