import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './meetingDetails.module.css';

const MeetingDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  //console.log(id);

  const [tmpList, setList] = useState([]);
  const [meeting, setMeeting] = useState([]);
  useEffect(() => {
    fetch('http://localhost:7000/api/meetings/' + id)
      .then((res) => res.json())
      .then((currMeeting) => {
        setMeeting(currMeeting);
        setList(currMeeting.participants);
      });
  }, []);

  //console.log(meeting.participants);

  const deleteMeeting = () => {
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      query: JSON.stringify(id),
    };

    fetch('http://localhost:7000/api/meetings/' + id, options).then(router.back());
  };

  return (
    <>
      <button className={styles.delete} onClick={() => router.back()}>
        Back
      </button>
      <div className={styles.meetingDetails}>
        <h3>Meeting info:</h3>
        <p>Title: {meeting.title}</p>
        <p>Description: {meeting.description}</p>
        <p>Time: {meeting.time}h</p>
        <div>
          Participants:
          <ul>
            {tmpList.map((p, index) => (
              <li key={index}>{p}</li>
            ))}
          </ul>
        </div>
        <hr></hr>
        <button className={styles.delete} onClick={() => deleteMeeting()}>
          Delete
        </button>
      </div>
    </>
  );
};

export default MeetingDetails;
