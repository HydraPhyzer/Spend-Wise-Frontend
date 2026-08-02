import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

/**
 * The bearer token used to live only at individual call sites, so any request
 * that forgot it went out unauthenticated (the categories fetch did exactly
 * that). It is now held here and attached by an interceptor; an explicit
 * per-request Authorization header still takes precedence.
 */
let authToken = null;

export const setAuthToken = (token) => {
  authToken = token || null;
};

API.interceptors.request.use((config) => {
  if (authToken && !config.headers?.Authorization) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

export default API;
