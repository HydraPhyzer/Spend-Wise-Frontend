import React from "react";

const Features = () => {
  return (
    <div className="text-center">
      <section
        id="features"
        className="bg-black md:m-6 m-2 md:py-16 md:px-6 md:gap-y-20 text-xs md:text-base py-10 gap-y-10 rounded-md"
      >
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="md:text-4xl text-lg font-bold md:leading-20 text-white">
            Everything you need
          </h1>
          <p className="mt-4 md:text-lg md:leading-8 leading-6 text-white">
            Built to give you full visibility and control over your finances.
          </p>

          <div className="mt-12 grid md:gap-8 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Track Income & Expenses",
                desc: "Log inflows and outflows with categories, dates, and notes.",
                style: "bg-purple",
              },
              {
                title: "Smart Categories",
                desc: "Organize spending across food, shopping, bills, and more.",
                style: "bg-red",
              },
              {
                title: "People & Transfers",
                desc: "Track who you send money to and how often.",
                style: "bg-yellow",
              },
              {
                title: "Visual Analytics",
                desc: "Understand your money with charts and breakdowns.",
                style: "bg-orange",
              },
              {
                title: "Time-Based Insights",
                desc: "Analyze weekly, monthly, and yearly spending.",
                style: "bg-blue",
              },
              {
                title: "Secure & Private",
                desc: "Your data stays protected with secure authentication.",
                style: "bg-dark",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className={`rounded-md p-6 ${feature.style || ""}`}
              >
                <h3 className="text-sm md:text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-xs md:text-sm text-white">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="md:py-20 py-10">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-xl md:text-3xl font-semibold">
            How Spend-Wise works
          </h2>
          <div className="mt-10 grid md:gap-8 gap-4 md:grid-cols-3">
            {[
              "Create an account",
              "Add your transactions",
              "Analyze & improve",
            ].map((step, i) => (
              <div key={step} className="rounded-md border border-gray-200 p-6">
                <span className="text-sm font-semibold text-red">
                  Step {i + 1}
                </span>
                <h3 className="mt-2 text-xs md:text-lg font-medium">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
