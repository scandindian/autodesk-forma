import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";
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

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

// $ prefix makes it a transient prop and tells styled-components to use this prop only for styling and not pass it down to the DOM, eliminating the warning.
interface ListItemProps {
  $isSelected: boolean;
}

const ListItem = styled.li<ListItemProps>`
  margin-bottom: 8px;
  font-size: 14px;
  padding: 8px;
  background-color: ${({ $isSelected }) => ($isSelected ? "#E3F2FD" : "#fff")};
  border-radius: 2px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background-color: ${({ $isSelected }) =>
      $isSelected ? "#BBDEFB" : "#f0f0f0"}; /* Lighter shade on hover */
  }
`;

interface ISolutionProps {
  fileData: IFileData[];
  selectedSolution: IFileData;
  setSelectedSolution: Dispatch<SetStateAction<IFileData>>;
}

const Solutions: FC<ISolutionProps> = ({
  fileData,
  selectedSolution,
  setSelectedSolution,
}) => {
  const handleSolutionItemClick = (fileData: IFileData) => {
    setSelectedSolution(fileData);
  };

  return (
    <Layout>
      <LayoutTitle>Solutions</LayoutTitle>
      <List>
        {fileData.map((fileData, index) => (
          <ListItem
            key={index}
            $isSelected={fileData.filename === selectedSolution.filename}
            onClick={() => handleSolutionItemClick(fileData)}
          >
            {fileData.filename}
          </ListItem>
        ))}
      </List>
    </Layout>
  );
};

export default Solutions;
