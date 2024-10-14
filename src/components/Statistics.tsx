import styled from "styled-components";

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

const Statistics: React.FC = () => {
  return (
    <Layout>
      <LayoutTitle>Statistics</LayoutTitle>
    </Layout>
  );
};

export default Statistics;
