import "./EntriesList.scss";
import { getAllEntries } from "./../../utils/firebase-entries-collection"
import { useState, useEffect } from "react";
import EntryListItem from "../EntryListItem/EntryListItem";
import { deletEntry } from "./../../utils/firebase-entries-collection";
import { globalConfigs } from "../../configs/global-configs";


const EntriesList = () => {
  let [allEntryData, setAllEntryData] = useState();
  useEffect(() => {
    (async () => {
      const entries = await getAllEntries()
      setAllEntryData(entries);
    })()
  }, []);

  const handleDelete = (entryID) => {
    deletEntry(entryID).then(res=>{
      setAllEntryData(allEntryData.filter(entry => entry.entryID !== entryID))
    })
  }

  return (
    <>
      <h1>EntriesList</h1>
      {(allEntryData === undefined) ?
        (<p>Loading</p>) :
        (allEntryData.length === 0) ?
          (<p>No Entries</p>) :
          (allEntryData
            .map((entryData) => {
              return <EntryListItem key={entryData.entryID} entryData={entryData} handleDelete={handleDelete} />
            })
            .filter(item => !!item)
          )
      }
    </>
  );
};
export default EntriesList;
