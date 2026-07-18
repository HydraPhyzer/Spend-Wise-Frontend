"use client";
import React from "react";
import Image from "next/image";
import useScreenType from "@/Components/Screen/Resize";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { FaStarOfLife } from "react-icons/fa6";
import API from "@/app/Libs/Axios/Axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const SignupClient = () => {
  const screenType = useScreenType();
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
    <div className="flex text-xs md:text-sm lg:text-base">
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
          <span className="text-2xl font-bold">Get Started</span>
          <span className="font-bold">
            Welcome to Spend-Wise, All in One Your Funds Management Solution
          </span>
        </div>

        <span className="border-b-2 rounded-full w-full border-white my-5" />

        <span className="flex items-center gap-x-2 text-gray-500">
          <GoDotFill />
          <label className="text-gray-500">Enter Full Name</label>
        </span>
        <input
          className="border-2 border-gray-300 p-4 rounded-md bg-gray-100 outline-none"
          type="text"
          name="fullName"
          onChange={userSignUpDataHandler}
          placeholder="Full Name"
        />
        <br />
        <span className="flex items-center gap-x-2 text-gray-500">
          <GoDotFill />
          <label className="text-gray-500">Enter Email Address</label>
        </span>
        <input
          className="border-2 border-gray-300 p-4 rounded-md bg-gray-100 outline-none"
          type="email"
          placeholder="Email Address"
          name="emailAddress"
          onChange={userSignUpDataHandler}
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
          onChange={userSignUpDataHandler}
        />
        <br />
        <span className="flex items-center gap-x-2 text-gray-500">
          <GoDotFill />
          <label className="text-gray-500">Mention Gender</label>
        </span>
        <select
          className="border-2 border-gray-300 p-4 rounded-md bg-gray-100 outline-none"
          defaultValue={"Specify Your Gender"}
          name="gender"
          onChange={userSignUpDataHandler}
        >
          <option disabled>Specify Your Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <br />
        <button
          type="submit"
          className="p-4 rounded-md bg-blue-500 hover:cursor-pointer text-white"
          onClick={() => {
            signUpUserAccount();
          }}
        >
          SIGN UP
        </button>

        <span className="border-b-2 rounded-full w-full border-white my-5" />

        <p className="my-2">
          Already have an account?{" "}
          <Link
            href="/authentication/login"
            className="bg-black rounded-md text-white px-3 p-1"
          >
            Log In
          </Link>
        </p>
      </section>

      <section className="w-[50%] md:display-none bg-blue-500 m-4 overflow-hidden relative rounded-lg hidden md:flex justify-center items-center">
        <div className="w-100 h-100 rounded-full absolute top-0 left-0 translate-x-[-30%] translate-y-[-30%] bg-white">
          <div className="w-80 h-80 bg-blue-500 rounded-full absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2"></div>
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
          <div className="w-80 h-80 bg-blue-500 rounded-full absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </section>
    </div>
  );
};

export default SignupClient;
