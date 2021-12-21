import React, {useState} from "react";
import { ListGroup, Row, Tab } from "react-bootstrap";

const GroupInput = (props) => {

  const[activeGroup, setActiveGroup] = useState();

  const groupSelectedHandler = (group) => {
    setActiveGroup(group);
    props.onGroupSelected(group);
  }

  return (
    <div className="container">
      <Tab.Container id="list-group-tabs-example">
        <Row>
          <ListGroup horizontal>
            <ListGroup.Item action onClick={groupSelectedHandler.bind(null,1)} active={activeGroup===1}>
              G1
            </ListGroup.Item>
            <ListGroup.Item action onClick={groupSelectedHandler.bind(null,2)} active={activeGroup===2}>
              G2
            </ListGroup.Item>
            <ListGroup.Item action onClick={groupSelectedHandler.bind(null,3)} active={activeGroup===3}>
              G3
            </ListGroup.Item>
            <ListGroup.Item action onClick={groupSelectedHandler.bind(null,4)} active={activeGroup===4}>
              G4
            </ListGroup.Item>
            <ListGroup.Item action onClick={groupSelectedHandler.bind(null,5)} active={activeGroup===5}>
              G5
            </ListGroup.Item>
          </ListGroup>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default GroupInput;
