import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import "./App.scss";
import Header from "./Header/Header";
import Home from "./Home/Home";
import EntriesList from "./EntriesList/EntriesList";
import EntryItem from "./EntryItem/EntryItem";
import Entry from "./Entry/Entry";
import { globalConfigs } from "../configs/global-configs";

function App() {
  const { DB_Selected } = globalConfigs;
  const [dbSelected, setDBSelected] = useState(DB_Selected);

  const setGlobalDBSelected = (e) => {
    const dbName = e.target.value;
    globalConfigs.DB_Selected = dbName;
    setDBSelected(dbName);
  }
  return (
    <div className="App">
      <Header dbSelected={dbSelected}/>
      <Routes>
        <Route path="/" element={<Home dbSelected={dbSelected} setGlobalDBSelected={setGlobalDBSelected}/>} />
        <Route path="entries" element={<EntriesList />} />
        <Route path="add-entry" element={<EntryItem />} />
        <Route path="entry/:entryID" element={<Entry />} />
      </Routes>
    </div>
  );
}

export default App;
