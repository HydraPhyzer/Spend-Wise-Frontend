"use client";
import React, { useState } from "react";
import Image from "next/image";
import useScreenType from "@/Components/Screen/Resize";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { FaStarOfLife } from "react-icons/fa6";
import toast from "react-hot-toast";
import API from "@/app/Libs/Axios/Axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { updateLoginStatus } from "@/app/Redux/Slices/Slice";

const LoginClient = () => {
  const screenType = useScreenType();
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
    <div className="flex text-xs md:text-sm lg:text-base flex-row-reverse" onKeyDown={(event) => event.key === "Enter" && loginUserAccount()}>
      <section className="w-full md:w-[50%] min-h-screen md:p-20 p-5 md:justify-center flex flex-col md:gap-y-2 gap-y-1">
        <div className="flex flex-col gap-y-2 text-gray-500">
          <Link href="/">
            <Image
              src="/Logo/spend-wise-logo.png"
              alt="Spend-Wise Logo"
              width={screenType === "laptop" ? 70 : 50}
              height={screenType === "laptop" ? 70 : 50}
            />
          </Link>
          <span className="text-2xl font-bold">Let's Gooooo</span>
          <span className="font-bold">Welcome Back Spend-Wise 🖐</span>
        </div>

        <span className="border-b-2 rounded-full w-full border-white my-5" />

        <span className="flex items-center gap-x-2 text-gray-500">
          <GoDotFill />
          <label className="text-gray-500">Enter Email Address</label>
        </span>
        <input
          className="border-2 border-gray-300 p-4 rounded-md bg-gray-100 outline-none"
          type="email"
          placeholder="Email Address"
          name="emailAddress"
          onChange={userLoginDataHandler}
        />
        <br />
        <span className="flex items-center gap-x-2 text-gray-500">
          <GoDotFill />
          <label className="text-gray-500">Enter Password</label>
        </span>
        <input
          className="border-2 border-gray-300 p-4 rounded-md bg-gray-100 outline-none"
          type="password"
          placeholder="Password"
          name="password"
          onChange={userLoginDataHandler}
        />
        <br />
        <button
          type="submit"
          className="p-4 rounded-md bg-orange-500 hover:cursor-pointer text-white"
          onClick={loginUserAccount}
        >
          LOG IN
        </button>

        <span className="border-b-2 rounded-full w-full border-white my-5" />

        <p className="my-2">
          Don't have an account?{" "}
          <Link
            href="/authentication/signup"
            className="bg-black rounded-md text-white px-3 p-1"
          >
            Sign Up
          </Link>
        </p>
      </section>

      <section className="w-[50%] md:display-none bg-orange-500 m-4 overflow-hidden relative rounded-lg hidden md:flex justify-center items-center">
        <div className="w-100 h-100 rounded-full absolute top-0 left-0 translate-x-[-30%] translate-y-[-30%] bg-white">
          <div className="w-80 h-80 bg-orange-500 rounded-full absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="space-y-6 text-white">
          <span className="flex justify-center items-center gap-x-2">
            <FaStarOfLife />
            <FaStarOfLife />
            <FaStarOfLife />
            <FaStarOfLife />
            <FaStarOfLife />
          </span>
          <p className="text-center text-white px-[20%] text-lg font-semibold">
            Spend-Wise helps you manage your finances effectively by tracking
            expenses, creating budgets, and providing insightful reports to make
            informed financial decisions.
          </p>

          <span className="flex justify-center items-center gap-x-2">
            <FaStarOfLife />
            <FaStarOfLife />
            <FaStarOfLife />
            <FaStarOfLife />
            <FaStarOfLife />
          </span>
        </div>

        <div className="w-100 h-100 rounded-full absolute bottom-0 right-0 translate-x-[30%] translate-y-[30%] bg-white">
          <div className="w-80 h-80 bg-orange-500 rounded-full absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </section>
    </div>
  );
};

export default LoginClient;
