import React, { useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import API from "@/app/Libs/Axios/Axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const AddExpense = ({ categoriesData, setShowAddExpense }) => {
  let userEmail = useSelector((state) => state.loginStatus.emailAddress);
  let uuid = useSelector((state) => state.loginStatus.uuid);
  let token = useSelector((state) => state.loginStatus.token);
  const formData = {
    emailAddress: userEmail,
    UUID: uuid,
    expense_name: "",
    expense_description: "",
    expense_amount: "",
    expense_date: "",
    flow_type: "",
    category_name: "",
  };
  const [formState, setFormState] = useState(formData);

  let handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const SaveRecord = () => {
  if (
    !formState.expense_name ||
    !formState.expense_amount ||
    !formState.expense_date ||
    !formState.flow_type ||
    !formState.category_name
  ) {
    toast.error("Please Fill in all Required Fields.");
    return;
  }

  toast.promise(
    API.post("/expenses/save-expense", formState, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }),
    {
      loading: "Saving Expense...",
      success: (response) => {
        setShowAddExpense(false);
        return "Expense Saved Successfully!";
      },
      error: (error) => {
        console.error(error);
        return "Failed to Save Expense";
      },
    }
  );
};

  return (
    <div className="w-full relative animate-fadeIn">
      <form className="bg-white text-black p-6 gap-x-5 flex flex-col md:flex-row justify-between rounded-lg w-full relative border-2 border-black">
        <MdDelete
          className="absolute top-0 right-0 bg-black p-1 rounded-bl-md w-8 h-8 text-white cursor-pointer"
          onClick={() => setShowAddExpense(false)}
        />
        <div className="mb-4 w-full">
          <label
            className="block text-xs md:text-sm font-medium mb-1"
            htmlFor="expense-name"
          >
            Expense Name
          </label>
          <input
            type="text"
            id="expense-name"
            name="expense_name"
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md text-xs md:text-sm outline-none"
            placeholder="Enter expense name"
          />
        </div>

        <div className="mb-4 w-full">
          <label
            className="block text-xs md:text-sm font-medium mb-1"
            htmlFor="description"
          >
            Expense Description
          </label>
          <input
            type="text"
            id="description"
            name="expense_description"
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md text-xs  outline-none"
            placeholder="Enter description"
          />
        </div>

        <div className="mb-4 w-full">
          <label
            className="block text-xs md:text-sm font-medium mb-1"
            htmlFor="amount"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="expense_amount"
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md text-xs  outline-none"
            placeholder="Enter amount"
          />
        </div>

        <div className="mb-4 w-full">
          <label
            className="block text-xs md:text-sm font-medium mb-1"
            htmlFor="date"
          >
            Select Expense Date
          </label>
          <input
            type="date"
            id="date"
            name="expense_date"
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md text-xs outline-none"
          />
        </div>

        <div className="mb-4 w-full">
          <label
            className="block text-xs md:text-sm font-medium mb-1"
            htmlFor="type"
          >
            Money Flow
          </label>
          <select
            id="type"
            name="flow_type"
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md text-xs md:text-sm text-gray-500"
          >
            <option value="">Select money flow</option>
            <option value="Incoming">Incoming 🔽</option>
            <option value="Outgoing">Outgoing 🔼</option>
          </select>
        </div>

        <div className="mb-4 w-full">
          <label
            className="block text-xs md:text-sm font-medium mb-1"
            htmlFor="category"
          >
            Category
          </label>
          <select
            id="category"
            name="category_name"
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md text-xs md:text-sm text-gray-500"
          >
            <option value="">Select category</option>
            {categoriesData.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_icon}
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
      </form>

      <button
        className="bg-green-700 text-white rounded-lg flex justify-center h-fit gap-2 p-2 px-3 md:text-base items-center text-xs border-2 w-full overflow-hidden my-6 cursor-pointer font-bold"
        onClick={SaveRecord}
      >
        Save Record
        <IoAddCircle className="w-4 h-4 md:w-6 md:h-6 inline ml-2" />
      </button>
    </div>
  );
};

export default AddExpense;
