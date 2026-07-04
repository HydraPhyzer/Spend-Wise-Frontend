import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col items-center bg-black rounded-md text-white md:m-6 m-2 md:py-16 md:px-6 md:gap-y-20 text-xs md:text-base py-10 gap-y-10">
      <span className="border-2 rounded-full border-gray p-1 px-4 bg-blue">
        Funds Management Website 💰
      </span>
      <section className="my-auto text-center w-full md:w-2/3 lg:w-1/2 px-6">
        <h1 className="md:text-4xl text-lg font-bold md:leading-20">
          Take control of your money with clarity
        </h1>
        <p className="mt-4 md:text-lg md:leading-8 leading-6">
          Spend-Wise is a modern personal funds management web application built
          with latest technologies that helps users track their income,
          expenses, transfers, and spending habits with clean analytics and a
          minimal, intuitive UI.
        </p>
      </section>
    </div>
  );
};

export default Hero;
