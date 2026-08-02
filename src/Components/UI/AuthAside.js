import React from "react";

const principles = [
  {
    title: "Numbers are the interface",
    desc: "Monospaced figures and aligned decimals — nothing decorative between you and your balance.",
  },
  {
    title: "One accent, earned",
    desc: "Colour marks action and state only, so a warning actually reads as a warning.",
  },
  {
    title: "Forecast, don't scold",
    desc: "The app tells you what happens next, never how you failed last month.",
  },
];

/**
 * Editorial panel shown beside the login / signup forms on large screens.
 */
const AuthAside = () => {
  return (
    <aside className="hidden w-1/2 shrink-0 border-l border-line bg-surface2 lg:flex lg:flex-col lg:justify-center">
      <div className="px-14 py-16 xl:px-20">
        <div className="eyebrow tracking-[0.2em]">Spend-Wise · v3</div>

        <h2 className="display mt-5 text-[42px] leading-[1.05] xl:text-[52px]">
          Every account,
          <br />
          every category,
          <br />
          one calm ledger.
        </h2>

        <p className="mt-6 max-w-[56ch] text-[14px] leading-[1.65] text-text2">
          Track income, expenses, and transfers. Read them back as clean
          analytics across the week, the month, and the year.
        </p>

        <div className="mt-10 flex flex-col gap-5 border-t border-line pt-8">
          {principles.map((item) => (
            <div key={item.title}>
              <div className="display text-[18px]">{item.title}</div>
              <div className="mt-1.5 max-w-[52ch] text-[13px] leading-[1.6] text-text2">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default AuthAside;
