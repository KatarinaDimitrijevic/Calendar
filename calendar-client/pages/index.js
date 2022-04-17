import Calendar from '../components/Calendar'
import { useState, useEffect } from 'react'

export default function Home() {

  const [meetings, setMeetings] = useState([]);
  useEffect(() => {
    fetch("http://localhost:7000/api/meetings")
    .then((res) => res.json())
    .then((meetingsFromServer) => setMeetings(meetingsFromServer))
  }, []);

  return (
      <Calendar meetings = { meetings } ></Calendar>
  )
}
