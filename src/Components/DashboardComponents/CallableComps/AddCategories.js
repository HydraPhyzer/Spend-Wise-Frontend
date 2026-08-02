import React from "react";
import CategoryTag from "@/Components/UI/CategoryTag";

const AddCategories = ({ categoriesData = [] }) => {
  return (
    <div className="card animate-fadeIn overflow-hidden">
      <div className="card-head">
        <div className="card-title">Categories</div>
        <div className="num text-[10.5px] text-text3">
          {categoriesData.length} active
        </div>
      </div>

      {categoriesData.length > 0 ? (
        <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {categoriesData.map((category, i) => (
            <div
              key={category.category_id}
              className="flex min-w-0 items-center gap-3 bg-surface px-4 py-3.5"
            >
              <span className="num w-4 shrink-0 text-[10px] text-text3">
                {String(i + 1).padStart(2, "0")}
              </span>
              <CategoryTag
                icon={category.category_icon}
                name={category.category_name}
                className="min-w-0"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="num px-4 py-10 text-center text-[11px] text-text3">
          No categories yet
        </p>
      )}
    </div>
  );
};

export default AddCategories;
