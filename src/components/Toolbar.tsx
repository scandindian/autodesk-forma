import React from "react";
import styled from "styled-components";

const ToolbarContainer = styled.div`
  height: 80px;
  background-color: #212121;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  color: white;
`;

const Logo = styled.div`
  font-size: 1.2em;
  font-weight: bold;
`;

const Toolbar: React.FC = () => {
  return (
    <ToolbarContainer>
      <Logo>Geo Planner</Logo>
    </ToolbarContainer>
  );
};

export default Toolbar;
