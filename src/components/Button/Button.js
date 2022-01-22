import "./Button.scss";
const Button = ({ btnText, onClick }) => {
  return <button className="btn" onClick={onClick}>{btnText}</button>;
};
export default Button;
