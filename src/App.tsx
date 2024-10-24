import styled from "styled-components";
import Toolbar from "./components/Toolbar";
import Solutions from "./components/Solutions";
import Statistics from "./components/Statistics";
import WorkArea from "./components/WorkArea";
import { Provider } from "react-redux";
import store from "./store";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: auto;
  height: 100vh;
  background-color: #f0f2f5;
`;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Toolbar />
      <Layout>
        <Solutions />
        <WorkArea />
        <Statistics />
      </Layout>
    </Provider>
  );
};

export default App;
