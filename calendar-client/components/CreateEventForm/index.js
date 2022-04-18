import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router"
import { Multiselect } from "multiselect-react-dropdown";


const CreateEventForm = ({visible, day}) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [time, setTime] = useState("");
    const [participants, setParticipants] = useState([]);

    const [allParticipants, setAllParticipants] = useState([]);
    //const [visibility, setVisibility] = useState([visible]);

    const router = useRouter();

    useEffect(() => {
        fetch('http://localhost:7000/api/users')
        .then(res => res.json())
        .then(users => setAllParticipants(users));
    }, []);

    //console.log(allParticipants);
    //console.log(participants);
    console.log(title, time, description, participants);

    const resetForm = (form) => {
        form.preventDefault();
        setTitle("");
        setDescription("");
        setTime("");
        setParticipants([]);
        multiSelect.current.resetSelectedValues();
    };

    const validation = () => {
        if(title.length === 0 || description.length === 0 || time.length === 0){
            return false;
        }
        return true;
    }

    const createMeeting = (meeting) => {
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(meeting),
        };
    
        fetch("http://localhost:7000/api/meetings", options)
          .then((res) => res.json());
      };


   
      const onSubmitForm = (form) => {
        form.preventDefault();
        //console.log(title, time, description, participants);
        if(validation()){
            const meeting = {
                title : title,
                description : description,
                time : time,
                date : `August ${day}, 2022`,
                participants: participants.map((p) => p.email),
            };
            createMeeting(meeting);
            resetForm(form);
            window.location.reload();
        }else{
            window.alert("All fields are required!");
        }

    };

    const multiSelect = useRef();

    return(

       <div>
            <form onSubmit={(form) => onSubmitForm(form)}>
            <button type="submit">Save</button>
            <button onClick={(form) => resetForm(form)}>Cancel</button>
            <h3>Schedule a meeting on {day}. August: </h3>
            <div>
                <label>Title: 
                <input type="text" name="title"
                        onChange={ (title) => setTitle(title.target.value) }
                />
                </label>
            </div>
            <div>
                <label>Description: 
                <input type="text" name="description"
                        onChange={ (description) => setDescription(description.target.value) }
                />
                </label>
            </div>
            <div>
                <label>Time: 
                <input type="text" name="time"
                        onChange={ (time) => setTime(time.target.value) }
                />
                </label>
            </div>
            <div>
                <label>Choose participants: 
                <Multiselect 
                    options={allParticipants}
                    selectedValues={[]}
                    onSelect={(selectedItems) => setParticipants(selectedItems)}
                    onRemove={(selectedItems) => setParticipants(selectedItems)}
                    displayValue="name"
                    ref={multiSelect}
                />
                </label>
            </div>
        </form>
       </div>
    )
};

export default CreateEventForm;