import { Routes, Route } from "react-router-dom";
import Layout from "./layout";
import IssueMain from "./IssueMain";
import IssueDetail from "./IssueDetail";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<IssueMain />} />
        <Route path="/issue/:id" element={<IssueDetail />} />
      </Route>
    </Routes>
  );
};

export default App;
