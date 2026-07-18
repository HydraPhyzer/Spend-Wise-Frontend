import React, { useEffect, useState } from "react";
import { IoMdCube } from "react-icons/io";
import { IoPieChart } from "react-icons/io5";
import { IoAddCircle } from "react-icons/io5";
import WelcomeComponent from "./WelcomeComponent";
import AddExpense from "./CallableComps/AddExpense";
import Summary from "./CallableComps/Summary";
import AddCategories from "./CallableComps/AddCategories";import API from "@/app/Libs/Axios/Axios";
import { LuTableOfContents } from "react-icons/lu";

import ViewReports from "./CallableComps/ViewReports";
import useScreenType from "../Screen/Resize";
 "./CallableComps/AddCategories";

const DashboardNestedNavbar = () => {
  const options = ["Dashboard", "View Reports", "Report Summary"];
  const [activeOption, setActiveOption] = useState("Dashboard");
  const [categoriesData, setCategoriesData] = useState([]);
  const [showAddExpense, setShowAddExpense] = useState(false);

  let screenType = useScreenType();

  const handleOptionClick = (option) => {
    setActiveOption(option);
    setShowAddExpense(false); // hide AddExpense when switching tabs
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

  return (
    <div className="md:gap-6 gap-2 flex flex-col items-start justify-between w-full">
      <nav className="bg-black md:w-fit text-white rounded-md md:p-4 p-2 flex w-full">
        <ul className="flex md:gap-10 gap-2 text-xl font-semibold w-full whitespace-nowrap overflow-x-scroll md:overflow-hidden ScrollSetting">
          {options.map((option) => (
            <li
              key={option}
              className={`cursor-pointer p-2 md:px-3 md:text-sm text-xs rounded-sm ${
                activeOption === option ? "bg-white text-black items-center" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
              {option === "Dashboard" ? (
                <IoMdCube className="inline-block ml-2 w-4 h-4 md:w-6 md:h-6 items-center" />
              ) : option === "View Reports" ? (
                <LuTableOfContents className="inline-block ml-2 w-4 h-4 md:w-6 md:h-6 items-center" />
              ) : option === "Report Summary" ? (
                <IoPieChart className="inline-block ml-2 w-4 h-4 md:w-6 md:h-6" />
              ) : option === "Add Categories" ? (
                <IoAddCircle className="inline-block ml-2 w-4 h-4 md:w-6 md:h-6" />
              ) : null}
            </li>
          ))}
        </ul>
      </nav>

      {((screenType==='mobile' && activeOption === "Dashboard") || (screenType!=='mobile')) && (
        <WelcomeComponent onAddExpenseClick={() => setShowAddExpense(true)} activeOption={activeOption} />
      )}
      {showAddExpense && <AddExpense categoriesData={categoriesData} setShowAddExpense={setShowAddExpense} />}
      {activeOption === "View Reports" && <ViewReports categoriesData={categoriesData}/>}
      {activeOption === "Report Summary" && <Summary />}
      {activeOption === "Add Categories" && <AddCategories categoriesData={categoriesData} />}
    </div>
  );
};


export default DashboardNestedNavbar;