import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Main from "./Main";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Main />} />
      </Route>
    </Routes>
  );
};

export default App;
