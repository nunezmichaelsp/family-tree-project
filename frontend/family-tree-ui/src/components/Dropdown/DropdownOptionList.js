import { DropdownOption } from "./DropdownOption";

export const DropdownOptionList = ({
  options,
  highlightedIndex,
  selectedOption,
  handleSelect,
  highlightedRef,
}) => {
  return (
    <ul
      id="dropdown-options"
      className="max-h-56 overflow-y-auto"
      role="listbox"
      aria-live="polite"
    >
      {options.length > 0 ? (
        options.map((option, index) => (
          <DropdownOption
            key={option.value}
            option={option}
            isHighlighted={index === highlightedIndex}
            isSelected={selectedOption?.value === option.value}
            onClick={() => handleSelect(option)}
            highlightedRef={index === highlightedIndex ? highlightedRef : null}
          />
        ))
      ) : (
        <li
          className="p-2 text-gray-500"
          role="option"
          aria-disabled="true"
          tabIndex={-1}
        >
          No results found.
        </li>
      )}
    </ul>
  );
};
