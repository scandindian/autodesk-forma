import { FC } from "react";
import styled from "styled-components";
import { IPolygonData } from "../types";
import { calculatePolygonArea, calculateUnion } from "../utility";

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

interface StatisticsItemProps {
  $isSelected: boolean;
}

const StatisticsItem = styled.p<StatisticsItemProps>`
  font-size: 14px;
  color: ${({ $isSelected }) => ($isSelected ? "#DD2C00" : "#000")};
`;

interface IStatisticsProps {
  polygonData: IPolygonData[];
}

const Statistics: FC<IStatisticsProps> = ({ polygonData }) => {
  const polygonsArea = polygonData.map((featureItem) => {
    return calculatePolygonArea(featureItem.positions);
  });

  const selectedPolygonsArea = () => {
    let totalArea = 0;
    const selectedPolygons = polygonData.filter(
      (polygon) => polygon.isSelected
    );

    if (selectedPolygons.length === 0) {
      return totalArea;
    }

    const unionPolygonData: IPolygonData[] | null =
      calculateUnion(selectedPolygons);

    if (unionPolygonData === null) {
      for (let i = 0; i < polygonData.length; i++) {
        if (polygonData[i].isSelected) {
          totalArea += polygonsArea[i];
        }
      }
      return totalArea.toFixed(2);
    }

    for (let i = 0; i < unionPolygonData.length; i++) {
      totalArea += calculatePolygonArea(unionPolygonData[i].positions);
    }
    return totalArea.toFixed(2);
  };

  return (
    <Layout>
      <LayoutTitle>Statistics</LayoutTitle>
      {polygonsArea.map((polygonArea, index) => {
        return (
          <StatisticsItem
            key={index}
            $isSelected={polygonData[index].isSelected}
          >
            <b>Polygon {index + 1} Area:</b> {polygonArea.toFixed(2)} m²
          </StatisticsItem>
        );
      })}
      <StatisticsItem $isSelected={false}>
        <b>Total Selected Area:</b> {selectedPolygonsArea()} m²
      </StatisticsItem>
    </Layout>
  );
};

export default Statistics;
