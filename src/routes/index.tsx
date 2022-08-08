import { Routes, Route } from "react-router-dom";
import Layout from "./layout";
import IssueMain from "./IssueMain";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<IssueMain />} />
      </Route>
    </Routes>
  );
};

export default App;
