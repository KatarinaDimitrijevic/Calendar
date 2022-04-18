import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const MeetingDetails = () => {
    const router = useRouter();
    const {id} = router.query;

    console.log(id);

    const [meeting, setMeeting] = useState([]);
    useEffect(() => {
        fetch("http://localhost:7000/api/meetings/" + id)
        .then((res) => res.json())
        .then((curr_meeting) => setMeeting(curr_meeting));
    }, []);


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
        <div>
            <h3>Meeting info:</h3>
            <p>Title: {meeting.title}</p>
            <p>Description: {meeting.title}</p>
            <p>Time: {meeting.time}</p>
            <div>
                Participants: {meeting.participants}
            </div>
            <hr></hr>
            <button onClick={() => onClickDelete()}>Delete</button>
        </div>
    )
};


export default MeetingDetails;