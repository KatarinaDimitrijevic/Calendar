import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./meetingDetails.module.css"

const MeetingDetails = () => {
    const router = useRouter();
    const { id } = router.query;

    //console.log(id);

    const [tmp_list, setList] = useState([]);
    const [meeting, setMeeting] = useState([]);
    useEffect(() => {
        fetch("http://localhost:7000/api/meetings/" + id)
        .then((res) => res.json())
        .then((curr_meeting) => {setMeeting(curr_meeting); setList(curr_meeting.participants)});
    }, []);

    console.log(meeting.participants);

    const deleteMeeting = (meeting) => {
        const options = {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          query: JSON.stringify(id),
        };
    
        fetch("http://localhost:7000/api/meetings/" + id, options)
          .then(router.back());
      };


    const onClickDelete = () => {
        deleteMeeting(meeting);
    };


    return(
        
        <div className={styles.meetingDetails}>
            <h3>Meeting info:</h3>
            <p>Title: {meeting.title}</p>
            <p>Description: {meeting.title}</p>
            <p>Time: {meeting.time}h</p>
            <div>
                Participants:
                <ul>
                    {tmp_list.map((p, index) => <li key={index}>{p}</li>)}
                </ul>
            </div>
            <hr></hr>
            <button className={styles.delete} onClick={() => onClickDelete()}>Delete</button>
        </div>
    )
};


export default MeetingDetails;