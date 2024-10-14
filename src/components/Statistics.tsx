import { FC } from "react";
import styled from "styled-components";
import * as turf from "@turf/turf";
import { IFileData } from "../types";

const Layout = styled.div`
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  font-size: 1em;
  padding: 24px;
`;

const LayoutTitle = styled.h2`
  font-size: 18px;
`;

const StatisticsItem = styled.p`
  font-size: 14px;
`;

interface IStatisticsProps {
  selectedSolution: IFileData;
}

const Statistics: FC<IStatisticsProps> = ({ selectedSolution }) => {
  const polygonsArea = selectedSolution.data.features.map((feature) => {
    const polygonItem = turf.polygon(feature.geometry.coordinates);
    return turf.area(polygonItem);
  });

  return (
    <Layout>
      <LayoutTitle>Statistics</LayoutTitle>
      {polygonsArea.map((polygonArea, index) => {
        return (
          <StatisticsItem key={index}>
            <b>Polygon {index + 1} Area:</b> {polygonArea.toFixed(2)} m²
          </StatisticsItem>
        );
      })}
    </Layout>
  );
};

export default Statistics;
