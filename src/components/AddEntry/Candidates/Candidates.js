import { useState } from "react";
import Candidate from "./Candidate";
import { getCandidateFromTransactions } from "./../../../utils";
import "./Candidates.scss";

const Candidates = ({ finalTransaction, generatedTree }) => {
  const [allCandidates, setAllCandidates] = useState([]);
  const [supportValue, setSupportValue] = useState("Support Percentage");

  const handleChildCandidateAdded = (newCandidate, idx) => {
    setAllCandidates([...allCandidates.slice(0, idx + 1), newCandidate]);
  };

  const candidateComponents = allCandidates.map((candidateData, idx) => {
    return (
      <Candidate
        key={idx}
        allCandidates={allCandidates}
        setAllCandidates={setAllCandidates}
        idx={idx}
        finalTransaction={finalTransaction}
        handleChildCandidateAdded={handleChildCandidateAdded}
      />
    );
  });

  const generateInitailCandidate = () => {
    if (isNaN(supportValue)) return;
    const initialCandidate = getCandidateFromTransactions(
      finalTransaction,
      parseFloat(supportValue)
    );
    setAllCandidates([initialCandidate]);
  };

  return (
    <div className="candidates">
      <input
        onChange={(e) => setSupportValue(e.target.value)}
        value={supportValue}
      ></input>
      <button onClick={generateInitailCandidate}>
        Generate Initail Candidate
      </button>
      <div className="candidates-list">{candidateComponents}</div>
    </div>
  );
};
export default Candidates;
