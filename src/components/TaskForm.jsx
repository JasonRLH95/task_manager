import React, { useRef, useState } from 'react';
import '../style/taskForm.css';
import { createTask } from '../firebase/connections.js';

export default function TaskForm({ currentUser }) {
    const [subject,setSubject] = useState("");
    const [urgency,setUrgency] = useState("");
    const [task_owner,setTaskOwner] = useState("");
    const [task_desc,setTaskDesc] = useState("");
    const [task_exp_date,setTaskExpDate] = useState("");

    const subjectRef = useRef();
    const urgencyRef = useRef();
    const ownerRef = useRef();
    const descRef = useRef();
    const expDateRef = useRef();
    

    // ----------------------------------
    // on submit the form, this function try to create new task and add
    // it to the tasks collection on firestore
    // ----------------------------------
    const submit=(e)=>{
        e.preventDefault();

        const newTask = {
            deleted:false,
            subject,
            urgency,
            task_owner,
            task_desc,
            task_exp_date,
            task_status:"open",
            taskCreatedAt: new Date(),
            taskUpdatedAt: new Date(),
            userID:currentUser,
        }
        // -----------
        // make validations first before send to firestore
        // -----------
        const isValid = taskValidation(newTask);
        if(isValid){
            createTask(newTask)
            .then((docRef)=>{
                subjectRef.current.value = "";
                urgencyRef.current.value = "Urgency";
                ownerRef.current.value = "";
                descRef.current.value = "";
                expDateRef.current.value = "";
                alert("A new task successfully created!")
            })
            .catch((error) => {
                console.error("Error adding document:\n", error);
            });
        }
    }

    // ----------------------------
    // validate newTask parameters
    // ----------------------------
    const taskValidation=(task)=>{
        if(task.subject === "" || task.subject.length < 4 ){
            return alert("Subject must be at least 4 characters length");
        }
        if(task.subject.length > 36 ){
            return alert("Subject can't be more then 36 characters length");
        }
        if(task.task_owner === "" || task.task_owner.length < 4){
            return alert("Task's owner name must be at least 4 characters length");
        }
        if(task.task_owner.length > 15){
            return alert("Task's owner name can't be more then 15 characters length");
        }
        if(task.task_desc === "" || task.task_desc.length < 4){
            return alert("Task's description must be at least 4 characters length");
        }
        if(task.task_exp_date === ""){
            return alert("You must add an expiration date first!");
        }
        return true;
    }


  return (
    <form className='taskForm_component' onSubmit={(e)=>{submit(e)}}>
        <h1 className='taskForm_header'>Add New Task</h1>
        <div className="taskForm_container">
            <input ref={subjectRef} type="text" className="taskForm_input" placeholder='Subject...' onChange={(e)=>{setSubject(e.target.value)}}/>
            <input ref={ownerRef} type="text" className="taskForm_input" placeholder='Task for...' onChange={(e)=>{setTaskOwner(e.target.value)}}/>
            <textarea ref={descRef} id='textarea' className="taskForm_input" placeholder='Task description...' onChange={(e)=>{setTaskDesc(e.target.value)}}></textarea>
            <div className="form_date_urgency_div">
                <input ref={expDateRef} type="date" className="taskForm_input" placeholder='Date to acomplish...' onChange={(e)=>{setTaskExpDate(e.target.value)}}/>
                <select ref={urgencyRef} className='taskForm_select' defaultValue={"Urgency"} onChange={(e)=>{setUrgency(e.target.value)}}>
                    <option value="Urgency" hidden disabled>Urgency</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            <button type='submit' className='submitBtn'>Submit</button>
        </div>
    </form>
  )
}
