import "./EntriesList.scss";
import { getAllEntries } from "./../../utils/firebase-entries-collection"
import { useState, useEffect } from "react";

const EntriesList = () => {
  let [allEntryData, setAllEntryData] = useState([]);
  useEffect(() => {
    (async () => {
      const entries = await getAllEntries()
      setAllEntryData(entries);
    })()
  }, []);

  return (
    <>
      <h1>EntriesList</h1>
      {(allEntryData.length === 0) ?
        (<p>No Entries</p>) :
        JSON.stringify(allEntryData)
      }
    </>
  );
};
export default EntriesList;
