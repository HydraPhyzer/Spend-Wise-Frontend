import React, { useState, useEffect } from "react";
import { IoAddCircle, IoClose } from "react-icons/io5";
import API from "@/app/Libs/Axios/Axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { categoryOptionLabel } from "@/Components/UI/CategoryTag";

const AddExpense = ({ categoriesData, setShowAddExpense, onSaved }) => {
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
          // Tell the shell so the ledger, stats, and charts refetch now.
          onSaved?.();
          return "Expense Saved Successfully!";
        },
        error: (error) => {
          return "Failed to Save Expense";
        },
      },
    );
  };

  // Escape closes the dialog; page behind it stays put while it is open.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setShowAddExpense(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [setShowAddExpense]);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-5">
      <div
        className="absolute inset-0"
        style={{ background: "var(--scrim)" }}
        onClick={() => setShowAddExpense(false)}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Add transaction"
        className="animate-rise relative flex max-h-[92vh] w-full max-w-[520px] flex-col overflow-hidden rounded-t-[10px] border border-line sm:rounded-[7px]"
        style={{ background: "var(--raise)", boxShadow: "var(--shadow)" }}
      >
        <div className="card-head shrink-0">
          <div>
            <div className="card-title">Add transaction</div>
            <div className="num mt-[3px] text-[10.5px] text-text3">
              Required fields are marked with an asterisk
            </div>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={() => setShowAddExpense(false)}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-[5px] border border-line text-text2 transition-colors hover:border-line2 hover:text-text"
          >
            <IoClose className="h-4 w-4" />
          </button>
        </div>

        <form
          className="flex-1 overflow-y-auto px-4 py-4 md:px-[18px]"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid gap-3.5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="expense-name">
                Expense name *
              </label>
              <input
                type="text"
                id="expense-name"
                name="expense_name"
                onChange={handleInputChange}
                className="field"
                placeholder="e.g. Groceries at Al-Fatah"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="description">
                Description
              </label>
              <input
                type="text"
                id="description"
                name="expense_description"
                onChange={handleInputChange}
                className="field"
                placeholder="Optional note"
              />
            </div>

            <div>
              <label className="field-label" htmlFor="amount">
                Amount *
              </label>
              <input
                type="number"
                id="amount"
                name="expense_amount"
                onChange={handleInputChange}
                className="field num"
                placeholder="0"
              />
            </div>

            <div>
              <label className="field-label" htmlFor="date">
                Date *
              </label>
              <input
                type="date"
                id="date"
                name="expense_date"
                onChange={handleInputChange}
                className="field num"
              />
            </div>

            <div>
              <label className="field-label" htmlFor="type">
                Money flow *
              </label>
              <select
                id="type"
                name="flow_type"
                onChange={handleInputChange}
                className="field"
              >
                <option value="">Select money flow</option>
                <option value="Incoming">Incoming 🔽</option>
                <option value="Outgoing">Outgoing 🔼</option>
              </select>
            </div>

            <div>
              <label className="field-label" htmlFor="category">
                Category *
              </label>
              <select
                id="category"
                name="category_name"
                onChange={handleInputChange}
                className="field"
              >
                <option value="">Select category</option>
                {categoriesData.map((category) => (
                  <option key={category.category_id} value={category.category_id}>
                    {categoryOptionLabel(category)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>

        <div className="flex shrink-0 items-center justify-end gap-2 border-t border-line px-4 py-3 md:px-[18px]">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowAddExpense(false)}
          >
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={SaveRecord}>
            Save record
            <IoAddCircle className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
