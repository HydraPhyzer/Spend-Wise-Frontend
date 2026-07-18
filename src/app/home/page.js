import Navbar from '@/Components/Home/Navbar'
import Hero from '@/Components/Home/Hero'
import Features from '@/Components/Home/Features'
import Footer from '@/Components/Home/Footer'
import React from 'react'

export const metadata = {
  title: "Spend-Wise - Smart Personal Funds Management",

  description:
    "Manage your income, expenses, transfers, and spending categories in one beautiful dashboard. Analyze weekly, monthly, and yearly financial performance using Spend-Wise.",
};

const page = () => {
  return (
    <div className='flex flex-col min-h-screen gap-y-6'>
        <Navbar/>
        <Hero/>
        <Features/>
        <Footer/>
    </div>
  )
}

export default page