import React, { useEffect, useRef, useState } from "react";
import { IoMdCube, IoMdCog } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { LuChevronDown } from "react-icons/lu";
import toast from "react-hot-toast";
import API from "@/app/Libs/Axios/Axios";
import { updateLogoutStatus } from "@/app/Redux/Slices/Slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";

const initialsOf = (name) =>
  (name || "User")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

/**
 * variant "pill"    — compact control for the marketing header
 * variant "sidebar" — full-width identity row for the dashboard rail
 */
export const AvatarDropdown = ({ fullName, subtitle = "Personal", variant = "pill" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logOut = async () => {
    try {
      toast.promise(API.post("/users/logout"), {
        loading: "Logging Out ...",
        success: (response) => {
          if (response.data.logoutResult) {
            dispatch(updateLogoutStatus(response.data));
            router.push("/authentication/login");
            return "User Logged Out Successfully";
          } else {
            throw new Error("Unable to Log Out User");
          }
        },
        error: (err) => "Unable to Log Out User",
      });
    } catch (error) {
      toast.error("Unable to Log Out User");
    }
  };

  const avatar = (
    <span className="num grid h-7 w-7 shrink-0 place-items-center rounded-full border border-accent-line bg-accent-soft text-[11px] text-accent">
      {initialsOf(fullName)}
    </span>
  );

  const menuItem =
    "flex w-full items-center gap-[9px] rounded-[5px] px-2.5 py-2 text-[13px] text-text2 transition-colors hover:bg-hover hover:text-text";

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={toggleDropdown}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className={
          variant === "sidebar"
            ? "flex w-full items-center gap-[10px] rounded-[5px] px-1 py-1 text-left transition-colors hover:bg-hover"
            : "btn btn-secondary gap-2 px-2 pr-2.5"
        }
      >
        {avatar}
        {variant === "sidebar" ? (
          <span className="min-w-0 flex-1 leading-[1.25]">
            <span className="block truncate text-[12.5px]">
              {fullName || "User"}
            </span>
            <span className="num block text-[10px] text-text3">{subtitle}</span>
          </span>
        ) : (
          <span className="hidden max-w-[140px] truncate text-[13px] sm:block">
            {fullName || "User"}
          </span>
        )}
        <LuChevronDown
          className={`h-4 w-4 shrink-0 text-text3 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className={`card animate-rise absolute z-50 w-[200px] overflow-hidden p-1.5 ${
            variant === "sidebar"
              ? "bottom-[calc(100%+8px)] left-0"
              : "right-0 top-[calc(100%+8px)]"
          }`}
          style={{ background: "var(--raise)" }}
        >
          <Link href="/dashboard" className={menuItem} onClick={() => setIsOpen(false)}>
            <IoMdCube className="h-4 w-4 text-text3" />
            Dashboard
          </Link>
          <Link href="/settings" className={menuItem} onClick={() => setIsOpen(false)}>
            <IoMdCog className="h-4 w-4 text-text3" />
            Settings
          </Link>
          <div className="my-1.5 border-t border-line" />
          <button type="button" onClick={logOut} className={`${menuItem} hover:text-neg`}>
            <IoLogOut className="h-4 w-4 text-text3" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
};
