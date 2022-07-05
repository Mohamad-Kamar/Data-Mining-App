import { Routes, Route } from "react-router-dom";

import "./App.scss";
import Header from "./Header/Header";
import Home from "./Home/Home";
import EntriesList from "./EntriesList/EntriesList";
import AddEntry from "./AddEntry/AddEntry";
import Entry from "./Entry/Entry";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="entries" element={<EntriesList />} />
        <Route path="add-entry" element={<AddEntry />} />
        <Route path="entry/:entryName" element={<Entry />} />
      </Routes>
    </div>
  );
}

export default App;
