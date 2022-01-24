import "./TransactionsTable.scss";

const TransactionsTable = ({ transactions }) => {
  const getTableCols = (elem) =>
    elem.map((col, colIdx) => (
      <td className="trans-table-col" key={colIdx}>
        {col}
      </td>
    ));

  const getTableElems = (transactions) =>
    JSON.parse(transactions).map((elem, idx) => (
      <tr className="trans-table-row" key={idx}>
        {getTableCols(elem)}
      </tr>
    ));

  return (
    transactions && (
      <table className="trans-table">
        <tbody className="trans-table-body">
          {getTableElems(transactions)}
        </tbody>
      </table>
    )
  );
};

export default TransactionsTable;
