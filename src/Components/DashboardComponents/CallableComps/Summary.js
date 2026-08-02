import {
  getMonthlyIncomingOutgoingStatsForYear,
  getYearlySpendingsOnDiffCategories,
} from "@/app/BackendAPICalls/EndPoints";
import { LineChart, PieChart } from "@/Components/Charts/SampleChart";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Summary = ({ refreshKey = 0 }) => {
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

  // Also refetches when a transaction is added or deleted elsewhere.
  useEffect(() => {
    getMonthlyIncomingOutgoingStatsForYearMethod();
    getYearlySpendingsOnDiffCategoriesMethod();
  }, [refreshKey]);

  const flowsReady =
    monthsData.length > 0 &&
    incomingsData.length > 0 &&
    outgoingsData.length > 0;

  const categoriesReady =
    categories.length > 0 && categoriesSpenings.length > 0;

  return (
    <div className="animate-fadeIn grid w-full items-start gap-3.5 xl:grid-cols-[minmax(0,1.62fr)_minmax(0,1fr)]">
      <ChartCard
        title="Income vs Expense"
        subtitle="Trailing 12 months"
        legend={[
          { label: "Incomings", color: "var(--accent)" },
          { label: "Outgoings", color: "var(--neg)" },
        ]}
        ready={flowsReady}
      >
        <LineChart
          monthsData={monthsData}
          dataset1={incomingsData}
          dataset2={outgoingsData}
        />
      </ChartCard>

      <ChartCard
        title="Spend by category"
        subtitle="Yearly totals"
        ready={categoriesReady}
      >
        <PieChart labels={categories} dataset1={categoriesSpenings} />
      </ChartCard>
    </div>
  );
};

const ChartCard = ({ title, subtitle, legend, ready, children }) => {
  return (
    <div className="card overflow-hidden">
      <div className="card-head">
        <div className="min-w-0">
          <div className="card-title">{title}</div>
          <div className="num mt-[3px] text-[10.5px] text-text3">{subtitle}</div>
        </div>

        {legend && (
          <div className="num hidden shrink-0 gap-3.5 text-[11px] sm:flex">
            {legend.map((item) => (
              <span key={item.label} className="flex items-center gap-1.5">
                <span
                  className="h-[9px] w-[9px] rounded-[2px]"
                  style={{ background: item.color }}
                />
                {item.label}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="h-[300px] p-4 md:h-[340px] md:p-[18px]">
        {ready ? (
          children
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-accent" />
            <p className="num text-[11px] text-text3">Loading chart data…</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;
