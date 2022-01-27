const EntryInputs = ({
  hidden,
  transTaxValues,
  setTransTaxValues,
  setIsTaxAdded,
  isTaxAdded,
}) => {
  return (
    <div hidden={hidden}>
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
    </div>
  );
};

export default EntryInputs;
