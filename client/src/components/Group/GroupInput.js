import React from "react";
import { ListGroup, Row, Tab } from "react-bootstrap";

const GroupInput = (props) => {
  return (
    <div className="container">
      <Tab.Container id="list-group-tabs-example">
        <Row>
          <ListGroup horizontal>
            <ListGroup.Item action onClick={props.onGroupSelected}>
              G1
            </ListGroup.Item>
            <ListGroup.Item action onClick={props.onGroupSelected}>
              G2
            </ListGroup.Item>
            <ListGroup.Item action onClick={props.onGroupSelected}>
              G3
            </ListGroup.Item>
            <ListGroup.Item action onClick={props.onGroupSelected}>
              G4
            </ListGroup.Item>
            <ListGroup.Item action onClick={props.onGroupSelected}>
              G5
            </ListGroup.Item>
          </ListGroup>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default GroupInput;
