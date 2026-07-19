import API from "@/app/Libs/Axios/Axios";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { MdDelete, MdDeleteSweep } from "react-icons/md";
import { FaBackward, FaForward } from "react-icons/fa";
import useScreenType from "@/Components/Screen/Resize";
import { FaBackwardStep, FaForwardStep } from "react-icons/fa6";
import toast from "react-hot-toast";
import { IoHandRightSharp } from "react-icons/io5";

const ViewReports = ({ categoriesData }) => {
  let authToken = useSelector((state) => state.loginStatus.token);
  let emailAddress = useSelector((state) => state.loginStatus.emailAddress);
  let uuid = useSelector((state) => state.loginStatus.uuid);

  const [deleteId, setDeleteId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let screenType = useScreenType();

  const debounceTimer = useRef(null);

  let eachReportData = {
    expense_id: null,
    expense_name: "",
    expense_amount: "",
    expense_date: "",
    flow_type: "",
    category_name: "",
    expense_description: "",
  };
  let searchQueryParam = {
    emailAddress: emailAddress,
    UUID: uuid,
    searchContent: "",
    searchCategory: "",
    dateFilter: "",
    previousButton: false,
    nextButton: false,
    filterPreviousButton: false,
    filterNextButton: false,
    buttonControlCounter: 0,
    filterControlCounter: 0,
  };

  let [reportData, setReportData] = React.useState([eachReportData]);
  let [queryParams, setQueryParams] = React.useState(searchQueryParam);

  // Search box updates state instantly (so typing feels responsive)
  // but the actual API call is debounced 400ms below, in the effect.
  let handleInputChange = (e) => {
    const { name, value } = e.target;
    setQueryParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  let fetchReports = () => {
    setIsLoading(true);
    API.get("/expenses/get-Expense", {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      params: {
        ...queryParams,
      },
    })
      .then((response) => {
        setReportData(response.data);
      })
      .catch((error) => {
        toast.error("Error fetching reports");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteReport = (expense_id) => {
    toast.promise(
      API.delete(
        `/expenses/delete-Expense/${emailAddress}/${uuid}/${expense_id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        },
      ),
      {
        loading: "Deleting Report...",
        success: (response) => {
          fetchReports();
          return "Report Deleted Successfully";
        },
        error: (err) => {
          return "Unable to Delete Report";
        },
      },
    );
  };

  // Single source of truth: any change to queryParams triggers a fetch.
  // Search field is debounced 400ms; everything else (pagination, filters,
  // category) fires immediately.
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(
      () => {
        fetchReports();
      },
      queryParams.searchContent ? 400 : 0,
    );

    return () => clearTimeout(debounceTimer.current);
  }, [queryParams]);

  return (
    <div className="w-full animate-fadeIn">
      <div className="w-full">
        <div className="w-full rounded-md flex md:flex-row flex-col justify-between gap-4 mb-4">
          <input
            type="text"
            name="searchContent"
            onChange={handleInputChange}
            placeholder="Search reports..."
            className="p-2 rounded-md w-full outline-none border border-gray-300 text-xs md:text-sm"
          />
          <select
            id="category"
            name="searchCategory"
            onChange={handleInputChange}
            className="p-2 rounded-md w-full outline-none border border-gray-300 text-xs md:text-sm"
          >
            <option value="">Select category</option>
            {categoriesData.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_icon}
                {category.category_name}
              </option>
            ))}
          </select>
          <div className="flex md:flex-row w-full justify-between gap-x-5">
            <button
              onClick={() => {
                setQueryParams((prev) => ({
                  ...prev,
                  filterPreviousButton: true,
                  filterNextButton: false,
                  filterControlCounter:
                    prev.filterControlCounter > 0
                      ? prev.filterControlCounter - 1
                      : 0,
                }));
              }}
              className="p-2 w-fit border-2 border-black rounded-md bg-black text-xs md:text-sm  text-white cursor-pointer"
            >
              <FaBackward className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setQueryParams((prev) => ({
                  ...prev,
                  previousButton: true,
                  nextButton: false,
                  buttonControlCounter:
                    prev.buttonControlCounter > 0
                      ? prev.buttonControlCounter - 1
                      : 0,
                }));
              }}
              className="p-2 w-fit border-2 border-black rounded-md bg-black text-xs md:text-sm  text-white cursor-pointer"
            >
              <FaBackwardStep className="w-4 h-4" />
            </button>

            <select
              className="p-2 w-full rounded-md outline-none border border-gray-300 text-xs md:text-sm"
              name="dateFilter"
              onChange={handleInputChange}
            >
              <option value="">Filter by Date (Default Monthly)</option>
              <option value="lastWeek">Last Week</option>
              <option value="lastMonth">Last Month</option>
              <option value="lastYear">Last Year</option>
            </select>
            <button
              onClick={() => {
                setQueryParams((prev) => ({
                  ...prev,
                  previousButton: false,
                  nextButton: true,
                  buttonControlCounter: prev.buttonControlCounter + 1,
                }));
              }}
              className="p-2 w-fit border-2 border-black rounded-md bg-black text-xs md:text-sm  text-white cursor-pointer"
            >
              <FaForwardStep className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setQueryParams((prev) => ({
                  ...prev,
                  filterPreviousButton: false,
                  filterNextButton: true,
                  filterControlCounter: prev.filterControlCounter + 1,
                }));
              }}
              className="p-2 w-fit border-2 border-black rounded-md bg-black text-xs md:text-sm  text-white cursor-pointer"
            >
              <FaForward className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Wrapper below gets position:relative so the loading overlay
            can sit on top of whatever data is currently showing * and bring to the centre of screen. */}
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10 rounded-md my-5">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
            </div>
          )}

          <div>
            {screenType != "mobile" && (
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2 text-xs sm:text-base">
                      Expense Name
                    </th>
                    <th className="border border-gray-300 p-2 text-xs sm:text-base">
                      Expense Amount
                    </th>
                    <th className="border border-gray-300 p-2 text-xs sm:text-base">
                      Expense Date
                    </th>
                    <th className="border border-gray-300 p-2 text-xs sm:text-base">
                      Flow Type
                    </th>
                    <th className="border border-gray-300 p-2 text-xs sm:text-base">
                      Category
                    </th>
                    <th className="border border-gray-300 p-2 text-xs sm:text-base">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.length > 0 ? (
                    reportData.map(
                      (report, index) =>
                        report.expense_id != null && (
                          <tr
                            key={report.expense_id}
                            className={`transform transition-all duration-700 ease-out
                            opacity-0 animate-fadeIn ${
                              index % 2 === 0 ? "bg-gray-100" : "bg-white"
                            }`}
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <td className="border border-gray-300 p-2 text-xs sm:text-base">
                              {report.expense_name}
                            </td>
                            <td className="border border-gray-300 p-2 text-xs sm:text-base">{`PKR ${report.expense_amount}`}</td>
                            <td className="border border-gray-300 p-2 text-xs sm:text-base">
                              {new Date(report.expense_date)
                                .toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })
                                .concat(
                                  " ",
                                  new Date(
                                    report.expense_date,
                                  ).toLocaleDateString("en-GB", {
                                    weekday: "long",
                                  }),
                                )}
                            </td>
                            <td className="border border-gray-300 p-2 text-xs sm:text-base">
                              {report.flow_type}
                            </td>
                            <td className="border border-gray-300 p-2 text-xs sm:text-base">
                              {categoriesData.find(
                                (category) =>
                                  category.category_id === report.category_name,
                              )?.category_name || "Unknown"}
                            </td>
                            <td className="border border-gray-300 p-2 text-xs sm:text-base">
                              {deleteId === report.expense_id ? (
                                <div className="w-full flex justify-between gap-1">
                                  <button
                                    className="bg-green-700 text-white w-full p-1 rounded"
                                    onClick={() => {
                                      deleteReport(report.expense_id);
                                      setDeleteId(null);
                                    }}
                                  >
                                    Yes
                                    <MdDeleteSweep className="w-4 h-4 md:w-6 md:h-6 inline mx-2" />
                                  </button>

                                  <button
                                    className="bg-yellow-500 text-white w-full p-1 rounded"
                                    onClick={() => setDeleteId(null)}
                                  >
                                    No
                                    <IoHandRightSharp className="w-4 h-4 md:w-6 md:h-6 inline mx-2" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  className="p-1 w-full border rounded-md border-gray-300 bg-red-500 text-white text-xs md:text-sm hover:cursor-pointer"
                                  onClick={() => setDeleteId(report.expense_id)}
                                >
                                  Delete Entry
                                  <MdDeleteSweep className="w-4 h-4 md:w-6 md:h-6 inline mx-2" />
                                </button>
                              )}
                            </td>
                          </tr>
                        ),
                    )
                  ) : (
                    <tr>
                      <td
                        className="border border-gray-300 p-2 text-center"
                        colSpan="6"
                      >
                        <Image
                          src="/Data-Controls/No-Record-Found.jpg"
                          alt="No data"
                          width={200}
                          height={200}
                          className="mx-auto mt-4 opacity-75"
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

            {/* Mobile View */}

            {screenType === "mobile" && (
              <div className="flex flex-col gap-4">
                {reportData.length > 0 ? (
                  reportData.map(
                    (report, index) =>
                      report.expense_id != null && (
                        <div
                          key={report.expense_id}
                          className="border border-gray-300 rounded-md p-4 pt-12 relative
                          transform transition-all duration-700 ease-out
                          opacity-0 translate-y-6 animate-fadeIn"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex justify-between flex-row">
                            <p className="text-xs font-bold">Expense Name</p>
                            <p className="text-xs sm:text-base text-gray-500">
                              {report.expense_name}
                            </p>
                          </div>

                          <div className="flex justify-between flex-row">
                            <p className="text-xs font-bold">Expense Date</p>
                            <p className="text-xs sm:text-base text-gray-500">
                              {new Date(report.expense_date)

                                .toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })
                                .concat(
                                  " ",
                                  new Date(
                                    report.expense_date,
                                  ).toLocaleDateString("en-GB", {
                                    weekday: "long",
                                  }),
                                )}
                            </p>
                          </div>
                          <div className="flex justify-between flex-row">
                            <p className="text-xs font-bold">Flow Type</p>
                            <p className="text-xs sm:text-base text-gray-500">
                              {report.flow_type}
                            </p>
                          </div>
                          <div className="flex justify-between flex-row">
                            <p className="text-xs font-bold">Category</p>
                            <p className="text-xs sm:text-base text-gray-500">
                              {report.category_name}
                            </p>
                          </div>

                          <hr className="my-2 border-gray-300" />

                          <div className="flex justify-between flex-row">
                            <p className="text-xs font-bold">Expense Amount</p>
                            <p className="text-xs sm:text-base text-gray-500">{`PKR ${report.expense_amount}`}</p>
                          </div>

                          <MdDelete className="absolute top-0 right-0 bg-black text-red p-1 rounded-bl-md w-8 h-8 cursor-pointer" />
                        </div>
                      ),
                  )
                ) : (
                  <Image
                    src="/Data-Controls/No-Record-Found.jpg"
                    alt="No data"
                    width={200}
                    height={200}
                    className="mx-auto mt-4 opacity-75"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReports;