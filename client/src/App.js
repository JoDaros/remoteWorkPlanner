import './App.css';
import {useEffect, useState} from "react";
import 'react-tabs/style/react-tabs.css';
import CalendarComponent from "./Components/Calendar/Calendar";
import {formatDate} from "./Utils/DateUtils";
import {requestRemoteDays} from "./Utils/Request";
import {convertGroupToNumber} from "./Utils/GroupUtils";
import {ListGroup, Row, Tab, Tabs} from "react-bootstrap";

function App() {
    const [remoteDays, setRemoteDays] = useState([]);
    const [months, setMonths] = useState([]);
    const [group, setGroup] = useState();
    const [currentDate, setCurrentDate] = useState(formatDate(Date.now()));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect( () => {

        const requestNewMonth = async (selectedDate, group) => {
            if (!months.find(month => {
                return (
                    selectedDate === month
                );
            })) {
                try {
                    const data = await requestRemoteDays(selectedDate, group);
                    months.push(selectedDate);
                    addRemoteDays(data);
                    setLoading(false);
                } catch (error){
                    console.log(error);
                    setError("An error occurred while connecting to the server");
                    setLoading(false);
                }
            }
        };

        function addRemoteDays(daysToAdd) {
            let addedRemoteDays = [...remoteDays, ...daysToAdd];
            setRemoteDays(addedRemoteDays);
        }

        if (group && currentDate) {
            requestNewMonth(currentDate, group);

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [group, currentDate])

    const onGroupSelected = async (event) => {
        const selectedGroup = convertGroupToNumber(event.target.innerText);
        if(group !== selectedGroup) {
            setMonths([]);
            setRemoteDays([]);
            setGroup(selectedGroup);
            setLoading(true);
            setError('');
        }
    };

    return (
        <div className={"container-fluid py-3"}>
            <div className={loading ? "loading" : "nodiv"} style={{fontSize: 0}}>Loading</div>
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-sm-1">
                <Tab eventKey="home" title="DOSAI">
                    {error &&
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    }
                    <div className="container">
                        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                            <Row>
                            <ListGroup horizontal>
                                <ListGroup.Item action href="#g1" onClick={onGroupSelected}>G1</ListGroup.Item>
                                <ListGroup.Item action href="#g2" onClick={onGroupSelected}>G2</ListGroup.Item>
                                <ListGroup.Item action href="#g3" onClick={onGroupSelected}>G3</ListGroup.Item>
                                <ListGroup.Item action href="#g4" onClick={onGroupSelected}>G4</ListGroup.Item>
                                <ListGroup.Item action href="#g5" onClick={onGroupSelected}>G5</ListGroup.Item>
                            </ListGroup>
                            </Row>
                        </Tab.Container>
                    </div>
                    <div className="mt-2 col-xs-8 d-flex justify-content-center">
                        <CalendarComponent remoteDays={remoteDays} updateDays={updateRemoteDays}/>
                    </div>
                </Tab>
            </Tabs>



        </div>
    );


    function updateRemoteDays({activeStartDate, value, view}) {
        if (view === 'month') {
            setCurrentDate(formatDate(activeStartDate));
        }
    }
}


export default App;
