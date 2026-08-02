import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IoAddSharp, IoRemoveSharp } from "react-icons/io5";
import { getMonthlyIncomingOutgoingStats } from "@/app/BackendAPICalls/EndPoints";
import API from "@/app/Libs/Axios/Axios";
import toast from "react-hot-toast";
import { FaArrowTrendDown, FaArrowTrendUp, FaPiggyBank } from "react-icons/fa6";
import { LuChartPie } from "react-icons/lu";

const WelcomeComponent = ({
  onAddExpenseClick,
  activeOption,
  refreshKey = 0,
  onDataChanged,
}) => {
  const [totalIncomings, setTotalIncomigs] = useState(null);
  const [totalOutgoings, setTotalOutgoings] = useState(null);
  const [totalSavings, setTotalSavings] = useState(null);
  const [savingsRate, setSavingsRate] = useState(null);

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

      const savings = incoming.amount + outgoing.amount;

      setTotalIncomigs(formatCurrency(incoming));
      setTotalOutgoings(formatCurrency(outgoing));
      setTotalSavings(
        formatCurrency({
          amount: savings,
          currency: incoming.currency || outgoing.currency,
        }),
      );
      // Derived from the same figures — no extra backend call.
      setSavingsRate(incoming.amount ? (savings / incoming.amount) * 100 : null);
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
          // Ledger and charts need to clear too.
          onDataChanged?.();
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

  // Refetches on mount and whenever a transaction is added or deleted
  // anywhere in the dashboard (refreshKey is bumped by the shell).
  useEffect(() => {
    getMonthlyIncomingOutgoingStatsData();
  }, [refreshKey]);

  const stats = [
    {
      label: "Incomings · month",
      value: totalIncomings,
      tone: "text-pos",
      icon: FaArrowTrendUp,
      note: "Money in",
    },
    {
      label: "Outgoings · month",
      value: totalOutgoings,
      tone: "text-neg",
      icon: FaArrowTrendDown,
      note: "Money out",
    },
    {
      label: "Savings · month",
      value: totalSavings,
      tone: "text-accent",
      icon: FaPiggyBank,
      note: "In minus out",
    },
    {
      label: "Savings rate",
      value: savingsRate === null ? "—" : `${savingsRate.toFixed(1)}%`,
      tone: savingsRate !== null && savingsRate < 0 ? "text-neg" : "text-text",
      icon: LuChartPie,
      note: "Of this month's income",
    },
  ];

  // Time-aware greeting, split into words so each can settle in on its own.
  const hour = currentTime.getHours();
  const salutation =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const greetingWords = `${salutation}, ${userName || "there"}`.split(" ");

  return (
    <div className="flex flex-col gap-4 md:gap-5">
      {/* Greeting ---------------------------------------------------- */}
      <section className="card animate-rise flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-start sm:justify-between md:px-6 md:py-5">
        <div className="min-w-0">
          <h2 className="display flex flex-wrap items-baseline gap-x-[0.28em] text-[22px] md:text-[26px]">
            {greetingWords.map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="reveal-word"
                style={{ animationDelay: `${60 + i * 70}ms` }}
              >
                {word}
              </span>
            ))}
          </h2>

          <span
            className="reveal-rule mt-2.5 block h-px w-16 bg-accent"
            aria-hidden="true"
          />

          <p className="mt-2.5 max-w-[68ch] text-[13px] leading-[1.6] text-text2">
            Manage your expenses, review reports, and keep track of where your
            money actually goes.
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          <span className="num rounded-[5px] border border-line bg-surface2 px-2.5 py-1.5 text-[11px] text-text2">
            {currentTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <span className="num rounded-[5px] border border-line bg-surface2 px-2.5 py-1.5 text-[11px] text-text2">
            {currentTime.toLocaleDateString([], {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </section>

      {/* Stat cards -------------------------------------------------- */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 md:gap-3.5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card animate-rise px-4 py-4 md:px-[17px]">
              <div className="eyebrow">{stat.label}</div>
              <div className="mt-[11px] flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <div
                    className={`num truncate text-[21px] font-medium tracking-[-0.02em] md:text-[25px] ${stat.tone}`}
                  >
                    {loading ? (
                      <span className="animate-pulse text-text3">···</span>
                    ) : (
                      (stat.value ?? "—")
                    )}
                  </div>
                  <div className="num mt-[6px] text-[10.5px] text-text3">
                    {stat.note}
                  </div>
                </div>
                <Icon className={`h-5 w-5 shrink-0 opacity-70 ${stat.tone}`} />
              </div>
            </div>
          );
        })}
      </section>

      {/* Quick actions ------------------------------------------------ */}
      {activeOption === "Dashboard" && (
        <section className="card animate-rise">
          <div className="card-head">
            <div className="card-title">Quick actions</div>
            <div className="eyebrow hidden sm:block">This month</div>
          </div>

          <div className="grid gap-3 p-4 sm:grid-cols-2 md:p-[16px]">
            <button
              type="button"
              onClick={onAddExpenseClick}
              className="rounded-[6px] border border-line bg-surface2 p-[13px] text-left transition-colors hover:border-accent-line hover:text-accent"
            >
              <div className="num text-[10px] text-text3">01</div>
              <div className="mt-2 flex items-center justify-between gap-2 text-[13.5px]">
                Log a transaction
                <IoAddSharp className="h-4 w-4" />
              </div>
            </button>

            {showDeleteConfirmation ? (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-[6px] border border-dashed border-neg bg-neg-soft p-[13px]">
                <div className="min-w-0">
                  <div className="text-[13px] text-neg">
                    Delete every expense?
                  </div>
                  <div className="num mt-1 text-[10.5px] text-text3">
                    This cannot be undone
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={deleting}
                    onClick={removeMyAllExpenses}
                    className="btn btn-sm btn-primary"
                    style={{ background: "var(--neg)" }}
                  >
                    Yes, delete
                  </button>
                  {!deleting && (
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirmation(false)}
                      className="btn btn-sm btn-secondary"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowDeleteConfirmation(true)}
                className="rounded-[6px] border border-dashed border-line2 bg-surface2 p-[13px] text-left transition-colors hover:border-neg hover:text-neg"
              >
                <div className="num text-[10px] text-text3">02</div>
                <div className="mt-2 flex items-center justify-between gap-2 text-[13.5px]">
                  Delete all expenses
                  <IoRemoveSharp className="h-4 w-4" />
                </div>
              </button>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default WelcomeComponent;
