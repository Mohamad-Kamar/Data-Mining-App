import logo from "./logo.svg";
import "./App.scss";
import Header from "./Header";
function App() {
  return (
    <div className="App">
      <Header />
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

export default App;
