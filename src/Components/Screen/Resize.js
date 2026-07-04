"use client";
import { useState, useEffect } from "react";

const useScreenType = () => {
  const [screenType, setScreenType] = useState("laptop"); // default

  useEffect(() => {
    // Only runs on client
    const getScreenType = () => {
      const width = window.innerWidth;
      if (width < 768) return "mobile";
      if (width >= 768 && width < 1024) return "tablet";
      return "laptop";
    };

    // Set initial screen type
    setScreenType(getScreenType());

    const handleResize = () => setScreenType(getScreenType());
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenType;
};

export default useScreenType;
