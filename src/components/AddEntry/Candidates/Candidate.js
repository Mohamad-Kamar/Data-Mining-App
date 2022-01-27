import { useState } from "react";
import { getCandidateFromTransactionsAndPrevData } from "../../../utils";

const Candidate = ({
  allCandidates,
  setAllCandidates,
  idx,
  finalTransaction,
  handleChildCandidateAdded,
  generatedTree = null,
}) => {
  const [supportValue, setSupportValue] = useState("Support Percentage");
  const cData = allCandidates[idx].cData;
  const lData = allCandidates[idx].lData;
  const canGenerate = lData.data.length > 0;
  const handleGenerateNewCandidate = () => {
    if (isNaN(supportValue)) return;
    const newCandidate = getCandidateFromTransactionsAndPrevData(
      finalTransaction,
      parseFloat(supportValue),
      lData.data,
      idx + 2
    );
    handleChildCandidateAdded(newCandidate, idx);
  };

  return (
    <div>
      <div className="tables">
        <div>
          <h3>C{idx + 1} Data</h3>
          <table>
            <thead>
              <tr>
                <td>Item Set</td>
                <td>Count</td>
              </tr>
            </thead>
            <tbody>
              {cData.data.map((elem, idx) => (
                <tr key={idx}>
                  <td>{elem.itemSet.join(" ")}</td>
                  <td>{elem.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3>L{idx + 1} Data</h3>
          <table>
            <thead>
              <tr>
                <td>Item Set</td>
                <td>Count</td>
              </tr>
            </thead>
            <tbody>
              {lData.data.map((elem, idx) => (
                <tr key={idx}>
                  <td>{elem.itemSet.join(" ")}</td>
                  <td>{elem.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {canGenerate && (
        <input
          onChange={(e) => setSupportValue(e.target.value)}
          value={supportValue}
        ></input>
      )}
      <button disabled={!canGenerate} onClick={handleGenerateNewCandidate}>
        {canGenerate
          ? "Generate New Candidates"
          : "Cannot Generate More Candidates"}
      </button>
    </div>
  );
};

export default Candidate;
