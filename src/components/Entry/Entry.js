import { useLocation, useParams } from "react-router-dom";

const Entry = () => {
  const {
    state: { data },
  } = useLocation();

  const { entryName } = useParams();
  return (
    <div>
      <h1>{entryName}</h1>
    </div>
  );
};
export default Entry;
