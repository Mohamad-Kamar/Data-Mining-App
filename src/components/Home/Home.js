import logo from "./logo.svg";
import "./Home.scss";
import { DYNAMO_DB_NAME, FIREBASE_DB_NAME } from "../../constants/global-constants";
const Home = ({dbSelected, setGlobalDBSelected}) => {

  const options = [
    {value: '', text: '--Choose an option--'},
    {value: DYNAMO_DB_NAME, text: 'DynamoDB'},
    {value: FIREBASE_DB_NAME, text: "Firebase"},
  ];
  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome</h2>
      <h2>Select Your DB</h2>
      <select value={dbSelected.DB_Selected} onChange={setGlobalDBSelected}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </>
  );
};
export default Home;
