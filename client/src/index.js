import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

ReactDOM.render(
  <React.Fragment>
    <section className="container-fluid flex-grow-1">
      <div className="row">
        <Navbar />
        <App />
      </div>
    </section>
    <Footer />
  </React.Fragment>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
