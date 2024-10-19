import { useState } from "react";
import styled from "styled-components";
import Toolbar from "./components/Toolbar";
import Solutions from "./components/Solutions";
import Statistics from "./components/Statistics";
import WorkArea from "./components/WorkArea";
import { IFileData, IPolygonData } from "./types";
import { importedFileData } from "./utility";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: auto;
  height: 100vh;
  background-color: #f0f2f5;
`;

const App: React.FC = () => {
  const [fileData, setFileData] = useState<IFileData[]>(importedFileData);
  const [selectedSolution, setSelectedSolution] = useState(importedFileData[0]);
  const [polygonData, setPolygonData] = useState<IPolygonData[]>([]);

  return (
    <>
      <Toolbar />
      <Layout>
        <Solutions
          fileData={fileData}
          selectedSolution={selectedSolution}
          setSelectedSolution={setSelectedSolution}
        />
        <WorkArea
          fileData={fileData}
          setFileData={setFileData}
          selectedSolution={selectedSolution}
          setSelectedSolution={setSelectedSolution}
          polygonData={polygonData}
          setPolygonData={setPolygonData}
        />
        <Statistics polygonData={polygonData} />
      </Layout>
    </>
  );
};

export default App;
