import { describe, it, expect } from "vitest";
import {
  calculateCenter,
  calculateUnion,
  calculateIntersection,
} from "../utility";
import { IPolygonData } from "../types";

// Mock data for testing
const polygonData1: IPolygonData = {
  positions: [
    [0, 0],
    [4, 0],
    [4, 4],
    [0, 4],
    [0, 0],
  ],
  isSelected: false,
};

const polygonData2: IPolygonData = {
  positions: [
    [2, 2],
    [6, 2],
    [6, 6],
    [2, 6],
    [2, 2],
  ],
  isSelected: false,
};

const emptyPolygonData: IPolygonData[] = [];

describe("Geometry Utilities", () => {
  describe("calculateCenter", () => {
    it("should calculate the centroid of a set of polygons", () => {
      const result = calculateCenter([polygonData1, polygonData2]);
      expect(result).toEqual({ lat: 2.6, lng: 2.6 });
    });

    it("should return NaN for empty polygon data", () => {
      const result = calculateCenter(emptyPolygonData);
      expect(result).toEqual({ lat: NaN, lng: NaN });
    });
  });

  describe("calculateUnion", () => {
    it("should calculate the union of two polygons", () => {
      const result = calculateUnion([polygonData1, polygonData2]);
      expect(result).not.toBeNull();
      expect(result![0].positions.length).toBeGreaterThan(0); // Ensure union polygon has coordinates
    });

    it("should return null if there are no polygons", () => {
      const result = calculateUnion(emptyPolygonData);
      expect(result).toBeNull();
    });
  });

  describe("calculateIntersection", () => {
    it("should calculate the intersection of two polygons", () => {
      const result = calculateIntersection([polygonData1, polygonData2]);
      expect(result).not.toBeNull();
      expect(result![0].positions.length).toBeGreaterThan(0); // Ensure intersection polygon has coordinates
    });

    it("should return null if there is no intersection", () => {
      const result = calculateIntersection([
        polygonData1,
        {
          positions: [
            [10, 10],
            [14, 10],
            [14, 14],
            [10, 14],
            [10, 10],
          ],
          isSelected: false,
        },
      ]);
      expect(result).toBeNull();
    });

    it("should return null if there are no polygons", () => {
      const result = calculateIntersection(emptyPolygonData);
      expect(result).toBeNull();
    });
  });
});
