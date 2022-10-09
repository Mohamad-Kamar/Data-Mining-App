import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import "./App.scss";
import Header from "./Header/Header";
import Home from "./Home/Home";
import EntriesList from "./EntriesList/EntriesList";
import EntryItem from "./EntryItem/EntryItem";
import Entry from "./Entry/Entry";
import { globalConfigs } from "../configs/global-configs";
import { DYNAMO_DB_NAME, FIREBASE_DB_NAME } from "../constants/global-constants";

import * as firebaseOps from "./../utils/firebase-entries-collection";
import * as dynamoOps from "./../utils/dynamodb-entries-collection";

import { Consumer } from "@mkamar/mq-lib"

const mappings = {
  [DYNAMO_DB_NAME]: dynamoOps,
  [FIREBASE_DB_NAME]: firebaseOps
}


let url = "http://localhost:3491";
let colorConsumer = new Consumer(url);
colorConsumer.connect({queueName: 'BrowserQueue', queueType: 'fanout'});



function App() {

  const [dbSelected, setDBSelected] = useState({...globalConfigs});
  const [bgColor, setBgColor] = useState('white');

  colorConsumer.setOnMessage((message) => {
    console.log("Received: ", message);
    setBgColor(message.data);
  })

  const setGlobalDBSelected = (e) => {
    const dbName = e.target.value;
    globalConfigs.DB_Selected = dbName;
    globalConfigs.DB_Object = mappings[dbName];
    setDBSelected({...globalConfigs});
  }
  return (
    <div className="App" style={{backgroundColor: bgColor}}>
      <Header dbSelected={dbSelected.DB_Selected}/>
      <Routes>
        <Route path="/" element={<Home dbSelected={dbSelected} setGlobalDBSelected={setGlobalDBSelected}/>} />
        <Route path="entries" element={<EntriesList dbSelected={dbSelected}/>} />
        <Route path="add-entry" element={<EntryItem dbSelected={dbSelected}/>} />
        <Route path="entry/:entryID" element={<Entry dbSelected={dbSelected}/>} />
      </Routes>
    </div>
  );
}

export default App;
