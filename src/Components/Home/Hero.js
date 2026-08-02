import React from "react";
import Link from "next/link";

const Hero = () => {
  const stats = [
    { label: "Money flows", value: "In · Out" },
    { label: "Categories", value: "Custom" },
    { label: "Reports", value: "W / M / Y" },
    { label: "Themes", value: "Light + Dark" },
  ];

  return (
    <section className="page-shell">
      <div className="card animate-rise overflow-hidden">
        <div className="border-b border-line bg-[linear-gradient(180deg,var(--surface2),var(--surface))] px-6 py-10 md:px-11 md:py-12">
          <div className="eyebrow tracking-[0.2em]">
            Funds management · personal
          </div>

          <h1 className="display mt-4 text-[36px] leading-[1.02] sm:text-[48px] md:mt-[18px] md:text-[60px]">
            Take control of your
            <br className="hidden sm:block" /> money with clarity
          </h1>

          <p className="mt-5 max-w-[64ch] text-[14px] leading-[1.65] text-text2 md:mt-[22px] md:text-[15px]">
            Spend-Wise is a modern personal funds management application that
            helps you track income, expenses, transfers, and spending habits
            with clean analytics and a calm, intuitive interface.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3 md:mt-8">
            <Link
              href="/authentication/signup"
              className="btn btn-lg btn-primary hover:text-white"
            >
              Get started — it&apos;s free
            </Link>
            <Link href="/authentication/login" className="btn btn-lg btn-secondary">
              Log in
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px bg-line md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-surface px-5 py-4 md:px-7 md:py-5"
            >
              <div className="eyebrow text-[9.5px]">{stat.label}</div>
              <div className="num mt-[6px] text-[14px] md:text-[17px]">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
