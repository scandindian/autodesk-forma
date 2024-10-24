import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { describe, it, expect, vi } from "vitest";
import WorkArea from "../components/WorkArea";
import geoJsonDataReducer from "../store/slice";
import { IPolygonData, IFileData } from "../types";

// Mock React Leaflet components
interface MapContainerProps {
  children: React.ReactNode;
}

interface PolygonProps {
  eventHandlers: {
    click: () => void;
  };
}

interface TooltipProps {
  children: React.ReactNode;
}

vi.mock("react-leaflet", () => ({
  MapContainer: ({ children }: MapContainerProps) => (
    <div data-testid="map">{children}</div>
  ),
  TileLayer: () => <div data-testid="tile-layer" />,
  Polygon: ({ eventHandlers }: PolygonProps) => (
    <div data-testid="polygon" onClick={eventHandlers.click}>
      Polygon
    </div>
  ),
  Tooltip: ({ children }: TooltipProps) => <div>{children}</div>,
}));

// Mock the utility functions
vi.mock("../utility", () => ({
  importedFileData: {},
  calculateCenter: () => ({ lat: 0, lng: 0 }),
}));

// Helper function to render component with Redux store
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

describe("WorkArea Component with Redux", () => {
  const mockFileData: IFileData[] = [
    {
      filename: "test1.json",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [0, 0],
                  [0, 1],
                  [1, 1],
                  [1, 0],
                  [0, 0],
                ],
              ],
            },
            properties: {},
          },
        ],
      },
    },
  ];

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
  ];

  const initialState = {
    geoJsonData: {
      fileData: mockFileData,
      selectedSolution: mockFileData[0],
      polygonData: mockPolygonData,
    },
  };

  it("renders the map and polygon", () => {
    renderWithRedux(<WorkArea />, initialState);

    // Check that the map container and tile layer are rendered
    expect(screen.getByTestId("map")).toBeInTheDocument();
    expect(screen.getByTestId("tile-layer")).toBeInTheDocument();

    // Check that the polygon is rendered
    expect(screen.getByTestId("polygon")).toBeInTheDocument();
  });

  it("toggles polygon selection on click", () => {
    const store = configureStore({
      reducer: {
        geoJsonData: geoJsonDataReducer,
      },
      preloadedState: initialState,
    });

    render(
      <Provider store={store}>
        <WorkArea />
      </Provider>
    );

    // Simulate clicking the polygon
    const polygon = screen.getByTestId("polygon");
    fireEvent.click(polygon);

    // Dispatches should update the Redux state
    const actions = store.getState().geoJsonData.polygonData;
    expect(actions[0].isSelected).toBe(true); // Assuming the first polygon was selected on click
  });
});
