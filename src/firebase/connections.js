import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getDocs,collection,addDoc, updateDoc, doc, orderBy, query, where, deleteDoc, getDoc } from "firebase/firestore";
import { firestore } from "./firebase.js";

export const auth = getAuth();

// ---------------------------------------------------------------------------------------------
// users collection
// ---------------------------------------------------------------------------------------------
// ----------------------------------------------
// Search on the sign in page the user that fits
// the credentials inserted and return his uid
// and his tasks
// ----------------------------------------------
export const findUser = async (email, password)=>{
    if (!email || !password) {
        throw new Error("User is required to search a document.");
    }
    try{
        const userCredential = await signInWithEmailAndPassword( auth, email, password );
        const userID = userCredential.user.uid;
        const tasksQuery = query(collection(firestore, "tasks"), where("userID", "==", userID));
        const querySnapshot = await getDocs(tasksQuery);
        const tasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const res = {
            userID,
            tasks
        }
        return res ? res : null;
    }
    catch (error) {
        console.error("Error fetching tasks from Firestore:", error);
        throw error;
    }
}

// ----------------------------------------------
// Adding new user to the users database when sign up
// ----------------------------------------------
export const addUser = async (email, password)=>{
    if (!email || !password) {
        throw new Error("Email and password is required to create a document.");
    }
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userRef = userCredential.user;
        return userRef;
    } catch (error) {
        console.error("Error signing up:", error.message);
        
        if (error.code === "auth/email-already-in-use") {
            alert("Email is already in use.");
        } else if (error.code === "auth/weak-password") {
            alert("Password should be at least 6 characters.");
        } else {
            alert("Sign-up failed. Try again.");
        }

        return null;
    }
}




// ---------------------------------------------------------------------------------------------
// tasks collection
// ---------------------------------------------------------------------------------------------
// ----------------------------------------------
// Function to fetch tasks according to filter
// requested by client
// ----------------------------------------------
export const getTasks = async (filter, uid) => {
    if (!uid) {
        throw new Error("User ID is required to update a document.");
    }
    try {
        var tasksQuery;
        const tasksRef = collection(firestore, "tasks");
        const deletedQuery = where("deleted","==",false);
        const userTasks = where("userID", "==", uid);
        if(filter === "Closed"){
            tasksQuery = query(tasksRef, deletedQuery, userTasks, orderBy("task_status"));
        }
        else if(filter === "Open"){
            tasksQuery = query(tasksRef, deletedQuery, userTasks, orderBy("task_status","desc"));
        }
        else if(filter === "Newer"){
            tasksQuery = query(tasksRef, deletedQuery, userTasks, orderBy("taskCreatedAt","desc"));
        }
        else if(filter === "Nearest Time"){
            tasksQuery = query(tasksRef, deletedQuery, userTasks, orderBy("task_exp_date"));
        }
        const querySnapshot = await getDocs(tasksQuery);
        var data = querySnapshot.docs.map((doc) => ({
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
// Function that get the new task object and
// adding it to the tasks collection
// ----------------------------------------------
export const createTask = async (task) => {
    if (!task) {
        throw new Error("Task is required to create a document.");
    }
    try {
        const docRef = await addDoc(collection(firestore,"tasks"), task);
        return docRef.id;
    } catch (error) {
        // console.error("Error adding tasks to Firestore:", error);
        console.error("Error adding task:", error.code, error.message);
        throw error;
    }
  };

// ----------------------------------------------
// Function that get the task selected and the
// new information to be updated instead
// ----------------------------------------------
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
// Function that get the specific task which the
// client want to close, search that task from
// tasks collection and update the status and
// update-time of it
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
    if (!task) {
        throw new Error("Task is required to update a document.");
    }
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
    if (!task) {
        throw new Error("Task is required to update a document.");
    }
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
// Function to fetch deleted tasks only
// ----------------------------------------------
export const getHistory= async (uid)=>{
    if (!uid) {
        throw new Error("User ID is required to update a document.");
    }
    try{
        const docRef = collection(firestore,"tasks");
        const userTasks = where("userID", "==", uid);
        const deletedRef = where("deleted","==",true);
        const q = query(docRef, userTasks, deletedRef);
        const querySnapshot = await getDocs(q);
        const filtered = querySnapshot.docs.map((doc)=>({
            id: doc.id,
            ...doc.data(),
        }))
        return filtered;
    }
    catch(error){
        console.error("Error closing task:", error);
        throw error;
    }
}

export const absoluteErase = async(task, uid)=>{
    if (!task || !uid) {
        throw new Error("Task and userID is required to erase a document.");
    }
    try{
        const docRef = doc(firestore,"tasks",task.id);
        const docSnap = await getDoc(docRef);

        if (!docSnap) {
            console.error("Document does not exist.");
            return;
        }

        const docData = {
            id:docSnap.id,
            ...docSnap.data()
        };
        if (docData.userID !== uid) {
            console.error("Unauthorized: User ID does not match, You can't erase this task!");
            return;
        }
        
        await deleteDoc(docRef);
        return {msg:"ok"};
    }
    catch(error){
        console.error("Error absErasing task:", error);
        throw error;
    }
}