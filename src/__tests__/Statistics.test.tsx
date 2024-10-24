import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Statistics from "../components/Statistics";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import geoJsonDataReducer from "../store/slice"; 
import { IPolygonData } from "../types";

// Helper function to render with Redux store
const renderWithRedux = (component: React.ReactNode, initialState: { geoJsonData: { fileData: never[]; selectedSolution: null; polygonData: IPolygonData[]; }; }) => {
  const store = configureStore({
    reducer: {
      geoJsonData: geoJsonDataReducer,
    },
    preloadedState: initialState,
  });

  return render(<Provider store={store}>{component}</Provider>);
};

describe("Statistics Component with Redux", () => {
  const mockPolygonData: IPolygonData[] = [
    {
      positions: [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0],
        [0, 0],
      ],
      isSelected: false,
    },
    {
      positions: [
        [1, 1],
        [1, 2],
        [2, 2],
        [2, 1],
        [1, 1],
      ],
      isSelected: true,
    },
  ];

  const initialState = {
    geoJsonData: {
      fileData: [],
      selectedSolution: null,
      polygonData: mockPolygonData,
    },
  };

  it("renders correctly with polygon data from Redux", () => {
    renderWithRedux(<Statistics />, initialState);

    // Check if the Statistics title is present
    expect(screen.getByText("Statistics")).toBeInTheDocument();

    // Check if the area of each polygon is displayed correctly
    expect(screen.getByText("Polygon 1 Area:")).toBeInTheDocument();
    expect(screen.getByText("Polygon 2 Area:")).toBeInTheDocument();
  });

  it("calculates total selected area correctly", () => {
    renderWithRedux(<Statistics />, initialState);

    expect(screen.getByText("Total Selected Area:")).toBeInTheDocument();
  });
});
