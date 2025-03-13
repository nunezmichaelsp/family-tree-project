import { useState, useRef, useEffect, useCallback } from "react";

export const useDropdown = ({
  options = [],
  defaultValue = null,
  onChange = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [filteredOptions, setFilteredOptions] = useState(options);

  const dropdownRef = useRef();
  const searchInputRef = useRef();
  const dropdownHeaderRef = useRef();
  const highlightedRef = useRef();

  // Toggle dropdown open/close
  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) {
        // Open dropdown: focus search and highlight current selection
        setTimeout(() => searchInputRef.current?.focus(), 0);

        const selectedIndex = options.findIndex(
          (opt) => opt.value === selectedOption?.value
        );
        setHighlightedIndex(selectedIndex !== -1 ? selectedIndex : 0);
      } else {
        // Close dropdown: reset search and highlighted index
        resetSearch();
      }
      return !prev;
    });
  }, [options, selectedOption]);

  // Reset search and highlighted index
  const resetSearch = () => {
    setSearchTerm("");
    setHighlightedIndex(-1);
  };

  // Return focus to header
  const returnFocusToHeader = () => {
    setTimeout(() => dropdownHeaderRef.current?.focus(), 0);
  };

  // Handle selection of an option
  const handleSelect = useCallback(
    (option) => {
      setSelectedOption(option);
      onChange(option?.value);
      setIsOpen(false);
      resetSearch();
      returnFocusToHeader();
    },
    [onChange]
  );

  // Handle input in the search field
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setHighlightedIndex(0); // Reset to first option
  };

  // Filter options based on the search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredOptions(options);
    } else {
      setFilteredOptions(
        options.filter((opt) =>
          opt.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [options, searchTerm]);

  // Adjust highlighted index
  const adjustHighlightedIndex = (direction) => {
    setHighlightedIndex((prevIndex) => {
      const newIndex =
        direction === "down"
          ? (prevIndex + 1) % filteredOptions.length
          : (prevIndex - 1 + filteredOptions.length) % filteredOptions.length;

      return newIndex;
    });
  };

  // Handle keyboard interactions
  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === "Enter") toggleDropdown();
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        adjustHighlightedIndex("down");
        break;
      case "ArrowUp":
        e.preventDefault();
        adjustHighlightedIndex("up");
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        resetSearch();
        returnFocusToHeader();
        break;
      default:
        break;
    }
  };

  // Close dropdown on outside clicks
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        resetSearch();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Scroll to active (highlighted) option
  useEffect(() => {
    if (highlightedRef.current) {
      highlightedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [highlightedIndex]);

  return {
    isOpen,
    selectedOption,
    searchTerm,
    highlightedIndex,
    toggleDropdown,
    handleSelect,
    handleSearch,
    handleKeyDown,
    filteredOptions,
    refs: { dropdownRef, searchInputRef, highlightedRef, dropdownHeaderRef },
  };
};
