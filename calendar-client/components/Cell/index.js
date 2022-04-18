const Cell = ({date, meetings}) => {
    
    return (
        <div>
            <h2>{date}</h2>
            {  
                meetings.map((meeting, index) => (
                    <div key = {index} >
                        <p> { meeting.title }</p>
                        {/* <p>  { meeting.time.split(', ')[1].split(" ")[1].split(":")[0] }:{ meeting.time.split(', ')[1].split(" ")[1].split(":")[1] }h </p> */}
                    </div>
                ))
            }
        </div>
    )

};

export default Cell;