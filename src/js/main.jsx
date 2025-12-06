import React from "react";
import { useState } from "react";

//create your first component
const Home = () => {

	const [task, setTask] = useState("");
	const [taskList, setTaskList] = useState( {} );
	
	{/*FUNCION PARA AGREGAR TAREAS*/}
	function addTask async () {
    const addTask = await fetch(URL, {
      method: "POST",
      headers: {
        "content-type": "aplication/json"
      },
      body: JSON.stringify( {label:task, is_done:false} )
    })
		setTaskList([...taskList, {} ])

	}
	{/*FUNCION PARA BORRAR TAREAS en tasklist, ES LLAMADA DESDE EL onClick del */}
	const deleteTask = async (itemDelete) => {
    const response = await fetch(URL)
    method: "DELETE"    
		let newlistTask = taskList.filter(item => item != itemDelete)
		setTaskList(newlistTask)
		}	

	return (
		<div className="text-center d-flex flex-column">           

			<h1 className="text-center mt-5 text-success" style={{fontSize:"55px", userSelect:"none"}} >Todo List</h1>
			<input 
				type="text" 
				className="form-control w-25 mx-auto" 
				onChange={(e) =>  setTask(e.target.value)}  
				onKeyUp={(e) => {
					if(e.target.key=="enter") {
						setTaskList([...taskList, task])
					}
				}}				
				/>
			
			<div className="d-flex justify-content-center my-3" >
				<button className="btn btn-success p-0" style={{width:"80px", height:"40px"}} onClick={(addTask) }>Add Task</button>
			</div>
			
			<p>{task}</p>
			
			{taskList.map((taskItem, index) => {
				return (
				<div className="d-flex alig-items-center justify-content-center" >
					<p className="mt-3 text-success" key={index} 
						style={{border:"2px solid #000", width:"20%", borderRadius:"8px", fontWeight:"bold", userSelect:"none"}}> 
						{taskItem} 
						<div >
							<button type="button" 
							className="btn text-center p-0 btn-close " 
							style={{ width:"60px", color:"#ddd5d5ff"}}  
							onClick={() => deleteTask(taskItem)} ></button>
						</div>
					</p>			
				</div>
				)
				
			})}
			
		</div>
	);
};

export default Home;