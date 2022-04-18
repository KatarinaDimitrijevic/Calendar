import Cell from '../Cell';
import Modal from '../Modal';
import CreateEventForm from '../CreateEventForm';
import { useState } from 'react';

const dates = [
    ["", "1", "2", "3", "4", "5", "6"],
    ["7", "8", "9", "10", "11", "12", "13"],
    ["14", "15", "16", "17", "18", "19", "20"],
    ["21", "22", "23", "24", "25", "26", "27"],
    ["28", "29", "30", "31", "", "", ""]
];

const Calendar = ({ meetings }) => {

    const [visible, setVisible] = useState(false);
    const [day, setDay] = useState("");

    return (
        <div>
            <h2>August</h2>
            <table>

                <thead>
                    <tr>
                        <td>Sunday</td>
                        <td>Monday</td>
                        <td>Tuesday</td>
                        <td>Wedneday</td>
                        <td>Thursday</td>
                        <td>Friday</td>
                        <td>Saturday</td>
                    </tr>
                </thead>

                <tbody>
                    {
                        dates.map((row, index) => (
                            <tr key = {index}>
                                {row.map((cell, index) => (
                                    <td key = {index}>
                                        {cell === "" ? (
                                            <></>
                                        ) : (
                                            <div onDoubleClick ={() => {
                                                setVisible(true);
                                                setDay(cell);
                                            }}>
                                                <Cell
                                                date = {cell}
                                                meetings = {
                                                    meetings.filter((m) => {
                                                        const tmp_date = new Date(m.date);
                                                        if(tmp_date.getDate() === Number.parseInt(cell)){
                                                            return true;
                                                        }
                                                        
                                                        return false;
                                                        
                                                    })
                                                    
                                                }
                                                >
                                                </Cell>
                                            </div>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div>
                {visible ? <Modal><CreateEventForm visible={visible} day={day}></CreateEventForm></Modal> : <></>}
            </div>
        </div>
    )
};

export default Calendar;