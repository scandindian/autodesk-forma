import * as turf from "@turf/turf";
import * as geojson from "geojson";
import { IFeatureCollection, IFileData, IPolygonData } from "../types";
import SE_State_Management_Polygons_1 from "../data/SE_State_Management_Polygons_1.json";
import SE_State_Management_Polygons_2 from "../data/SE_State_Management_Polygons_2.json";

export const importedFileData: IFileData[] = [
  {
    filename: "SE_State_Management_Polygons_1.json",
    data: SE_State_Management_Polygons_1 as unknown as IFeatureCollection,
  },
  {
    filename: "SE_State_Management_Polygons_2.json",
    data: SE_State_Management_Polygons_2 as unknown as IFeatureCollection,
  },
];

// Function to calculate the centroid of a set of polygons
export const calculateCenter = (polygonData: IPolygonData[]) => {
  let totalLat = 0;
  let totalLng = 0;
  let numPoints = 0;

  polygonData.forEach((polygon) => {
    polygon.positions.forEach((coord) => {
      totalLat += coord[0];
      totalLng += coord[1];
      numPoints++;
    });
  });

  return {
    lat: totalLat / numPoints,
    lng: totalLng / numPoints,
  };
};

// Function to calculate the union of a set of polygons
export const calculateUnion = (polygonData: IPolygonData[]) => {
  if (polygonData.length === 0) {
    return null;
  }

  const geoPolygons = polygonData.map((polygon) => {
    return turf.polygon([polygon.positions]);
  });

  let unionPolygon: geojson.Feature<
    geojson.Polygon,
    geojson.GeoJsonProperties
  > = geoPolygons[0];
  for (let i = 1; i < geoPolygons.length; i++) {
    unionPolygon = turf.union(
      turf.featureCollection([unionPolygon, geoPolygons[i]])
    ) as geojson.Feature<geojson.Polygon, geojson.GeoJsonProperties>;

    if (unionPolygon === null) {
      return null;
    }
  }

  // Update the polygonData with the new union polygons
  if (unionPolygon.geometry.type === "Polygon") {
    const unionPolygonData: IPolygonData[] = [
      {
        positions: unionPolygon.geometry.coordinates[0].map(([lng, lat]) => [
          lng,
          lat,
        ]),
        isSelected: false,
      },
    ];

    return unionPolygonData;
  }

  if (unionPolygon.geometry.type === "MultiPolygon") {
    const unionPolygonData: IPolygonData[] =
      unionPolygon.geometry.coordinates.map((polygonItem) => {
        return {
          positions: polygonItem[0] as unknown as [number, number][],
          isSelected: false,
        };
      });
    return unionPolygonData;
  }

  return null;
};

// Function to calculate the intersection of a set of polygons
export const calculateIntersection = (polygonData: IPolygonData[]) => {
  if (polygonData.length === 0) {
    return null;
  }

  const geoPolygons = polygonData.map((polygon) => {
    return turf.polygon([polygon.positions]);
  });

  let intersectionPolygon: geojson.Feature<
    geojson.Polygon,
    geojson.GeoJsonProperties
  > = geoPolygons[0];

  for (let i = 1; i < geoPolygons.length; i++) {
    intersectionPolygon = turf.intersect(
      turf.featureCollection([intersectionPolygon, geoPolygons[i]])
    ) as geojson.Feature<geojson.Polygon, geojson.GeoJsonProperties>;

    if (intersectionPolygon === null) {
      return null;
    }
  }

  // Update the polygonData with the new intersection polygons
  if (intersectionPolygon.geometry.type === "Polygon") {
    const intersectionPolygonData: IPolygonData[] = [
      {
        positions: intersectionPolygon.geometry.coordinates[0].map(
          ([lng, lat]) => [lng, lat]
        ),
        isSelected: false,
      },
    ];

    return intersectionPolygonData;
  }

  if (intersectionPolygon.geometry.type === "MultiPolygon") {
    const intersectionPolygonData: IPolygonData[] =
      intersectionPolygon.geometry.coordinates.map((polygonItem) => {
        return {
          positions: polygonItem[0] as unknown as [number, number][],
          isSelected: false,
        };
      });
    return intersectionPolygonData;
  }

  return null;
};

// Function to calculate the area of a polygon
export const calculatePolygonArea = (positions: [number, number][]) => {
  const polygonItem = turf.polygon([positions]);
  return turf.area(polygonItem);
};
