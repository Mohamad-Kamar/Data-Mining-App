import { useLocation } from "react-router-dom";
import EntryItem from "./../EntryItem/EntryItem";

const Entry = ({dbSelected}) => {
  const entryProps = useLocation().state;
  return (
    (
      !entryProps?
      "loading...":
      <EntryItem isEditing={true} entryProps={{ ...entryProps }} dbSelected={dbSelected} />
    )
  );
};
export default Entry;
