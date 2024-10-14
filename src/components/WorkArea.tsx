import { FC, useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import { IFileData } from "../types";
import "leaflet/dist/leaflet.css";
import Button from "./Button";
import * as turf from "@turf/turf";
import * as geojson from "geojson";

const Layout = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  font-size: 1em;
  padding: 24px;
`;

const LayoutTitle = styled.h2`
  font-size: 18px;
`;

const MapWrapper = styled.div`
  height: 500px;
  width: 100%;
`;

const OperationContainer = styled.div`
  display: flex;
  justify-content: center; /* Centers the buttons horizontally */
  margin-top: 10px;
`;

interface IPolygonData {
  positions: [number, number][];
  isSelected: boolean;
}

interface IWorkAreaProps {
  fileData: IFileData;
}

const WorkArea: FC<IWorkAreaProps> = ({ fileData }) => {
  const [polygonData, setPolygonData] = useState<IPolygonData[]>([]);
  const [isOperationPossible, setIsOperationPossible] =
    useState<boolean>(false);

  // Function to calculate the centroid of a set of polygons
  const calculateCenter = (polygonData: IPolygonData[]) => {
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

  // Memoized center to avoid recalculating on each render
  const center = useMemo(() => calculateCenter(polygonData), [polygonData]);

  // Load the polygon positions and initialize selection state from fileData
  useEffect(() => {
    const initialPolygonData = fileData.data.features.map((feature) => ({
      positions: feature.geometry.coordinates[0].map(
        (coord) => [coord[1], coord[0]] as [number, number]
      ),
      isSelected: false, // Initially, none of the polygons are selected
    }));

    setPolygonData(initialPolygonData);
  }, [fileData]);

  // Function to handle polygon click and toggle its selection
  const handlePolygonClick = (index: number) => {
    setPolygonData((prevPolygonData) =>
      prevPolygonData.map((polygon, idx) => {
        if (idx === index) {
          return { ...polygon, isSelected: !polygon.isSelected };
        }
        return polygon;
      })
    );
  };

  useEffect(() => {
    let selectedCount = 0;

    polygonData.forEach((polygonItem: IPolygonData) => {
      if (polygonItem.isSelected) {
        selectedCount++;
      }
    });

    // Enable operation if at least 2 polygons are selected
    setIsOperationPossible(selectedCount >= 2);
  }, [polygonData]);

  // Function to determine polygon styles
  const getPolygonStyle = (isSelected: boolean) => {
    return {
      color: isSelected ? "#DD2C00" : "#304FFE",
      weight: isSelected ? 5 : 2,
      fillOpacity: isSelected ? 0.6 : 0.3,
    };
  };

  const handlePolygonUnion = () => {
    const selectedPolygons = polygonData.filter(
      (polygon) => polygon.isSelected
    );

    const geoPolygons = selectedPolygons.map((polygon) => {
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
    }

    // Update the polygonData with the new union polygon
    const unionPolygonData: IPolygonData = {
      positions: unionPolygon.geometry.coordinates[0].map(([lng, lat]) => [
        lng,
        lat,
      ]),
      isSelected: false,
    };

    setPolygonData((prevPolygonData) => [
      ...prevPolygonData.filter((polygon) => !polygon.isSelected),
      unionPolygonData,
    ]);
  };

  const handlePolygonIntersection = () => {};

  return (
    <Layout>
      <LayoutTitle>Work Area</LayoutTitle>
      <MapWrapper>
        {polygonData.length > 0 && (
          <MapContainer
            center={[center.lat, center.lng]}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {polygonData.map((polygon, index) => (
              <Polygon
                key={index}
                positions={polygon.positions}
                pathOptions={getPolygonStyle(polygon.isSelected)}
                eventHandlers={{
                  click: () => handlePolygonClick(index),
                }}
              />
            ))}
          </MapContainer>
        )}
      </MapWrapper>

      <OperationContainer>
        <Button
          label="Union"
          disabled={!isOperationPossible}
          onClick={handlePolygonUnion}
        />
        <Button
          label="Intersect"
          disabled={!isOperationPossible}
          onClick={handlePolygonIntersection}
        />
      </OperationContainer>
    </Layout>
  );
};

export default WorkArea;
