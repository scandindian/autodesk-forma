import { FC } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setSelectedSolution } from "../store/slice";
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

const Solutions: FC = () => {
  const fileData: IFileData[] = useSelector(
    (state: RootState) => state.geoJsonData.fileData
  );
  const selectedSolution: IFileData | null = useSelector(
    (state: RootState) => state.geoJsonData.selectedSolution
  );
  const dispatch = useDispatch();

  const handleSolutionItemClick = (fileDataItem: IFileData) => {
    dispatch(setSelectedSolution(fileDataItem));
  };

  return (
    <Layout>
      <LayoutTitle>Solutions</LayoutTitle>
      <List>
        {fileData.map((fileDataItem, index) => (
          <ListItem
            key={index}
            $isSelected={fileDataItem.filename === selectedSolution?.filename}
            onClick={() => handleSolutionItemClick(fileDataItem)}
          >
            {fileDataItem.filename}
          </ListItem>
        ))}
      </List>
    </Layout>
  );
};

export default Solutions;
