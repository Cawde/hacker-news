import { Link } from "react-router-dom";
import "./Navigation.css";
const Navigation = () => {
  return (
    <div className="nav">
      <Link to="/search">Search</Link>
      <Link to="/history">History</Link>
    </div>
  )
}

export default Navigation;