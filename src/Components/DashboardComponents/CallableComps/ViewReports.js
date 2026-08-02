import API from "@/app/Libs/Axios/Axios";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { MdDeleteSweep } from "react-icons/md";
import { FaBackward, FaForward } from "react-icons/fa";
import useScreenType from "@/Components/Screen/Resize";
import { FaBackwardStep, FaForwardStep } from "react-icons/fa6";
import toast from "react-hot-toast";
import { IoHandRightSharp, IoSearch } from "react-icons/io5";
import CategoryTag, {
  categoryOptionLabel,
} from "@/Components/UI/CategoryTag";

const COLS =
  "grid-cols-[110px_minmax(0,1fr)_150px_120px_130px_150px] min-w-[880px]";

const ViewReports = ({ categoriesData, refreshKey = 0, onDataChanged }) => {
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
          // Keep the month stats and charts in step with the ledger.
          onDataChanged?.();
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
  // category) fires immediately. refreshKey is bumped when a transaction is
  // saved elsewhere, so the ledger updates without a tab switch.
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(
      () => {
        fetchReports();
      },
      queryParams.searchContent ? 400 : 0,
    );

    return () => clearTimeout(debounceTimer.current);
  }, [queryParams, refreshKey]);

  const goFilterPrevious = () =>
    setQueryParams((prev) => ({
      ...prev,
      filterPreviousButton: true,
      filterNextButton: false,
      filterControlCounter:
        prev.filterControlCounter > 0 ? prev.filterControlCounter - 1 : 0,
    }));

  const goPagePrevious = () =>
    setQueryParams((prev) => ({
      ...prev,
      previousButton: true,
      nextButton: false,
      buttonControlCounter:
        prev.buttonControlCounter > 0 ? prev.buttonControlCounter - 1 : 0,
    }));

  const goPageNext = () =>
    setQueryParams((prev) => ({
      ...prev,
      previousButton: false,
      nextButton: true,
      buttonControlCounter: prev.buttonControlCounter + 1,
    }));

  const goFilterNext = () =>
    setQueryParams((prev) => ({
      ...prev,
      filterPreviousButton: false,
      filterNextButton: true,
      filterControlCounter: prev.filterControlCounter + 1,
    }));

  const formatDate = (value) =>
    new Date(value)
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .concat(
        " ",
        new Date(value).toLocaleDateString("en-GB", { weekday: "long" }),
      );

  const categoryOf = (report) =>
    categoriesData.find(
      (category) => category.category_id === report.category_name,
    );

  const categoryTag = (report) => {
    const category = categoryOf(report);
    return (
      <CategoryTag
        icon={category?.category_icon}
        name={category?.category_name || "Unknown"}
        className="max-w-full"
      />
    );
  };

  const navBtn = "btn btn-secondary btn-icon";

  const rows = reportData.filter((report) => report.expense_id != null);

  const emptyState = (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-12">
      <Image
        src="/Data-Controls/No-Record-Found.jpg"
        alt="No data"
        width={180}
        height={180}
        className="opacity-70 rounded-2xl mix-blend-multiply dark:mix-blend-normal dark:opacity-40"
      />
      <p className="num text-[11px] text-text3">
        No transactions match the current filters
      </p>
    </div>
  );

  return (
    <div className="animate-fadeIn flex w-full flex-col gap-3.5">
      {/* Toolbar ------------------------------------------------------ */}
      <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center">
        <div className="field-shell flex-1">
          <IoSearch className="h-4 w-4 shrink-0 text-text3" />
          <input
            type="text"
            name="searchContent"
            onChange={handleInputChange}
            placeholder="Search description, name, amount…"
          />
        </div>

        <select
          id="category"
          name="searchCategory"
          onChange={handleInputChange}
          className="field lg:w-[200px]"
        >
          <option value="">All categories</option>
          {categoriesData.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {categoryOptionLabel(category)}
            </option>
          ))}
        </select>

        <select
          className="field lg:w-[210px]"
          name="dateFilter"
          onChange={handleInputChange}
        >
          <option value="">Filter by date (monthly)</option>
          <option value="lastWeek">Last Week</option>
          <option value="lastMonth">Last Month</option>
          <option value="lastYear">Last Year</option>
        </select>

        <div className="flex items-center justify-between gap-2 lg:justify-start">
          <button type="button" onClick={goFilterPrevious} className={navBtn} title="Previous filter range">
            <FaBackward className="h-3.5 w-3.5" />
          </button>
          <button type="button" onClick={goPagePrevious} className={navBtn} title="Previous page">
            <FaBackwardStep className="h-3.5 w-3.5" />
          </button>
          <button type="button" onClick={goPageNext} className={navBtn} title="Next page">
            <FaForwardStep className="h-3.5 w-3.5" />
          </button>
          <button type="button" onClick={goFilterNext} className={navBtn} title="Next filter range">
            <FaForward className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Ledger ------------------------------------------------------- */}
      <div className="card relative overflow-hidden">
        <div className="card-head">
          <div className="card-title">Transactions</div>
          <div className="num text-[10.5px] text-text3">
            {rows.length} {rows.length === 1 ? "record" : "records"} on this page
          </div>
        </div>

        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[color-mix(in_srgb,var(--surface)_65%,transparent)]">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-accent" />
          </div>
        )}

        {/* Desktop / tablet table */}
        {screenType !== "mobile" && (
          <div className="overflow-x-auto">
            <div
              className={`grid ${COLS} border-b border-line bg-surface2 px-4 py-2.5 md:px-[18px]`}
            >
              <div className="eyebrow">Date</div>
              <div className="eyebrow">Expense</div>
              <div className="eyebrow">Category</div>
              <div className="eyebrow">Flow</div>
              <div className="eyebrow text-right">Amount</div>
              <div className="eyebrow text-right">Actions</div>
            </div>

            {rows.length > 0
              ? rows.map((report, index) => (
                  <div
                    key={report.expense_id}
                    className={`animate-fadeIn grid ${COLS} items-center border-b border-line px-4 py-[11px] text-[13.5px] opacity-0 transition-colors last:border-b-0 hover:bg-hover md:px-[18px]`}
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <div className="num text-[11.5px] text-text2">
                      {new Date(report.expense_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </div>

                    <div className="min-w-0 pr-3">
                      <div className="truncate">{report.expense_name}</div>
                      <div className="num truncate text-[10.5px] text-text3">
                        {formatDate(report.expense_date)}
                      </div>
                    </div>

                    <div className="min-w-0 pr-3">
                      {categoryTag(report)}
                    </div>

                    <div className="min-w-0 pr-3">
                      <span
                        className={`badge max-w-full ${
                          report.flow_type === "Incoming"
                            ? "badge-pos"
                            : "badge-neg"
                        }`}
                      >
                        <span className="truncate">{report.flow_type}</span>
                      </span>
                    </div>

                    <div
                      className={`num min-w-0 truncate text-right text-[13.5px] ${
                        report.flow_type === "Incoming" ? "text-pos" : "text-text"
                      }`}
                      title={`PKR ${report.expense_amount}`}
                    >
                      {`PKR ${report.expense_amount}`}
                    </div>

                    <div className="flex justify-end pl-3">
                      {deleteId === report.expense_id ? (
                        <div className="flex gap-1.5">
                          <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            style={{ background: "var(--neg)" }}
                            onClick={() => {
                              deleteReport(report.expense_id);
                              setDeleteId(null);
                            }}
                          >
                            <MdDeleteSweep className="h-4 w-4" />
                            Yes
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-secondary"
                            onClick={() => setDeleteId(null)}
                          >
                            <IoHandRightSharp className="h-3.5 w-3.5" />
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => setDeleteId(report.expense_id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))
              : emptyState}
          </div>
        )}

        {/* Mobile cards */}
        {screenType === "mobile" && (
          <div>
            {rows.length > 0
              ? rows.map((report, index) => (
                  <div
                    key={report.expense_id}
                    className="animate-fadeIn border-b border-line px-4 py-4 opacity-0 last:border-b-0"
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-[14px]">
                          {report.expense_name}
                        </div>
                        <div className="num mt-1 text-[10.5px] text-text3">
                          {formatDate(report.expense_date)}
                        </div>
                      </div>
                      <div
                        className={`num max-w-[45%] shrink-0 break-all text-right text-[14px] ${
                          report.flow_type === "Incoming"
                            ? "text-pos"
                            : "text-text"
                        }`}
                      >
                        {`PKR ${report.expense_amount}`}
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {categoryTag(report)}
                      <span
                        className={`badge ${
                          report.flow_type === "Incoming"
                            ? "badge-pos"
                            : "badge-neg"
                        }`}
                      >
                        {report.flow_type}
                      </span>
                    </div>

                    <div className="mt-3">
                      {deleteId === report.expense_id ? (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="btn btn-sm btn-primary flex-1"
                            style={{ background: "var(--neg)" }}
                            onClick={() => {
                              deleteReport(report.expense_id);
                              setDeleteId(null);
                            }}
                          >
                            <MdDeleteSweep className="h-4 w-4" />
                            Delete
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-secondary flex-1"
                            onClick={() => setDeleteId(null)}
                          >
                            <IoHandRightSharp className="h-3.5 w-3.5" />
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-sm btn-danger w-full"
                          onClick={() => setDeleteId(report.expense_id)}
                        >
                          Delete entry
                        </button>
                      )}
                    </div>
                  </div>
                ))
              : emptyState}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewReports;
