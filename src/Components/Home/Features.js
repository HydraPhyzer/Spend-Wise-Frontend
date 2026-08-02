import React from "react";

const features = [
  {
    title: "Track income & expenses",
    desc: "Log inflows and outflows with categories, dates, and notes — every movement in one ledger.",
  },
  {
    title: "Smart categories",
    desc: "Organise spending across food, shopping, bills, and anything else you care to measure.",
  },
  {
    title: "People & transfers",
    desc: "Keep track of who you send money to, how much, and how often.",
  },
  {
    title: "Visual analytics",
    desc: "Read your money as charts and breakdowns instead of rows of raw numbers.",
  },
  {
    title: "Time-based insights",
    desc: "Compare weekly, monthly, and yearly performance without exporting anything.",
  },
  {
    title: "Secure & private",
    desc: "Token-backed authentication keeps your records yours, on every device.",
  },
];

const steps = [
  {
    title: "Create an account",
    desc: "One email, one password. No card, no onboarding maze.",
  },
  {
    title: "Add your transactions",
    desc: "Record income and expenses as they happen, tagged by category.",
  },
  {
    title: "Analyse & improve",
    desc: "Watch the charts, spot the leaks, adjust next month's plan.",
  },
];

const Features = () => {
  return (
    <div className="page-shell">
      <section id="features" className="card overflow-hidden">
        <div className="card-head flex-col items-start gap-1 md:flex-row md:items-center">
          <div>
            <h2 className="card-title">Everything you need</h2>
            <div className="num mt-1 text-[10.5px] text-text3">
              Built for full visibility and control over your finances
            </div>
          </div>
          <div className="eyebrow hidden md:block">06 capabilities</div>
        </div>

        <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="bg-surface px-5 py-5 md:px-6 md:py-6"
            >
              <div className="num text-[10px] text-text3">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="display mt-[10px] text-[17px] md:text-[18px]">
                {feature.title}
              </h3>
              <p className="mt-[6px] max-w-[52ch] text-[13px] leading-[1.6] text-text2">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="mt-4 md:mt-5">
        <div className="card overflow-hidden">
          <div className="card-head">
            <h2 className="card-title">How Spend-Wise works</h2>
            <div className="eyebrow hidden sm:block">Three steps</div>
          </div>

          <div className="grid gap-px bg-line md:grid-cols-3">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="bg-surface px-5 py-5 md:px-6 md:py-6"
              >
                <span className="badge badge-accent">Step {i + 1}</span>
                <h3 className="display mt-3 text-[17px] md:text-[18px]">
                  {step.title}
                </h3>
                <p className="mt-[6px] text-[13px] leading-[1.6] text-text2">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
