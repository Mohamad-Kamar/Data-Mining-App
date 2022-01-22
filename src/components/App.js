import { useEffect } from "react";
import { useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import Header from "./Header";

function App() {
  const [conn, setConn] = useState("Connection String");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onConnClick = () => {
    if (isSubmitted) {
      return;
    } else {
      setIsSubmitted(true);
    }
  };

  const onDiscClick = () => {
    if (!isSubmitted) {
      return;
    } else {
      setIsSubmitted(true);
    }
  };

  useEffect(() => {}, []);
  return (
    <div className="App">
      <Header
        conn={conn}
        setConn={setConn}
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
        onConnClick={onConnClick}
        onDiscClick={onDiscClick}
      />
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

export default App;
