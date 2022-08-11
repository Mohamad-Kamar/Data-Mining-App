import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { generateTransWithTax } from "../../utils";
import TransactionsTable from "../TransactionsTable/TransactionsTable";
import EntryInputs from "./EntryInputs/EntryInputs";
import Candidates from "./Candidates/Candidates";

import "./EntryItem.scss";

const EntryItem = ({ isEditing, entryProps, dbSelected }) => {
  const navigate = useNavigate();

  const [entryName, setEntryName] = useState(entryProps?.entryName || "");
  const [transTaxValues, setTransTaxValues] = useState(entryProps?.transTaxValues || {
    trans: "",
    tax: "",
  });

  const [isTaxAdded, setIsTaxAdded] = useState(false);
  const [isTransHidden, setIsTransHidden] = useState(false);
  const [isCandsHidden, setIsCandsHidden] = useState(false);
  const [finalTransaction, setFinalTransaction] = useState("");
  const [isTableView, setIsTableView] = useState(false);

  const [generatedTree, setGeneratedTree] = useState();
  const [isSubmitAllowed, setIsSubmitAllowed] = useState(false);

  const handleGenerateTransactions = (e) => {
    e.preventDefault();
    try {
      const [results, generatedTreeObj] = generateTransWithTax(
        transTaxValues,
        isTaxAdded
      );
      const stringifiedRes = JSON.stringify(results, null, 2);
      setFinalTransaction(stringifiedRes);
      setGeneratedTree(generatedTreeObj);
      setIsSubmitAllowed(true);
    } catch (e) {
      console.error(e);
      setIsSubmitAllowed(false);
    }
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    //Show loading

    try {
      const newEntryData = { entryName, transTaxValues }
      if (isEditing) {
        dbSelected.DB_Object.editEntry(newEntryData, entryProps.entryID)
      }
      else {
        dbSelected.DB_Object.addEntry(newEntryData)
      }
    }
    catch (e) {
      //Show Error
      console.log("ERROR!", e);
    }
    finally {
      //Stop Loading
    }
  };

  return (
    <div className="entry">
      <div className="page-title">
        <h1>Add Entry</h1>
        <label>Entry Tittle:</label>
        <input onChange={(e) => setEntryName(e.target.value)} value={entryName}></input>
      </div>
      <div
        className="entry__form"
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/entry/${entryName}`, {
            state: {
              entryName,
              data: JSON.parse(finalTransaction),
            },
          });
        }}
      >
        <div>
          <label>hide transaction section</label>
          <input
            type="checkbox"
            onChange={() => setIsTransHidden(!isTransHidden)}
          ></input>
        </div>
        <EntryInputs
          hidden={isTransHidden}
          transTaxValues={transTaxValues}
          setTransTaxValues={setTransTaxValues}
          setIsTaxAdded={setIsTaxAdded}
          isTaxAdded={isTaxAdded}
        />

        <div>
          <button onClick={handleGenerateTransactions}>
            Generate Transactions
          </button>
        </div>
        <div>
          <button onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
        <div>
          {isSubmitAllowed && (
            <textarea disabled={true} value={finalTransaction}></textarea>
          )}
        </div>

        {isSubmitAllowed && (
          <div className="trans-table-div">
            <div>
              <input
                type="checkbox"
                onChange={() => {
                  setIsTableView(!isTableView);
                }}
              ></input>
              <label>View as Table</label>
            </div>
            {isTableView && (
              <div hidden={!isTableView}>
                <TransactionsTable transactions={finalTransaction} />
              </div>
            )}
          </div>
        )}

        <Candidates
          isCandsHidden={isCandsHidden}
          finalTransaction={
            finalTransaction.length ? JSON.parse(finalTransaction) : []
          }
          generatedTree={generatedTree}
        />
        <div>
          <button onClick={() => setIsCandsHidden(!isCandsHidden)}>
            {isCandsHidden ? "Show Candidates" : "Hide Candidates"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default EntryItem;
