import { getDocs,collection,addDoc, updateDoc, doc, orderBy, query, where} from "firebase/firestore";
import { firestore } from "./firebase.js";



// ----------------------------------------------
// Function to fetch tasks according to filter requested by client
// ----------------------------------------------
export const getTasks = async (filter) => {
    try {
        var data;
        var tasksQuery;
        const tasksRef = collection(firestore, "tasks");
        const deletedQuery = where("deleted","==",false);
        if(filter === "Closed"){
            tasksQuery = query(tasksRef, deletedQuery, orderBy("task_status"));
        }
        else if(filter === "Open"){
            tasksQuery = query(tasksRef, deletedQuery, orderBy("task_status","desc"));
        }
        else if(filter === "Newer"){
            tasksQuery = query(tasksRef, deletedQuery, orderBy("taskCreatedAt","desc"));
        }
        else if(filter === "Nearest Time"){
            tasksQuery = query(tasksRef, deletedQuery, orderBy("task_exp_date"));
        }
        const querySnapshot = await getDocs(tasksQuery);
        data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return data;
    } catch (error) {
        console.error("Error fetching tasks from Firestore:", error);
        throw error;
    }
};


// ----------------------------------------------
// Function that get the new task object and adding it to the tasks collection
// ----------------------------------------------
export const createTask = async (task) => {
    if (!task) {
        throw new Error("Task is required to create a document.");
    }
    try {
        const docRef = await addDoc(collection(firestore,"tasks"), task);
  
        return docRef.id;
    } catch (error) {
        console.error("Error adding tasks to Firestore:", error);
        throw error;
    }
  };


    export const updateTask = async (task, newTask) => {
        if (!task) {
            throw new Error("Task is required to create a document.");
        }
        try {
            const docRef = doc(firestore,"tasks",task.id);
            const taskUpdated = await updateDoc(docRef, newTask);
            return taskUpdated;
        } catch (error) {
            console.error("Error adding tasks to Firestore:", error);
            throw error;
        }
    };




// ----------------------------------------------
// Function that get the specific task which the client want to close, search  
// that task from tasks collection and update the status and update-time of it
// ----------------------------------------------
export const closeTask = async (task)=>{
    if (!task) {
        throw new Error("Task is required to update a document.");
    }
    try{
        const docRef = doc(firestore,"tasks",task.id);
        await updateDoc(docRef,{task_status:"closed",taskUpdatedAt:new Date()});
        return {msg:"ok"};
    }
    catch(error){
        console.error("Error closing task:", error);
        throw error;
    }
}

// ----------------------------------------------
// Function to change the task urgency
// ----------------------------------------------
export const changeUrgency = async (task, _urgency)=>{

    try{
        const docRef = doc(firestore,"tasks",task.id);
        await updateDoc(docRef,{urgency:_urgency});
        return {msg:"ok"};
    }
    catch(error){
        console.error("Error closing task:", error);
        throw error;
    }
}

// ----------------------------------------------
// Function to delete task and send it to history
// ----------------------------------------------
export const deleteTask = async (task)=>{

    try{
        const docRef = doc(firestore,"tasks",task.id);
        await updateDoc(docRef,{deleted:true});
        return {msg:"ok"};
    }
    catch(error){
        console.error("Error closing task:", error);
        throw error;
    }
}



// ----------------------------------------------
// Function to fetch closed tasks only
// ----------------------------------------------
export const getHistory= async ()=>{
    
    try{
        const docRef = collection(firestore,"tasks");
        const q = query(docRef, where("deleted","==",true));
        const querySnapshot = await getDocs(q);
        const filtered = querySnapshot.docs.map((doc)=>{
            return doc.data();
        })
        return filtered;
    }
    catch(error){
        console.error("Error closing task:", error);
        throw error;
    }
}