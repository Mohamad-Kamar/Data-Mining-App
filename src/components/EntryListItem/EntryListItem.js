import "./EntryListItem.scss";
import { Link } from "react-router-dom";


const EntryListItem = ({ entryData, handleDelete }) => {
    const { entryID, entryName } = entryData;
    if (!entryName || !entryName) return null;

    const toPathname = `/entry/${entryID}`;

    return (
        <div>
            <span>{entryName}</span>
            <span>
                <Link to={toPathname} state={{ ...entryData }}><button>Edit</button></Link>
                <button onClick={()=>handleDelete(entryID)}>Delete</button>
            </span>
        </div>)
}

export default EntryListItem;
