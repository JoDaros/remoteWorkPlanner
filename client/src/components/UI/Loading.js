import classes from "./Loading.module.css";
import ReactDOM from "react-dom";
import { Fragment } from "react";

const Loading = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div
          className={props.isLoading ? classes.loading : "nodiv"}
          style={{ fontSize: 0 }}
        >
          Loading
        </div>,
        document.getElementById("overlay")
      )}
    </Fragment>
  );
};
export default Loading;
