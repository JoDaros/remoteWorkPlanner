import "./App.css";
import { useState } from "react";
import "react-tabs/style/react-tabs.css";
import { Tab, Tabs } from "react-bootstrap";
import DOS from "./components/Departments/DOS";
import Loading from "./components/UI/Loading";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadingHandler = (isLoading) => {
    setLoading(isLoading);
  };

  const errorHandler = (error) => {
    setError(error);
  };

  return (
    <div className={"container-fluid py-3"}>
      <Loading isLoading={loading} />
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Tabs defaultActiveKey="home" id="sibs-departments" className="mb-sm-1">
        <Tab eventKey="home" title="DOS">
          <DOS onLoading={loadingHandler} onError={errorHandler} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
