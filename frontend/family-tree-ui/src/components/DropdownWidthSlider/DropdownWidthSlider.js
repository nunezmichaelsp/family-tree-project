/**
 * DropdownWidthSlider Component
 * A slider to configure the width of the dropdown dynamically.
 * @param {string} dropdownWidth - Current dropdown width.
 * @param {function} setDropdownWidth - Function to update the dropdown width.
 */
export function DropdownWidthSlider({ dropdownWidth, setDropdownWidth }) {
    return (
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <label
          htmlFor="widthSlider"
          className="text-sm font-medium text-gray-700 mb-2"
        >
          Dropdown width config
        </label>
        <input
          id="widthSlider"
          type="range"
          min="0"
          max="2" // Three options: 0 (Default), 1 (Auto), 2 (Large)
          step="1"
          value={["w-64", "w-auto", "w-120"].indexOf(dropdownWidth)}
          onChange={(e) =>
            setDropdownWidth(["w-64", "w-auto", "w-120"][e.target.value])
          }
          className="w-48 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between w-48 mt-2 text-sm text-gray-700 font-medium">
          <span>Default</span>
          <span>Auto</span>
          <span>Large</span>
        </div>
      </div>
    );
  }