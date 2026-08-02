"use client";

import { useEffect } from "react";
import DashboardNestedNavbar from "@/Components/DashboardComponents/DashboardNestedNavbar";
import { useSelector, useDispatch } from "react-redux";
import {
  checkBackendHealth,
  checkTokenValidity,
} from "../BackendAPICalls/EndPoints";
import { useRouter } from "next/navigation";

export default function DashboardClient() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { token } = useSelector((state) => state.loginStatus);

  // The dashboard now has its own shell (no marketing navbar), so the session
  // and backend-health polling that used to live in Navbar runs here instead.
  useEffect(() => {
    const runChecks = () => {
      dispatch(checkBackendHealth());
      dispatch(checkTokenValidity(token, router));
    };
    runChecks();

    const interval = setInterval(runChecks, 60000);

    return () => clearInterval(interval);
  }, [dispatch, token, router]);

  return <DashboardNestedNavbar />;
}
