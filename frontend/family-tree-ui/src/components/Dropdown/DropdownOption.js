import React, { forwardRef } from "react";

export const DropdownOption = forwardRef(
  ({ option, isHighlighted, isSelected, onClick, highlightedRef }, ref) => {
    return (
      <li
        key={option.value}
        id={`option-${option.value}`}
        ref={highlightedRef}
        className={`p-2 cursor-pointer rounded-sm transition-colors relative ${
          isHighlighted && !isSelected
            ? "bg-[#9fc3f870]"
            : isSelected
            ? "bg-[#0d6efd] text-white"
            : "hover:bg-[#9fc3f870]"
        }`}
        onClick={onClick}
        role="option"
        aria-selected={isHighlighted || isSelected}
        tabIndex={-1}
      >
        <span
          className="truncate block w-full"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title={option.label}
        >
          {option.label}
        </span>
      </li>
    );
  }
);

DropdownOption.displayName = "DropdownOption";
