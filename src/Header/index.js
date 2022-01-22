import { useState } from "react";
import "./index.scss";

const Header = () => {
  const [conn, setConn] = useState("Connection String");
  const [isSubmitted, setIsSubmitted] = useState(false);
  return (
    <header className="header">
      <nav className="header__nav">
        <ul className="header__links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">Tables</a>
          </li>
        </ul>
      </nav>
      <div className="header__db">
        <input
          value={conn}
          disabled={isSubmitted}
          onChange={(e) => setConn(e.target.value)}
        ></input>
        <button
          disabled={isSubmitted}
          onClick={() => (isSubmitted ? null : setIsSubmitted(true))}
        >
          Connect
        </button>
        <button onClick={() => (isSubmitted ? setIsSubmitted(false) : null)}>
          Disconnect
        </button>
      </div>
    </header>
  );
};

export default Header;
