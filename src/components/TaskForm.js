import "./TaskForm.css";
import PropTypes from "prop-types";

import React from 'react';
import {useState} from 'react';

const defaultTask = {title:"", is_complete: false, description: ""};

const TaskForm = (props) => {

    const [taskData, setTaskData] = useState(defaultTask);

    const handleFormInput = (event) => {
        const inputElement = event.target;
        const name = inputElement.name;
        const value = inputElement.value;

        const newTaskData = {...taskData};
        newTaskData[name] = value;
        setTaskData(newTaskData);
    };

    const handleFormSubmission = (event) => {
        
        event.preventDefault();
        console.log(props);
        props.handleSubmission(taskData);
    };

    return (
        <form onSubmit={handleFormSubmission} >
            <label htmlFor="Title">Title</label>
            <input id="Title" name="title" type="text" value={taskData.title} onChange={handleFormInput}/>
            <label htmlFor="Description">Description</label>
            <input 
            id="Description" name="description" type="text" value={taskData.description} onChange={handleFormInput}/>
            <label htmlFor="isComplete">isComplete</label>
            <input 
            id="isComplete" name="is_complete" type="text" value={taskData.is_complete} onChange={handleFormInput}/>
            <input type="submit"/>


        </form>

    );

};

TaskForm.protoTypes = {
    handleSubmission: PropTypes.func.isRequired,

}

export default TaskForm;

