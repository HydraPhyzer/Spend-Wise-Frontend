"use client";
import { useEffect } from "react";
import Navbar from "@/Components/Home/Navbar";
import DashboardNestedNavbar from "@/Components/DashboardComponents/DashboardNestedNavbar";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkTokenValidity } from "../BackendAPICalls/EndPoints";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = useSelector((state) => state.loginStatus);

  useEffect(() => {
    dispatch(checkTokenValidity(token, router));
  }, []);

  return (
    <div>
      <Navbar />
      <section className="md:mx-6 mx-4 md:my-6 my-4">
        <DashboardNestedNavbar/>
      </section>
    </div>
  );
};

export default Dashboard;
