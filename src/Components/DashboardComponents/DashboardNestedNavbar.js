import React, { useEffect, useState } from "react";
import { IoMdCube } from "react-icons/io";
import { IoPieChart, IoAddSharp, IoClose } from "react-icons/io5";
import { LuTableOfContents, LuMenu } from "react-icons/lu";
import { useSelector } from "react-redux";

import WelcomeComponent from "./WelcomeComponent";
import AddExpense from "./CallableComps/AddExpense";
import Summary from "./CallableComps/Summary";
import AddCategories from "./CallableComps/AddCategories";
import ViewReports from "./CallableComps/ViewReports";
import API from "@/app/Libs/Axios/Axios";
import useScreenType from "../Screen/Resize";
import Brand from "../UI/Brand";
import ThemeToggle from "../UI/ThemeToggle";
import { AvatarDropdown } from "../SampleComponents/AvatarDropdown";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [{ num: "01", label: "Dashboard", icon: IoMdCube }],
  },
  {
    label: "Money",
    items: [
      { num: "02", label: "View Reports", icon: LuTableOfContents },
      { num: "03", label: "Report Summary", icon: IoPieChart },
    ],
  },
];

const PAGE_META = {
  Dashboard: { kicker: "Overview", title: "Dashboard" },
  "View Reports": { kicker: "Ledger", title: "View Reports" },
  "Report Summary": { kicker: "Analytics", title: "Report Summary" },
  "Add Categories": { kicker: "Setup", title: "Add Categories" },
};

const DashboardNestedNavbar = () => {
  const [activeOption, setActiveOption] = useState("Dashboard");
  const [categoriesData, setCategoriesData] = useState([]);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Bumped whenever a transaction is created or deleted. Every data-bound
  // panel watches it, so a save on one screen refreshes the others instantly
  // instead of waiting for a tab switch or the 60s poll.
  const [refreshKey, setRefreshKey] = useState(0);

  const notifyDataChanged = () => setRefreshKey((k) => k + 1);

  const screenType = useScreenType();
  const { status } = useSelector((state) => state.backendStatus);
  const fullName = useSelector((state) => state.loginStatus.fullName);

  const handleOptionClick = (option) => {
    setActiveOption(option);
    setShowAddExpense(false); // hide AddExpense when switching tabs
    setDrawerOpen(false);
  };

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await API.get("/categories/get-All-Categories");
        setCategoriesData(response.data);
      } catch (error) {
        console.error("Error Fetching Categories : ", error);
      }
    }
    getCategories();
  }, []);

  // Lock body scroll while the mobile navigation drawer is open.
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const meta = PAGE_META[activeOption] || { kicker: "Spend-Wise", title: activeOption };

  const navList = (
    <nav className="flex-1 overflow-y-auto px-2.5 pb-5 pt-3.5">
      {NAV_GROUPS.map((group) => (
        <div key={group.label} className="mb-4">
          <div className="eyebrow px-2.5 pb-[7px] text-[9.5px] tracking-[0.16em]">
            {group.label}
          </div>
          {group.items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                className="nav-item"
                data-active={activeOption === item.label}
                onClick={() => handleOptionClick(item.label)}
              >
                <span className="num w-4 shrink-0 text-[10px] text-text3">
                  {item.num}
                </span>
                <span className="flex-1 truncate">{item.label}</span>
                <Icon className="h-4 w-4 shrink-0 opacity-70" />
              </button>
            );
          })}
        </div>
      ))}
    </nav>
  );

  const sidebarFooter = (
    <div className="border-t border-line px-3 py-3">
      <div className="mb-2 flex items-center gap-2 px-1">
        <span
          className={`h-[7px] w-[7px] shrink-0 animate-pulse rounded-full ${
            status ? "bg-pos" : "bg-neg"
          }`}
        />
        <span className="eyebrow">
          {status ? "Backend online" : "Backend offline"}
        </span>
      </div>
      <AvatarDropdown fullName={fullName} variant="sidebar" />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-bg">
      {/* Desktop rail ------------------------------------------------ */}
      <aside className="sticky top-0 hidden h-screen w-[246px] shrink-0 flex-col border-r border-line bg-surface lg:flex">
        {/* Same fixed height as the main header so both hairlines line up. */}
        <div className="flex h-[var(--header-h)] shrink-0 items-center border-b border-line px-5">
          <Brand />
        </div>
        {navList}
        {sidebarFooter}
      </aside>

      {/* Mobile / tablet drawer -------------------------------------- */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0"
            style={{ background: "var(--scrim)" }}
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="animate-rise absolute left-0 top-0 flex h-full w-[262px] max-w-[85vw] flex-col border-r border-line bg-surface">
            <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-line px-5">
              <Brand />
              <button
                type="button"
                aria-label="Close navigation"
                onClick={() => setDrawerOpen(false)}
                className="btn btn-secondary btn-icon"
              >
                <IoClose className="h-4 w-4" />
              </button>
            </div>
            {navList}
            {sidebarFooter}
          </aside>
        </div>
      )}

      {/* Main column -------------------------------------------------- */}
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-[var(--header-h)] items-center justify-between gap-4 border-b border-line bg-bg px-4 md:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              aria-label="Open navigation"
              onClick={() => setDrawerOpen(true)}
              className="btn btn-secondary btn-icon lg:hidden"
            >
              <LuMenu className="h-4 w-4" />
            </button>

            <div className="min-w-0">
              <div className="eyebrow tracking-[0.14em]">{meta.kicker}</div>
              <h1 className="display mt-1 truncate text-[21px] md:text-[29px]">
                {meta.title}
              </h1>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setShowAddExpense(true)}
              className="btn btn-primary"
            >
              <IoAddSharp className="h-4 w-4" />
              <span className="hidden sm:inline">Add transaction</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </header>

        <div className="w-full max-w-[1560px] px-4 pb-16 pt-4 md:px-8 md:pb-16 md:pt-[26px]">
          <div className="flex flex-col gap-4 md:gap-5">
            {((screenType === "mobile" && activeOption === "Dashboard") ||
              screenType !== "mobile") && (
              <WelcomeComponent
                onAddExpenseClick={() => setShowAddExpense(true)}
                activeOption={activeOption}
                refreshKey={refreshKey}
                onDataChanged={notifyDataChanged}
              />
            )}

            {activeOption === "View Reports" && (
              <ViewReports
                categoriesData={categoriesData}
                refreshKey={refreshKey}
                onDataChanged={notifyDataChanged}
              />
            )}
            {activeOption === "Report Summary" && (
              <Summary refreshKey={refreshKey} />
            )}
            {activeOption === "Add Categories" && (
              <AddCategories categoriesData={categoriesData} />
            )}
          </div>
        </div>
      </main>

      {showAddExpense && (
        <AddExpense
          categoriesData={categoriesData}
          setShowAddExpense={setShowAddExpense}
          onSaved={notifyDataChanged}
        />
      )}
    </div>
  );
};

export default DashboardNestedNavbar;
