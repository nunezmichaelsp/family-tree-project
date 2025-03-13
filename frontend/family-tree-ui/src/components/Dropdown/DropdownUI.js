import { DropdownOptionList } from "./DropdownOptionList";

const DropdownUI = ({
  label,
  isOpen,
  selectedOption,
  searchTerm,
  highlightedIndex,
  options,
  handleToggle,
  handleSearch,
  handleKeyDown,
  handleSelect,
  refs,
  isLoading,
  placeholder,
  widthClass,
}) => {
  return (
    <div
      className={`dropdown ${widthClass}`}
      ref={refs.dropdownRef}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-labelledby={`dropdown-label-${label}`}
    >
      <label
        id={`dropdown-label-${label}`}
        className="block text-gray-700 font-medium mb-1"
      >
        {label}
      </label>

      {/* Main dropdown */}
      <div
        className="dropdown-header border border-gray-300 shadow-md rounded-lg p-3 flex justify-between items-center bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        onClick={handleToggle}
        tabIndex={0}
        aria-expanded={isOpen}
        aria-controls="dropdown-options"
        onKeyDown={handleKeyDown}
        ref={refs.dropdownHeaderRef}
      >
        <span
          className="truncate block w-full  pr-1"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title={selectedOption ? selectedOption.label : placeholder}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <div
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          {/* SVG Arrow */}
          <svg
            className="w-4 h-4 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          id="dropdown-menu"
          className="dropdown-menu mt-2 border border-gray-300 rounded-lg bg-white shadow-lg overflow-hidden transition-all duration-300"
        >
          <div className="bg-gray-100 p-2">
            <input
              id="dropdown-search"
              ref={refs.searchInputRef}
              type="text"
              placeholder={isLoading ? "Loading..." : "Search..."}
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              aria-label="Search options"
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              aria-activedescendant={
                highlightedIndex > -1 && options[highlightedIndex]?.value
                  ? `option-${options[highlightedIndex].value}`
                  : undefined
              }
            />
          </div>

          <DropdownOptionList
            options={options}
            highlightedIndex={highlightedIndex}
            selectedOption={selectedOption}
            handleSelect={handleSelect}
            highlightedRef={refs.highlightedRef}
          />
        </div>
      )}
    </div>
  );
};

export default DropdownUI;
