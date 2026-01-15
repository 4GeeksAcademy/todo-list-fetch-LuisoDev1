import React, { useState, useEffect } from "react";

const URL = 'https://playground.4geeks.com/todo/todos/luis';


// Componente Home
const Home = () => {
	const [taskInputValue, setTaskInputValue] = useState("");
	const [taskList, setTaskList] = useState([]);

	
	
	// Cargar tareas al iniciar la app
	useEffect(() => {
		fetch('https://playground.4geeks.com/todo/todos/luis')
			.then(res => res.json())
			.then(data => {
				console.log("DATA:", data);
				/*Aqui cargamos el estado de la lista con lo que
				está en la API*/
				setTaskList(data);
			});
	}, []);

	
	
	
	// Función para agregar tareas
	const addTask = async () => {
		
		if(taskInputValue.trim() === "") return;

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
			setTaskList(newTask);
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

	return (
		<div className="text-center d-flex flex-column">
			
			<h1
				className="text-center mt-5 text-success"
				style={{ fontSize:"55px", userSelect:"none" }}
				> Todo List
			</h1>

			<input
				className="form-control w-25 mx-auto"
				value={taskInputValue}
				onChange={(e) => setTaskInputValue(e.target.value)}
				onKeyUp={(e) => e.key === "Enter" && addTask()}
			/>

			<ul style={{ listStyle:"none", padding:0 }}>
				{taskList.map((item) => (
					<li key={item.id} className="d-flex align-items-center justify-content-center mt-3">
						<p className="text-success"
							style={{
								border: "2px solid #000",
								width: "20%",
								borderRadius: "8px",
								fontWeight: "bold",
								userSelect: "none",
								marginBottom: 0,
								padding: "6px"
							}}
							> {item.label}
						</p>

						<button
							type="button"
							className="btn btn-close p-0"
							style={{ width:"60px" }}
							onClick={() => deleteTask(item.id)}
							> Delete Task
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Home;
