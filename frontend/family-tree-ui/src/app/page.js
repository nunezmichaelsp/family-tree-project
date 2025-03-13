"use client";

import React, { useState } from "react"; // Añadido useState
import Dropdown from "@/components/Dropdown/Dropdown";
import { DropdownWidthSlider } from "@/components/DropdownWidthSlider/DropdownWidthSlider";
import { useFamilyTree } from "@/hooks/useFamilyTree";

export default function Home() {
  // Custom hook to manage family tree logic:
  const { options, selectedTree, error, handleTreeSelection } = useFamilyTree();
  const [dropdownWidth, setDropdownWidth] = useState("w-64"); // Dropdown width state

  return (
    <div className="min-h-screen flex flex-col justify-start items-center pt-10 bg-gray-100 relative">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Series Character Tree
      </h1>

      {/* Tree Selection Images */}
      <div className="flex justify-center gap-12 mb-10">
        {/* Friends Image */}
        <div
          className={`cursor-pointer transition-transform transform hover:scale-105 ${
            selectedTree === "11111111-1111-1111-1111-111111111111"
              ? "shadow-xl shadow-blue-500/50"
              : "shadow-md"
          }`}
          style={{
            width: "200px",
            height: "200px",
            backgroundImage:
              "url('https://media.diarioversionfinal.com/wp-content/uploads/2016/01/Big-Bang-Friends-VERSION-FINAL.jpg')",
            backgroundPosition: "left center",
            backgroundSize: "cover",
            borderRadius: "12px",
          }}
          onClick={() =>
            handleTreeSelection("11111111-1111-1111-1111-111111111111")
          }
        ></div>

        {/* The Big Bang Theory Image */}
        <div
          className={`cursor-pointer transition-transform transform hover:scale-105 ${
            selectedTree === "22222222-2222-2222-2222-222222222222"
              ? "shadow-xl shadow-blue-500/50"
              : "shadow-md"
          }`}
          style={{
            width: "200px",
            height: "200px",
            backgroundImage:
              "url('https://media.diarioversionfinal.com/wp-content/uploads/2016/01/Big-Bang-Friends-VERSION-FINAL.jpg')",
            backgroundPosition: "right center",
            backgroundSize: "cover",
            borderRadius: "12px",
          }}
          onClick={() =>
            handleTreeSelection("22222222-2222-2222-2222-222222222222")
          }
        ></div>
      </div>

      {/* Error Handling */}
      {error && (
        <p className="text-red-600 text-center">
          <strong>Error:</strong> {error}
        </p>
      )}

      {/* Dropdown */}
      {options.length > 0 ? (
        <div className="w-auto">
          <Dropdown
            options={options}
            onChange={(value) => console.log(value)} // Log the selected value
            placeholder="Select a Person"
            widthClass={`${dropdownWidth} min-w-[200px]`} // Added min-width for w-auto
          />
        </div>
      ) : selectedTree ? (
        <div className="flex items-center justify-center p-4">
          <div className="w-5 h-5 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-6">
          Select a series to view its characters.
        </p>
      )}

      {/* Width Slider */}
      <div className="fixed bottom-4 right-32 z-50">
        <DropdownWidthSlider
          dropdownWidth={dropdownWidth}
          setDropdownWidth={setDropdownWidth}
        />
      </div>
    </div>
  );
}
