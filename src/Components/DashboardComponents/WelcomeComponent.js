import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IoAddSharp, IoRemoveSharp } from "react-icons/io5";
import { getMonthlyIncomingOutgoingStats } from "@/app/BackendAPICalls/EndPoints";
import API from "@/app/Libs/Axios/Axios";
import toast from "react-hot-toast";

const WelcomeComponent = ({ onAddExpenseClick, activeOption }) => {
  const [totalIncomings, setTotalIncomigs] = useState(null);
  const [totalOutgoings, setTotalOutgoings] = useState(null);
  const [totalSavings, setTotalSavings] = useState(null);

  const [loading, setLoading] = useState(true);

  const userName = useSelector((state) => state.loginStatus.fullName);
  const userEmail = useSelector((state) => state.loginStatus.emailAddress);
  const uuid = useSelector((state) => state.loginStatus.uuid);
  const token = useSelector((state) => state.loginStatus.token);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [currentTime, setCurrentTime] = useState(new Date());

  const parseAmount = (value) => {
    if (!value) {
      return {
        amount: 0,
        currency: "PKR",
      };
    }

    const currency = String(value)
      .replace(/[\d\s,.-]/g, "")
      .trim();
    const amount = Number(String(value).replace(/[^\d.-]/g, ""));

    return {
      amount,
      currency,
    };
  };

  const formatCurrency = ({ amount, currency }) => {
    return new Intl.NumberFormat(navigator.language, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getMonthlyIncomingOutgoingStatsData = async () => {
    try {
      setLoading(true);

      const data = await getMonthlyIncomingOutgoingStats(
        token,
        userEmail,
        uuid,
      );

      let incoming = { amount: 0, currency: "PKR" };
      let outgoing = { amount: 0, currency: "PKR" };

      data.forEach((item) => {
        if (item.Incoming !== undefined) {
          incoming = parseAmount(item.Incoming);
        }

        if (item.Outgoing !== undefined) {
          outgoing = parseAmount(item.Outgoing);
        }
      });

      setTotalIncomigs(formatCurrency(incoming));
      setTotalOutgoings(formatCurrency(outgoing));
      setTotalSavings(
        formatCurrency({
          amount: incoming.amount + outgoing.amount,
          currency: incoming.currency || outgoing.currency,
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  const removeMyAllExpenses = () => {
    setDeleting(true);

    toast.promise(
      API.delete(`/expenses/remove-All-Expenses/${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      {
        loading: "Removing all Expenses...",
        success: () => {
          getMonthlyIncomingOutgoingStatsData();
          setShowDeleteConfirmation(false);
          setDeleting(false);
          return "All Expenses Removed Successfully!";
        },
        error: () => {
          setDeleting(false);
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
        <div className="text-left bg-white w-full p-2 rounded-md">
          <p>Total Incomings (Month)</p>
          <h1 className="animate-fadeIn font-bold md:text-2xl text-lg text-green">
            {loading ? (
              <span className="animate-pulse">...</span>
            ) : (
              totalIncomings
            )}
          </h1>
        </div>

        <div className="text-left bg-white p-2 rounded-md w-full">
          <p>Total Outgoings (Month)</p>
          <h1 className="animate-fadeIn font-bold md:text-2xl text-lg text-red">
            {loading ? (
              <span className="animate-pulse">...</span>
            ) : (
              totalOutgoings
            )}
          </h1>
        </div>

        <div className="text-left bg-white p-2 rounded-md w-full">
          <p>Total Savings (Month)</p>
          <h1 className="animate-fadeIn font-bold md:text-2xl text-lg text-blue">
            {loading ? (
              <span className="animate-pulse">...</span>
            ) : (
              totalSavings
            )}
          </h1>
        </div>

        {activeOption === "Dashboard" && (
          <div className="col-span-2 flex items-center w-full justify-end mt-2 md:mt-0 md:col-auto md:absolute bottom-0 gap-x-2">
            <div className="relative h-12 min-w-[330px] flex justify-end">
              {/* Delete Button */}
              <div
                className={`absolute right-0 transition-all duration-300 ease-in-out ${
                  showDeleteConfirmation
                    ? "opacity-0 scale-95 pointer-events-none"
                    : "opacity-100 scale-100"
                }`}
              >
                <button
                  className="bg-red-700 text-white rounded-md md:rounded-full p-3 px-4 md:text-sm text-xs  cursor-pointer flex items-center gap-2"
                  onClick={() => setShowDeleteConfirmation(true)}
                >
                  Delete All Expense
                  <IoRemoveSharp className="w-4 h-4 md:w-6 md:h-6" />
                </button>
              </div>

              {/* Confirmation Box */}
              <div
                className={`absolute right-0 transition-all duration-300 ease-in-out ${
                  showDeleteConfirmation
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="bg-white  rounded-full p-3 px-4 flex items-center gap-3 whitespace-nowrap">
                  <p className="text-xs md:text-sm font-medium">
                    Are you sure?
                  </p>

                  <button
                    disabled={deleting}
                    onClick={removeMyAllExpenses}
                    className="bg-red-700 text-white rounded-full px-4 py-1 text-xs md:text-sm cursor-pointer disabled:opacity-70"
                  >
                    Yes
                  </button>

                  {!deleting && (
                    <button
                      onClick={() => setShowDeleteConfirmation(false)}
                      className="bg-black text-white rounded-full px-4 py-1 text-xs md:text-sm cursor-pointer"
                    >
                      No
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Add Button */}
            <button
              className="bg-green-700 text-white rounded-md md:rounded-full p-3 px-4 md:text-sm text-xs cursor-pointer flex items-center gap-2 shrink-0"
              onClick={onAddExpenseClick}
            >
              Add New Expense
              <IoAddSharp className="w-4 h-4 md:w-6 md:h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default WelcomeComponent;
