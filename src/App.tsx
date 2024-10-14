import styled from "styled-components";
import Toolbar from "./components/Toolbar";
import Solutions from "./components/Solutions";
import Statistics from "./components/Statistics";
import WorkArea from "./components/WorkArea";
import { useState, useEffect } from "react";
import { IFeatureCollection, IFileData } from "./types";
import SE_State_Management_Polygons_1 from "./data/SE_State_Management_Polygons_1.json";
import SE_State_Management_Polygons_2 from "./data/SE_State_Management_Polygons_2.json";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: auto;
  height: 100vh;
  background-color: #f0f2f5;
`;

const App: React.FC = () => {
  const [fileData, setFileData] = useState<IFileData[]>([]);
  const importedFileData: IFileData[] = [
    {
      filename: "SE_State_Management_Polygons_1.json",
      data: SE_State_Management_Polygons_1 as unknown as IFeatureCollection,
    },
    {
      filename: "SE_State_Management_Polygons_2.json",
      data: SE_State_Management_Polygons_2 as unknown as IFeatureCollection,
    },
  ];
  const [selectedSolution, setSelectedSolution] = useState(importedFileData[0]);

  useEffect(() => {
    setFileData(importedFileData);
  }, []);

  return (
    <>
      <Toolbar />
      <Layout>
        <Solutions
          fileData={fileData}
          selectedSolution={selectedSolution}
          setSelectedSolution={setSelectedSolution}
        />
        <WorkArea fileData={selectedSolution}/>
        <Statistics />
      </Layout>
    </>
  );
};

export default App;
