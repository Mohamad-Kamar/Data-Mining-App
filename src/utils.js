import { Node, Tree } from "./Tree";
import { CData, DataInstance, CandidateClass } from "./CandidateClass";

const csvToArray = (csvData) => {
  const lines = csvData.split("\n");
  const elemArrays = lines
    .filter((line) => line.length)
    .map((line) =>
      line
        .split(",")
        .map((elem) => elem.trim())
        .filter((elem) => elem)
    );
  return elemArrays;
};

export const generateTransWithTax = (transTaxValues, isTaxAdded) => {
  console.log("GENERATING");
  const allValues = csvToArray(transTaxValues.trans);

  if (!isTaxAdded) return [allValues, null];

  const root = new Node(null, null, null);
  const taxonomyTree = new Tree(root, transTaxValues.tax);
  console.log("CREATED TREE");

  const taxedTransValues = allValues.map((transArray) => {
    console.log("MAPPING TRANS ARRAY");
    const ancestoryChainsArray = transArray.map((courseName) =>
      taxonomyTree.getAncestoryChainArray(courseName)
    );

    console.log("GOT ANCESTORY CHAIN");
    return ancestoryChainsArray.flat();
  });

  const uniqueTaxedTransValues = taxedTransValues.map((val) => [
    ...new Set(val),
  ]);
  return [uniqueTaxedTransValues, taxonomyTree];
};

export const getCandidateFromTransactions = (finalTransaction, support) => {
  //finalTransactions: [["a","b"],["a"],["b","c"]]

  //allTransactions: ["a", "b", "a", "b", "c"]
  const allTransactions = finalTransaction.flat();
  console.log(allTransactions);
  //uniqueTransactions: ["a", "b", "c"]
  const uniqueTransactions = [...new Set(allTransactions)];

  const cData = new CData();
  for (let uTrans of uniqueTransactions) {
    let counter = 0;
    for (let trans of allTransactions) if (uTrans === trans) counter++;
    const cDataInstance = new DataInstance([uTrans], counter);
    cData.add(cDataInstance);
  }
  const dataLength = finalTransaction.length;
  const lData = cData.getLData(support, dataLength);

  const candidateData = new CandidateClass(cData, lData);
  return candidateData;
};

const isSubsetOf = (set, subset) => {
  return new Set([...set, ...subset]).size === set.length;
};

const getPermutations = (array, size) => {
  function p(t, i) {
    if (t.length === size) {
      result.push(t);
      return;
    }
    if (i + 1 > array.length) {
      return;
    }
    p(t.concat(array[i]), i + 1);
    p(t, i + 1);
  }

  var result = [];
  p([], 0);
  return result;
};

export const getCandidateFromTransactionsAndPrevData = (
  finalTransaction,
  support,
  prevLData,
  combinationLength
) => {
  console.log(
    "PREV L DATA",
    prevLData.map((elem) => elem.itemSet)
  );
  //finalTransactions: [["a","b"],["a"],["b","c"]]
  const uniqueTransactions = [
    ...new Set(prevLData.map((elem) => elem.itemSet).flat()),
  ];
  console.log("UNIQUES: ", uniqueTransactions);

  const transactionsCombinations = getPermutations(
    uniqueTransactions,
    combinationLength
  );
  console.log(combinationLength);
  console.log("COMBOS: ", transactionsCombinations);
  const cData = new CData();
  for (let combo of transactionsCombinations) {
    let counter = 0;
    for (let trans of finalTransaction) {
      if (isSubsetOf(trans, combo.flat())) {
        counter++;
      }
    }

    const cDataInstance = new DataInstance(combo, counter);
    cData.add(cDataInstance);
  }
  const dataLength = finalTransaction.length;

  const lData = cData.getLData(support, dataLength);

  const candidateData = new CandidateClass(cData, lData);
  return candidateData;
};
