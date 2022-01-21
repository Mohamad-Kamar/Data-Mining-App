import "./index.scss";

const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <ul className="header__links">
        <li><a href="/">Home</a></li>
        <li><a href="/">Tables</a></li>
        </ul>
      </nav>
      <div className="header__db"></div>
    </header>
  );
};

export default Header;
