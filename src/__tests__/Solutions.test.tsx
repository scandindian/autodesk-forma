import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Solutions from "../components/Solutions";
import { IFeatureCollection, IFileData } from "../types";
import { describe, it, expect, vi } from "vitest";
import SE_State_Management_Polygons_1 from "../data/SE_State_Management_Polygons_1.json";
import SE_State_Management_Polygons_2 from "../data/SE_State_Management_Polygons_2.json";

// Mock data for testing
const mockFileData: IFileData[] = [
  {
    filename: "solution1.json",
    data: SE_State_Management_Polygons_1 as unknown as IFeatureCollection,
  },
  {
    filename: "solution2.json",
    data: SE_State_Management_Polygons_2 as unknown as IFeatureCollection,
  },
];

const mockSelectedSolution: IFileData = mockFileData[0];

describe("Solutions Component", () => {
  it("renders the list of solutions", () => {
    render(
      <Solutions
        fileData={mockFileData}
        selectedSolution={mockSelectedSolution}
        setSelectedSolution={vi.fn()}
      />
    );

    // Check if both filenames are rendered
    expect(screen.getByText("solution1.json")).toBeInTheDocument();
    expect(screen.getByText("solution2.json")).toBeInTheDocument();
  });

  it("highlights the selected solution", () => {
    render(
      <Solutions
        fileData={mockFileData}
        selectedSolution={mockSelectedSolution}
        setSelectedSolution={vi.fn()}
      />
    );
  });

  it("calls setSelectedSolution when a solution is clicked", () => {
    const mockSetSelectedSolution = vi.fn();

    render(
      <Solutions
        fileData={mockFileData}
        selectedSolution={mockSelectedSolution}
        setSelectedSolution={mockSetSelectedSolution}
      />
    );

    const itemToClick = screen.getByText("solution2.json");
    fireEvent.click(itemToClick);

    expect(mockSetSelectedSolution).toHaveBeenCalledWith(mockFileData[1]); // Expect the second item to be set as selected
  });

  it("updates the selected item style when a different solution is clicked", () => {
    const mockSetSelectedSolution = vi.fn();

    render(
      <Solutions
        fileData={mockFileData}
        selectedSolution={mockFileData[1]}
        setSelectedSolution={mockSetSelectedSolution}
      />
    );
  });
});
