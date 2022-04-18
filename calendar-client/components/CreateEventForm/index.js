import { useState, useEffect, useRef } from "react";
import { Multiselect } from "multiselect-react-dropdown";


const CreateEventForm = ({}) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [time, setTime] = useState("");
    const [participants, setParticipants] = useState([]);

    const [allParticipants, setAllParticipants] = useState([]);

    useEffect(() => {
        fetch('http://localhost:7000/api/users')
        .then(res => res.json())
        .then(users => setAllParticipants(users))
    }, []);

    //console.log(allParticipants);
    //console.log(participants);
    //console.log(title, time, description, participants);

    const resetForm = (form) => {
        setTitle("");
        setDescription("");
        setTime("");
        setParticipants([]);
        multiSelect.current.resetSelectedValues();
    };

    const onSubmitForm = (form) => {
        form.preventDefault();
        // console.log(title, time, description, participants);


    };

    const multiSelect = useRef();

    return(

        <form onSubmit={(form) => onSubmitForm(form)}>
            <button type="submit">Save</button>
            <button onClick={(form) => resetForm(form)}>Cancel</button>
            <h3>Schedule a meeting: </h3>
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
    )
};

export default CreateEventForm;