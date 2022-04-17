const Cell = ({date, meetings}) => {

    return (
        <div>
            <h2>{date}</h2>
            {  
                meetings.map((meeting, index) => (
                    <div key = {index} >
                        { meeting.title }
                        
                        { (meeting.time)  }
                        
                    </div>
                ))
            }
        </div>
    )

};

export default Cell;