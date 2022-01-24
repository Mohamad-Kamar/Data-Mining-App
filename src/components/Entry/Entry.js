import { useLocation } from "react-router-dom";

const Entry = () => {
  const {
    state: { entryName, data },
  } = useLocation();

  return (
    <div>
      <h1>{entryName}</h1>
    </div>
  );
};
export default Entry;
