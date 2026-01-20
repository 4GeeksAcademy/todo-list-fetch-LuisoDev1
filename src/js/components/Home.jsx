import React, { useState, useEffect } from "react";

const URL = 'https://playground.4geeks.com/todo/todos/luis';

console.log("RENDER");

// Componente Home
const Home = () => {
	const [taskInputValue, setTaskInputValue] = useState("");
	const [taskList, setTaskList] = useState([]);
	
	// Cargar tareas al iniciar la app
	useEffect(() => {
  		const init = async () => {
    		try {				
				// Checando si existe el usuario Luis en la API
				const resp = await fetch("https://playground.4geeks.com/todo/users/luis");

				// Si la respuesta es que no existe el usuario Luis, entonces lo creamos
				if (!resp.ok) {
					const createdResp = await fetch("https://playground.4geeks.com/todo/todos/luis", {method:'POST'});
				}

				if(createdResp.ok){
					init();
					
					setTaskList(Array.isArray(createdResp)? createdResp: [createdResp]);

				}
				
    		} catch (error) {
      		
				console.error("Error cargando tareas:", error);
      			setTaskList([]);
   			}
  		};
}, []);
	
	
	// Función para agregar tareas
	const addTask = async () => {
		
		// si el estado está vacío se cancela la acción
		if(taskInputValue.trim() === "") return;

		// Si el estado no está vacío se agrega la tarea a la API
		const response = await fetch('https://playground.4geeks.com/todo/todos/luis', {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(
				{
					label: taskInputValue, 
					is_done: false
				})
		});
		
		if(response.ok){
			const newTask = await response.json();
			setTaskList([...taskList, newTask]);
			setTaskInputValue("");
		}
		
	};

	
	
	// Función para borrar tareas
	const deleteTask = async (id) => {
		await fetch(`https://playground.4geeks.com/todo/todos/luis/${id}`, {
			method: "DELETE"
		});

		setTaskList(taskList.filter((item) => item.id !== id));
	};

	console.log("RENDER")

	return (
		<div className="text-center d-flex flex-column"style={{minWidth:"33.3%"}}>
			
			<h1
				className="text-center mt-5"
				style={{ fontSize:"55px", userSelect:"none" }}
				> Todo List
			</h1>
			<div className="d-flex justify-content-center">
				<p className="w-25" style={{
					marginBottom:"20px",
					fontSize:"0.7em", 
					minHeight:"1.5em",
					borderRadius:"3px"}}> 
					{taskInputValue} 
				</p>
			</div> 
				<input 
				className="w-25 mx-auto"
				placeholder="add a task"
				value={taskInputValue}
				onChange={(e) => setTaskInputValue(e.target.value)}
				onKeyUp={(e) => e.key === "Enter" && addTask()}
				/>

			<ul style={{ listStyle:"none", padding:0}}>
				{taskList.map((item) => (
					<li key={item.id} className="d-flex align-items-center justify-content-center mt-3">
						<p 
							style={{
								border:"1px solid #423e3e",
								width: "25%",							
								fontWeight: "bold",
								userSelect: "none",
								marginBottom: 0,
								padding: "6px"
							}}
							> {item.label}
						</p>

						<button
							type="button"
							className="btn btn-danger btn-sm ms-2"
							style={{ width:"80px" }}
							onClick={() => deleteTask(item.id)}
							> Delete Tas
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Home;
