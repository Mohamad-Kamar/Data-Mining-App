import "./index.scss";

const Header = ({
  conn,
  setConn,
  isSubmitted,
  setIsSubmitted,
  onConnClick,
  onDiscClick,
}) => {
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
        <button disabled={isSubmitted} onClick={onConnClick}>
          Connect
        </button>
        <button disabled={!isSubmitted} onClick={onDiscClick}>
          Disconnect
        </button>
      </div>
    </header>
  );
};

export default Header;
