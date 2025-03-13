import { useDropdown } from "@/hooks/Dropdown/useDropdown";
import DropdownUI from "./DropdownUI";

const Dropdown = ({
  label,
  options,
  onChange,
  defaultValue = null,
  isLoading = false,
  placeholder = "Select a Option",
  widthClass = "w-auto"
}) => {
  const {
    isOpen,
    selectedOption,
    searchTerm,
    highlightedIndex,
    toggleDropdown,
    handleSearch,
    handleKeyDown,
    handleSelect,
    filteredOptions,
    refs,
  } = useDropdown({ options, defaultValue, onChange });

  return (
    <DropdownUI
      label={label}
      isOpen={isOpen}
      selectedOption={selectedOption}
      searchTerm={searchTerm}
      highlightedIndex={highlightedIndex}
      options={filteredOptions}
      handleToggle={toggleDropdown}
      handleSearch={handleSearch}
      handleKeyDown={handleKeyDown}
      handleSelect={handleSelect}
      refs={refs}
      isLoading={isLoading}
      placeholder={placeholder}
      widthClass={widthClass}
    />
  );
};

export default Dropdown;
