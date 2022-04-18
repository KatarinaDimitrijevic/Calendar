import { useRouter } from "next/router";

const Cell = ({date, meetings}) => {
    const router = useRouter();

    const onClickTitle = (id) => {
        //console.log(id);
        router.push("/meetingDetails/" + id);
    }
    
    return (
        <div>
            <h2>{date}</h2>
            {  
                meetings.map((meeting, index) => (
                    <div key = {index} onClick={() => onClickTitle(meeting._id)}>
                        <p> { meeting.title }</p>
                        <p> { meeting.time}h </p>
                    </div>
                ))
            }
        </div>
    )

};

export default Cell;