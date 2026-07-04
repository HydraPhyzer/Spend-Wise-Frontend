import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoMdCube } from "react-icons/io";
import { IoMdCog } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import toast from "react-hot-toast";
import API from "@/app/Libs/Axios/Axios";
import { updateLogoutStatus } from "@/app/Redux/Slices/Slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const AvatarDropdown = ({ fullName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();



  const toggleDropdown = () => setIsOpen(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logOut = async() => {
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
  }

  return (
<div ref={dropdownRef} className="relative">
  <button
    onClick={toggleDropdown}
    className="text-white text-xs md:text-base shadow-xs font-medium rounded-base focus:outline-none md:p-4 p-2 flex items-center gap-x-2"
    type="button"
  >
    {fullName ? fullName : "User"}
    <IoIosArrowDropdownCircle className="w-4 h-4 md:w-6 md:h-6" />
  </button>

  {isOpen && (
    <div className="absolute mt-2 mx-auto rounded-md z-10 bg-black shadow-lg w-full">
      <ul className="p-2 text-xs md:text-base text-body font-medium">
        <li>
          <Link href="/dashboard" className="inline-flex items-center gap-x-2 w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">
            <IoMdCube className="w-4 h-4 md:w-6 md:h-6"/>
            Dashboard
          </Link>
        </li>
        <hr className="my-2 border-gray-600" />
        <li>
          <Link href="/settings" className="inline-flex items-center gap-x-2 w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">
            <IoMdCog className="w-4 h-4 md:w-6 md:h-6"/>
            Settings
          </Link>
        </li>
        <hr className="my-2 border-gray-600" />
        <li onClick={logOut}>
          <a
            href="#"
            className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium gap-x-2 hover:text-heading rounded"
          >
            <IoLogOut className="w-4 h-4 md:w-6 md:h-6"/>
            Log-Out
          </a>
        </li>
      </ul>
      
    </div>
  )}
</div>
)};
