import { Node, Tree } from "./Tree";

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

  if (!isTaxAdded) return JSON.stringify(allValues, null, 2);
  console.log("GOT ALL VALUES" + JSON.stringify(allValues));

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
  return uniqueTaxedTransValues;
};
