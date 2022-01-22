import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import "./App.scss";
import Header from "./Header/Header";
import Home from "./Home/Home";
import Entries from "./Entries/Entries";
import AddEntry from "./AddEntry/AddEntry";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="entries" element={<Entries />} />
        <Route path="add-entry" element={<AddEntry />} />
      </Routes>
    </div>
  );
}

export default App;
