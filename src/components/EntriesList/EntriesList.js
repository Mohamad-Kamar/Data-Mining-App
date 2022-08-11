import "./EntriesList.scss";
import { useState, useEffect } from "react";
import EntryListItem from "../EntryListItem/EntryListItem";

const EntriesList = ({dbSelected}) => {
  let [allEntryData, setAllEntryData] = useState();
  useEffect(() => {
    (async () => {
      const entries = await dbSelected.DB_Object.getAllEntries();
      setAllEntryData(entries);
    })()
  }, [dbSelected]);

  const handleDelete = (entryID) => {
    dbSelected.DB_Object.deletEntry(entryID).then(res=>{
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
