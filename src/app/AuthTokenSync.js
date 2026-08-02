"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { setAuthToken } from "./Libs/Axios/Axios";

/**
 * Keeps the axios instance's bearer token in step with the store, so every
 * request is authenticated without each call site remembering to do it.
 * Renders nothing.
 */
export default function AuthTokenSync() {
  const token = useSelector((state) => state.loginStatus.token);

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  return null;
}
