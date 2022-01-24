import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { generateTransWithTax } from "../../utils";
import TransactionsTable from "../TransactionsTable/TransactionsTable";
import "./AddEntry.scss";

const AddEntry = () => {
  const navigate = useNavigate();

  const [entryName, setEntryName] = useState("");
  const [transTaxValues, setTransTaxValues] = useState({
    trans: "",
    tax: "",
  });
  const [isTaxAdded, setIsTaxAdded] = useState(false);
  const [finalTransaction, setFinalTransaction] = useState("");
  const [isTableView, setIsTableView] = useState(false);

  const [isSubmitAllowed, setIsSubmitAllowed] = useState(false);

  const handleGenerateTransactions = (e) => {
    console.log("HANDILING");
    e.preventDefault();
    try {
      const results = generateTransWithTax(transTaxValues, isTaxAdded);
      const stringifiedRes = JSON.stringify(results, null, 2);
      setFinalTransaction(stringifiedRes);
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
      <form
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
        <div className="entry__inputs">
          <div className="entry__input">
            <h3>Transactions</h3>
            <textarea
              required
              className="entry__textarea"
              onChange={(e) => {
                setTransTaxValues({
                  ...transTaxValues,
                  trans: e.target.value,
                });
                console.log("CLICKED WITH VAL: " + e.target.value);
              }}
            ></textarea>
          </div>
        </div>
        <div>
          <br></br>
          <input
            type="checkbox"
            onChange={() => {
              setIsTaxAdded(!isTaxAdded);
            }}
          ></input>
          <label>Add Taxonomy</label>
        </div>

        <div className="entry__inputs">
          <div className="entry__input">
            <h3>Taxonomies</h3>
            <textarea
              disabled={!isTaxAdded}
              className="entry__textarea"
              onChange={(e) =>
                setTransTaxValues({
                  ...transTaxValues,
                  tax: e.target.value,
                })
              }
            ></textarea>
          </div>
        </div>
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

        <div>
          <button type="submit" disabled={!isSubmitAllowed}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddEntry;
