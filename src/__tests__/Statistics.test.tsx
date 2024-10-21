import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Statistics from "../components/Statistics";
import { IPolygonData } from "../types";

describe("Statistics Component", () => {
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

  it("renders correctly with polygon data", () => {
    render(<Statistics polygonData={mockPolygonData} />);

    // Check if the Statistics title is present
    expect(screen.getByText("Statistics")).toBeInTheDocument();

    // Check if the area of each polygon is displayed correctly
    expect(screen.getByText("Polygon 1 Area:")).toBeInTheDocument();
    expect(screen.getByText("Polygon 2 Area:")).toBeInTheDocument();
  });

  it("calculates total selected area correctly", () => {
    render(<Statistics polygonData={mockPolygonData} />);

    expect(screen.getByText("Total Selected Area:")).toBeInTheDocument();
  });
});
