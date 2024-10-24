import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import Solutions from "../components/Solutions";
import geoJsonDataReducer from "../store/slice";
import { IFeatureCollection, IFileData, IPolygonData } from "../types";
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

// Helper function to render the component with Redux
const renderWithRedux = (
  component: React.ReactNode,
  initialState: {
    geoJsonData: {
      fileData: IFileData[];
      selectedSolution: IFileData;
      polygonData: IPolygonData[];
    };
  }
) => {
  const store = configureStore({
    reducer: {
      geoJsonData: geoJsonDataReducer,
    },
    preloadedState: initialState,
  });

  return render(<Provider store={store}>{component}</Provider>);
};

describe("Solutions Component with Redux", () => {
  const initialState = {
    geoJsonData: {
      fileData: mockFileData,
      selectedSolution: mockFileData[0], // The first file is selected initially
      polygonData: [],
    },
  };

  it("renders the list of solutions", () => {
    renderWithRedux(<Solutions />, initialState);

    // Check if both filenames are rendered
    expect(screen.getByText("solution1.json")).toBeInTheDocument();
    expect(screen.getByText("solution2.json")).toBeInTheDocument();
  });

  it("dispatches setSelectedSolution when a solution is clicked", () => {
    const store = configureStore({
      reducer: {
        geoJsonData: geoJsonDataReducer,
      },
      preloadedState: initialState,
    });

    render(
      <Provider store={store}>
        <Solutions />
      </Provider>
    );

    const itemToClick = screen.getByText("solution2.json");
    fireEvent.click(itemToClick);

    // Check if the setSelectedSolution action is dispatched
    const actions = store.getState().geoJsonData;
    expect(actions.selectedSolution).toEqual(mockFileData[1]); // Expect the second item to be selected
  });
});
