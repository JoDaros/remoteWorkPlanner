import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <div className="navbar-brand" style={{ padding: 0 }}>
            SIBS Remote Work Planner
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
