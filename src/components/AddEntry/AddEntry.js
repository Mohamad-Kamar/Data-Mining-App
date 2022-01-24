import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { generateTransWithTax } from "../../utils";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/entry/${entryName}`, {
      state: {
        entryName,
        data: JSON.parse(finalTransaction),
      },
    });
  };
  return (
    <div className="entry">
      <div className="page-title">
        <h1>Add Entry</h1>
        <input onChange={(e) => setEntryName(e.target.value)}></input>
      </div>
      <form className="entry__form" onSubmit={handleSubmit}>
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
        <br></br>
        <button onClick={handleGenerateTransactions}>
          Generate Transactions
        </button>

        <br></br>

        {isSubmitAllowed && (
          <textarea disabled={true} value={finalTransaction}></textarea>
        )}

        <br></br>

        <button type="submit" disabled={!isSubmitAllowed}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default AddEntry;
