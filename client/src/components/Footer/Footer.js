import "./Footer.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <footer className={"footer-basic"}>
      <div className="container-fluid py-3">
        <div className="row">
          <ul className={"list-inline"}>
            <li className={"list-inline-item"}>
              <a href="https://github.com/JoDaros/remoteWorkPlanner">
                {" "}
                GitHub Link
              </a>
            </li>
          </ul>
          <p className="copyright">João Barros © 2021</p>
          <p className="version">Version 1.3</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
