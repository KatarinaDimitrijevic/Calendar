import { useRouter } from "next/router";;
import styles from "./cell.module.css";

const Cell = ({date, meetings}) => {
    const router = useRouter();

    const onClickTitle = (id) => {
        //console.log(id);
        router.push("/meetingDetails/" + id);
    }
    
    return (
        <div className={styles.cell}>
            <h2 className={styles.day}>{date}</h2>
            {  
                meetings.map((meeting, index) => (
                    <div className={styles.meeting} key = {index} onClick={() => onClickTitle(meeting._id)}>
                        <p> { meeting.title }</p>
                        <p> { meeting.time}h </p>
                    </div>
                ))
            }
        </div>
    )

};

export default Cell;