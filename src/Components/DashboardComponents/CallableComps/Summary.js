import {
  getMonthlyIncomingOutgoingStatsForYear,
  getYearlySpendingsOnDiffCategories,
} from "@/app/BackendAPICalls/EndPoints";
import { LineChart, PieChart, BarChart } from "@/Components/Charts/SampleChart";
import React, { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { useSelector } from "react-redux";

const Summary = () => {
  let [monthsData, setMonthsData] = useState([]);
  let [incomingsData, setIncomingsData] = useState([]);
  let [outgoingsData, setOutgoingsData] = useState([]);

  let [categories, setCategories] = useState([]);
  let [categoriesSpenings, setCategoriesSpenings] = useState([]);

  const userEmail = useSelector((state) => state.loginStatus.emailAddress);
  const uuid = useSelector((state) => state.loginStatus.uuid);
  const token = useSelector((state) => state.loginStatus.token);

  const getMonthlyIncomingOutgoingStatsForYearMethod = async () => {
    const data = await getMonthlyIncomingOutgoingStatsForYear(
      token,
      userEmail,
      uuid,
    );
    const yearlyData = data[0];

    const months = Object.keys(yearlyData);
    const incomings = months.map((month) => Number(yearlyData[month].Incoming));
    const outgoings = months.map((month) => Number(yearlyData[month].Outgoing));

    setMonthsData(months);
    setIncomingsData(incomings);
    setOutgoingsData(outgoings);
  };
  const getYearlySpendingsOnDiffCategoriesMethod = async () => {
    const data = await getYearlySpendingsOnDiffCategories(
      token,
      userEmail,
      uuid,
    );

    let catArray = [];
    let catSpendArray = [];

    data.map((item, index) => {
      setCategories(...categories, item.category_name);
      catArray.push(item.category_name);
      catSpendArray.push(item.total_spent);
    });
    setCategories(catArray);
    setCategoriesSpenings(catSpendArray);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getMonthlyIncomingOutgoingStatsForYearMethod();
      getYearlySpendingsOnDiffCategoriesMethod();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getMonthlyIncomingOutgoingStatsForYearMethod();
    getYearlySpendingsOnDiffCategoriesMethod();
  }, []);

  return (
    <div className="w-full animate-fadeIn border-2 border-black rounded-lg p-2 bg-white">
      <div className="flex flex-col md:flex-row gap-2 md:gap-2 w-full h-full">
        {monthsData.length === 0 ||
        incomingsData.length === 0 ||
        outgoingsData.length === 0 ||
        categories.length === 0 ||
        categoriesSpenings.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <InfinitySpin width="100" color="black" />
            <p className="text-black text-xs md:text-xl font-semibold ml-4">
              Loading Summary Data
            </p>
          </div>
        ) : (
          <>
            <ChildComponent
              graphText="Line Chart (Yearly Report)"
              chartType={
                <LineChart
                  monthsData={monthsData}
                  dataset1={incomingsData}
                  dataset2={outgoingsData}
                />
              }
            />
            <ChildComponent
              graphText="Pie Chart (Yearly Report)"
              chartType={
                <PieChart labels={categories} dataset1={categoriesSpenings} />
              }
            />
          </>
        )}
      </div>
    </div>
  );
};

const ChildComponent = ({ graphText, chartType }) => {
  return (
    <div className="w-full h-full bg-gray-100 rounded-md p-4 mx-auto items-center flex justify-start flex-col">
      <div className="w-full flex justify-between flex-row-reverse mb-4">
        <h2 className="text-md md:text-2xl font-bold mb-4">{graphText}</h2>
      </div>
      <figure className="w-fit max-h-full md:w-full md:h-full flex items-center justify-center">
        {chartType}
      </figure>
    </div>
  );
};

export default Summary;
