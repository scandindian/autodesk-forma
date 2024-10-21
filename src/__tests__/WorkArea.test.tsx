import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import WorkArea from "../components/WorkArea"; // Adjust the import path
import { IPolygonData, IFileData } from "../types";

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
  calculateCenter: () => ({ lat: 0, lng: 0 }),
}));

describe("WorkArea Component", () => {
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

  it("renders the map and polygon", () => {
    const setPolygonData = vi.fn();
    const setFileData = vi.fn();
    const setSelectedSolution = vi.fn();

    render(
      <WorkArea
        fileData={mockFileData}
        setFileData={setFileData}
        selectedSolution={mockFileData[0]}
        setSelectedSolution={setSelectedSolution}
        polygonData={mockPolygonData}
        setPolygonData={setPolygonData}
      />
    );

    // Check that the map container and tile layer are rendered
    expect(screen.getByTestId("map")).toBeInTheDocument();
    expect(screen.getByTestId("tile-layer")).toBeInTheDocument();

    // Check that the polygon is rendered
    expect(screen.getByTestId("polygon")).toBeInTheDocument();
  });

  it("toggles polygon selection on click", () => {
    const setPolygonData = vi.fn();
    const setFileData = vi.fn();
    const setSelectedSolution = vi.fn();

    render(
      <WorkArea
        fileData={mockFileData}
        setFileData={setFileData}
        selectedSolution={mockFileData[0]}
        setSelectedSolution={setSelectedSolution}
        polygonData={mockPolygonData}
        setPolygonData={setPolygonData}
      />
    );

    // Simulate clicking the polygon
    const polygon = screen.getByTestId("polygon");
    fireEvent.click(polygon);

    // Ensure the click handler is triggered
    expect(setPolygonData).toHaveBeenCalled();
  });
});
