import React from "react";
import styled from "styled-components";
import Toolbar from "./Toolbar";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: auto;
  height: 100vh;
  background-color: #f0f2f5;
`;

const SideBar = styled.div`
  background-color: #F5F5F5;
  display: flex;
  font-size: 1em;
  padding: 24px;
`;

const MainContent = styled.div`
  background-color: white;
  padding: 24px;
  display: flex;
  font-size: 1em;
`;

const App: React.FC = () => {
  return (
    <>
      <Toolbar />
      <Layout>
        <SideBar>Solutions</SideBar>
        <MainContent>Work Area</MainContent>
        <SideBar>Statistics</SideBar>
      </Layout>
    </>
  );
};

export default App;
