import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IoAddSharp, IoRemoveSharp } from "react-icons/io5";
import { getMonthlyIncomingOutgoingStats } from "@/app/BackendAPICalls/EndPoints";
import API from "@/app/Libs/Axios/Axios";
import toast from "react-hot-toast";

const WelcomeComponent = ({ onAddExpenseClick, activeOption }) => {
  let [totalIncomings, setTotalIncomigs] = useState(0);
  let [totalOutgoings, setTotalOutgoings] = useState(0);

  const userName = useSelector((state) => state.loginStatus.fullName);
  const userEmail = useSelector((state) => state.loginStatus.emailAddress);
  const uuid = useSelector((state) => state.loginStatus.uuid);
  const token = useSelector((state) => state.loginStatus.token);

  const [currentTime, setCurrentTime] = useState(new Date());

  const getMonthlyIncomingOutgoingStatsData = async () => {
    const data = await getMonthlyIncomingOutgoingStats(token, userEmail, uuid);
    data.forEach((item) => {
      if (item.Incoming) {
        setTotalIncomigs(item.Incoming);
      }
      if (item.Outgoing) {
        setTotalOutgoings(item.Outgoing);
      }
    });
  };

  const removeMyAllExpenses = () => {
    toast.promise(
      API.delete(`/expenses/remove-All-Expenses/${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      {
        loading: "Removing all Expenses...",
        success: (response) => {
          getMonthlyIncomingOutgoingStatsData();
          return "All Expenses Removed Successfully!";
        },
        error: (error) => {
          console.error(error);
          return "Failed to Remove all Expenses.";
        },
      },
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      getMonthlyIncomingOutgoingStatsData();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getMonthlyIncomingOutgoingStatsData();
  }, []);

  return (
    <div className="bg-yellow p-6 rounded-lg w-full h-[35vh] md:h-[30vh] flex flex-col justify-between relative border-2 border-black">
      <section>
        <h1 className="md:text-3xl text-md font-bold">
          Hi <span className="transform animate-from-top">{userName}</span>{" "}
          <span className="bg-black rounded-md p-1">👋</span>
        </h1>
        <br />
        <p className="md:text-base text-xs">
          Here you can manage your expenses, view reports, and add new options
          to track your spending effectively.
        </p>
      </section>

      <div className="absolute top-4 right-4 gap-2 text-gray-600 md:flex hidden">
        <p className="mt-4 bg-black text-white rounded-md  p-2 px-3 md:text-sm text-xs ">
          {currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

        <p className="mt-4  bg-black text-white rounded-md  p-2 px-3 md:text-sm text-xs ">
          {currentTime.toLocaleDateString([], {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-8 gap-6 w-full mt-6 text-xs md:text-base relative">
        <div className="text-left bg-white border-2 border-black w-full p-2 rounded-md">
          <p>Total Incomings (Month)</p>
          <h1 className="animate-fadeIn font-bold md:text-2xl text-lg text-green">
            {totalIncomings}
          </h1>
        </div>

        <div className="text-left bg-white border-2 border-black p-2 rounded-md w-full">
          <p>Total Outgoings (Month)</p>
          <h1 className="animate-fadeIn font-bold md:text-2xl text-lg text-red">
            {totalOutgoings}
          </h1>
        </div>
        {activeOption === "Dashboard" && (
          <div className="col-span-2 flex w-full justify-end mt-2 md:mt-0 md:col-auto md:absolute bottom-0 gap-x-2">
            <button
              className="bg-red-700 text-white rounded-md md:rounded-full p-2 px-3 md:text-sm text-xs border-2 border-black cursor-pointer flex items-center gap-2"
              onClick={removeMyAllExpenses}
            >
              Delete All Expense{" "}
              <IoRemoveSharp className="w-4 h-4 md:w-6 md:h-6" />
            </button>
            <button
              className="bg-green-700 text-white rounded-md md:rounded-full p-2 px-3 md:text-sm text-xs border-2 border-black cursor-pointer flex items-center gap-2"
              onClick={onAddExpenseClick}
            >
              Add New Expense <IoAddSharp className="w-4 h-4 md:w-6 md:h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default WelcomeComponent;
