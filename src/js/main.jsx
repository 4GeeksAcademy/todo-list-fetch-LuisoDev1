import React, { useState, useEffect } from "react";

const URL = 'https://playground.4geeks.com/todo/todos/luis';


// Componente Home
const Home = () => {
	const [isTask, setIsTask] = useState("");
	const [isTaskList, setIsTaskList] = useState([]);

	
	
	// Cargar tareas
	useEffect(() => {
		fetch('https://playground.4geeks.com/todo/todos/luis')
			.then(res => res.json())
			.then(data => {
				console.log("DATA:", data);
				setIsTaskList(data.todos);
			});
	}, []);

	
	
	
	// Función para agregar tareas
	const addTask = async () => {
		
		if (isTask.trim() === "") return;

		const response = await fetch('https://playground.4geeks.com/todo/todos/luis', {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(
				{
					label: task, 
					is_done: false
				})
		});
		
		if(response.ok){
			const newTask = await response.json();
			setIsTaskList([...isTaskList, newTask]);
			setIsTask("");
		}
		
	};

	
	
	// Función para borrar tareas
	const deleteTask = async (id) => {
		await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE"
		});

		setIsTaskList(isTaskList.filter((item) => item.id !== id));
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
				value={isTask}
				onChange={(e) => setIsTask(e.target.value)}
				onKeyUp={(e) => e.key === "Enter" && addTask()}
			/>

			<ul style={{ listStyle:"none", padding:0 }}>
				{isTaskList.map((item) => (
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
