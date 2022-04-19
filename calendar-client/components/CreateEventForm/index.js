import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router"
import { Multiselect } from "multiselect-react-dropdown";
import styles from "./createEventForm.module.css";


const CreateEventForm = ({visible, day}) => {

    console.log("Na pocetku Forme: ", visible);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [time, setTime] = useState("");
    const [participants, setParticipants] = useState([]);

    const [allParticipants, setAllParticipants] = useState([]);
    //let users = participants;
    const [visibility, setVisibility] = useState(visible);

    const router = useRouter();
    const multiSelect = useRef();

    useEffect(() => {
        fetch('http://localhost:7000/api/users')
        .then((res) => res.json())
        .then((users) => setAllParticipants(users));
    }, []);

    //console.log(allParticipants);
    //console.log(participants);
    //console.log(title, time, description, participants);

    const resetForm = (form) => {
        form.preventDefault();
        setTitle('');
        setDescription('');
        setTime('');
        setParticipants([]);
        multiSelect.current.resetSelectedValues();

        setVisibility(false);
        console.log("U reset form: ", visibility);

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
          body: JSON.stringify(meeting)
        };
    
        fetch("http://localhost:7000/api/meetings", options)
          .then((res) => res.json());
      };


   
      const onSubmitForm = (form) => {
        form.preventDefault();
        //console.log(title, time, description, participants);
        if(validation()){
            //setParticipants(users);
            //console.log("users: ", users);

            const meeting = {
                title : title,
                description : description,
                time : time,
                date : `August ${day}, 2022`,
                participants: participants,
            };
            
            createMeeting(meeting);
            resetForm(form);
            window.location.reload();
        }else{
            window.alert("All fields are required!");
        }

    };


    return(

       <div>
            <form onSubmit={(form) => onSubmitForm(form)}>
            <button className={styles.button} type="submit">Save</button>
            <button className={styles.button} onClick={(form) => resetForm(form)}>Cancel</button>
            <h4 className={styles.title}>Schedule a meeting on {day}. August: </h4>
            <div>
                <label>Title: 
                <input className={styles.input} type="text" name="title" value={title}
                        onChange={ (title) => setTitle(title.target.value) }
                />
                </label>
            </div>
            <div>
                <label>Description: 
                <input className={styles.input} type="text" name="description" value={description}
                        onChange={ (description) => setDescription(description.target.value) }
                />
                </label>
            </div>
            <div>
                <label>Time: 
                <input className={styles.input} type="text" name="time" value={time}
                        onChange={ (time) => setTime(time.target.value) }
                />
                </label>
            </div>
            <div>
                <label>Choose participants: 
                <Multiselect 
                    isObject={false}
                    options={allParticipants.map((participant) => participant.email)}
                    selectedValues={[]}
                    onSelect={(selectedItem) => {setParticipants(selectedItem)}}
                    onRemove={(selectedItem) => setParticipants(selectedItem)}
                    ref={multiSelect}
                />
                </label>
            </div>
        </form>
       </div>
    )
};

export default CreateEventForm;