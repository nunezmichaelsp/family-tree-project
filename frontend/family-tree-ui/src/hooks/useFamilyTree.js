import { useState } from "react";
import axiosInstance from "@/services/axiosInstance";

/**
 * Custom hook to manage family tree logic.
 */
export const useFamilyTree = () => {
  const [options, setOptions] = useState([]); // Dropdown options (People)
  const [selectedTree, setSelectedTree] = useState(""); // Selected family tree ID
  const [error, setError] = useState(null); // Error for fetch failures

  /**
   * Fetch people for a given family tree ID.
   * @param {string} familyTreeId - The ID of the family tree
   */
  const fetchPeople = (familyTreeId) => {
    setError(null); // Reset error state
    setOptions([]); // Clear dropdown options before fetching

    axiosInstance
      .get(`/familytree/${familyTreeId}/people`)
      .then((response) => setOptions(response.data))
      .catch((err) => setError(err.message));
  };

  /**
   * Handle selection of a family tree.
   * @param {string} treeId - The ID of the selected tree
   */
  const handleTreeSelection = (treeId) => {
    setSelectedTree(treeId); // Set the selected tree ID
    fetchPeople(treeId); // Fetch corresponding people
  };

  return {
    options, // Dropdown options
    selectedTree, // Selected tree ID
    error, // Current error state
    handleTreeSelection, // Function to handle tree selection
  };
};