import styled from "styled-components";

const Layout = styled.div`
  background-color: white;
  padding: 24px;
  display: flex;
  font-size: 1em;
`;

const WorkArea: React.FC = () => {
  return <Layout>Work Area</Layout>;
};

export default WorkArea;