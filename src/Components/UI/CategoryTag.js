import React from "react";

/** "🛒 Groceries" for places that can only hold plain text (native <option>). */
export const categoryOptionLabel = (category) =>
  [category?.category_icon, category?.category_name].filter(Boolean).join("  ");

/**
 * Category pill: the icon sits in its own rounded well, with breathing room
 * before the label. Used anywhere a category is displayed as rich markup.
 */
const CategoryTag = ({ icon, name, className = "" }) => (
  <span className={`chip category-tag ${className}`}>
    {icon ? (
      <span className="category-icon" aria-hidden="true">
        {icon}
      </span>
    ) : null}
    <span className="truncate">{name}</span>
  </span>
);

export default CategoryTag;
