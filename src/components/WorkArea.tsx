import {
  FC,
  useMemo,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import styled from "styled-components";
import { MapContainer, TileLayer, Polygon, Tooltip } from "react-leaflet";
import { IFeature, IFileData, IPolygonData } from "../types";
import "leaflet/dist/leaflet.css";
import Button from "./Button";
import {
  calculateCenter,
  calculateIntersection,
  calculateUnion,
} from "../utility";

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

interface IWorkAreaProps {
  fileData: IFileData[];
  setFileData: Dispatch<SetStateAction<IFileData[]>>;
  selectedSolution: IFileData;
  setSelectedSolution: Dispatch<SetStateAction<IFileData>>;
  polygonData: IPolygonData[];
  setPolygonData: Dispatch<SetStateAction<IPolygonData[]>>;
}

const WorkArea: FC<IWorkAreaProps> = ({
  fileData,
  setFileData,
  selectedSolution,
  setSelectedSolution,
  polygonData,
  setPolygonData,
}) => {
  const [isOperationPossible, setIsOperationPossible] =
    useState<boolean>(false);

  // Memoized center to avoid recalculating on each render
  const center = useMemo(() => calculateCenter(polygonData), [polygonData]);

  // Load the polygon positions and initialize selection state from fileData
  useEffect(() => {
    const initialPolygonData = selectedSolution.data.features.map(
      (feature) => ({
        positions: feature.geometry.coordinates[0].map(
          (coord) => [coord[1], coord[0]] as [number, number]
        ),
        isSelected: false, // Initially, none of the polygons are selected
      })
    );

    setPolygonData(initialPolygonData);
  }, [selectedSolution, setPolygonData]);

  const updateWorkData = (newPolygonData: IPolygonData[]) => {
    const updatedFeatures: IFeature[] = newPolygonData.map((polygon) => ({
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [polygon.positions.map((coord) => [coord[1], coord[0]])],
      },
    }));

    const newSelectedSolution: IFileData = {
      ...selectedSolution,
      data: {
        ...selectedSolution.data,
        ...{
          type: "FeatureCollection",
          features: updatedFeatures,
        },
      },
    };

    setSelectedSolution(newSelectedSolution);

    const updatedFileData = fileData.map((file) =>
      file.filename === selectedSolution.filename ? newSelectedSolution : file
    );

    setFileData(updatedFileData);
  };

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

  const deselectAllPolygons = () => {
    setPolygonData((prevPolygonData) =>
      prevPolygonData.map((polygon) => ({
        ...polygon,
        isSelected: false, // Set isSelected to false for all polygons
      }))
    );
  };

  const handlePolygonUnion = () => {
    const selectedPolygons = polygonData.filter(
      (polygon) => polygon.isSelected
    );
    const unionPolygonData: IPolygonData[] | null =
      calculateUnion(selectedPolygons);

    if (unionPolygonData === null) {
      deselectAllPolygons();
      return;
    }

    const newPolygonData = [
      ...polygonData.filter((polygon) => !polygon.isSelected),
      ...unionPolygonData,
    ];

    updateWorkData(newPolygonData);
  };

  const handlePolygonIntersection = () => {
    const selectedPolygons = polygonData.filter(
      (polygon) => polygon.isSelected
    );
    const intersectionPolygonData: IPolygonData[] | null =
      calculateIntersection(selectedPolygons);

    if (intersectionPolygonData === null) {
      deselectAllPolygons();
      return;
    }

    const newPolygonData = [
      ...polygonData.filter((polygon) => !polygon.isSelected),
      ...intersectionPolygonData,
    ];

    updateWorkData(newPolygonData);
  };

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
              >
                <Tooltip>Polygon {index + 1}</Tooltip>
              </Polygon>
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
