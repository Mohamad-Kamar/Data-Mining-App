import "./Header.scss";
import { Link } from "react-router-dom";

const Header = ({ dbSelected }) => {
  return (
    <header className="header">
      <nav className="header__nav">
        <ul className="header__links">
          <li>
            {!!dbSelected &&
              <Link to="/entries">EntriesList</Link>
            }
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            {!!dbSelected &&
              <Link to="/add-entry">Add Entry</Link>
            }

          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
