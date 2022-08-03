import { useLocation, useParams } from "react-router-dom";
import EntryItem from "./../EntryItem/EntryItem";

const Entry = () => {
  const { entryID } = useParams();
  const entryProps = useLocation().state;
  return (
    (
      !entryProps?
      "loading...":
      <EntryItem isEditing={true} entryProps={{ ...entryProps }} />
    )
  );
};
export default Entry;
