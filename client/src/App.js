import './App.css';
import {useEffect, useState} from "react";
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CalendarComponent from "./Components/Calendar/Calendar";
import {formatDate} from "./Utils/DateUtils";
import {requestRemoteDays} from "./Utils/Request";

function App() {
    let [remoteDays, setRemoteDays] = useState([]);
    const [months] = useState([]);

    const currentDate = formatDate(Date.now());
    useEffect( () => {
        const requestInitialMonth = async () => {
            await requestNewMonth(currentDate, 5);
        }
        requestInitialMonth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    let onGroupSelected = (event) =>{
        console.log("Selected value: ", event.target.value)
    };
    return (
        <div>
            <h1>SIBS Remote Work Planner</h1>
            <Tabs>
                <TabList>
                    <Tab>DOSAD</Tab>
                </TabList>
                <TabPanel>
                    <div>
                        <label htmlFor="groups">Group:</label>
                        <select name="groups" id="groups" onChange={onGroupSelected} >
                            <option disabled selected value>Select a group</option>
                            <option value="g1">G1</option>
                            <option value="g2">G2</option>
                            <option value="g3">G3</option>
                            <option value="g4">G4</option>
                            <option value="g5">G5</option>
                        </select>
                    </div>
                    <div>
                        <CalendarComponent remoteDays={remoteDays} updateDays={updateRemoteDays}/>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );


    function addRemoteDays(daysToAdd) {
        let addedRemoteDays = [...remoteDays, ...daysToAdd];
        setRemoteDays(addedRemoteDays);
    }


    function updateRemoteDays({activeStartDate, value, view}) {

        const selectedDate = formatDate(activeStartDate);

        if (view === 'month') {
            requestNewMonth(selectedDate,5);
        }
    }

    async function requestNewMonth(selectedDate, group) {

        if (!months.find(month => {
            return (
                selectedDate === month
            );
        })) {
            const data = await requestRemoteDays(selectedDate, group);
            months.push(selectedDate);
            addRemoteDays(data);
        }
    }
}


export default App;
