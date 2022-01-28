import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { generateTransWithTax } from "../../utils";
import TransactionsTable from "../TransactionsTable/TransactionsTable";
import EntryInputs from "./EntryInputs/EntryInputs";
import Candidates from "./Candidates/Candidates";

import "./AddEntry.scss";

const AddEntry = () => {
  const navigate = useNavigate();

  const [entryName, setEntryName] = useState("");
  const [transTaxValues, setTransTaxValues] = useState({
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
    console.log("HANDILING");
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

  return (
    <div className="entry">
      <div className="page-title">
        <h1>Add Entry</h1>
        <label>Entry Tittle:</label>
        <input onChange={(e) => setEntryName(e.target.value)}></input>
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
export default AddEntry;
