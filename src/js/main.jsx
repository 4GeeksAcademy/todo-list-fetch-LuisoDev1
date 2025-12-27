import React, { useState, useEffect } from "react";

const URL = "https://playground.4geeks.com/todo/todos/luis";

const Home = () => {
	const [task, setTask] = useState("");
	const [taskList, setTaskList] = useState([]);

	// Cargar tareas
	useEffect(() => {
		fetch(URL)
			.then(res => res.json())
			.then(data => {
				console.log("DATA:", data);
				setTaskList(data.todos);
			});
	}, []);

	// Agregar tarea
	const addTask = async () => {
		if (task.trim() === "") return;

		const response = await fetch(URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({label: task, is_done: false})
		});
		if(response.ok){
			const newTask = await response.json();
			setTaskList([...taskList, newTask]);
			setTask("");
		}
		
	};

	// Borrar tarea
	const deleteTask = async (id) => {
		await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE"
		});

		setTaskList(taskList.filter(item => item.id !== id));
	};

	return (
		<div className="text-center d-flex flex-column">

			<h1
				className="text-center mt-5 text-success"
				style={{ fontSize: "55px", userSelect: "none" }}
				> Todo List
			</h1>

			<input
				className="form-control w-25 mx-auto"
				value={task}
				onChange={e => setTask(e.target.value)}
				onKeyUp={e => e.key === "Enter" && addTask()}
			/>

			<ul style={{ listStyle: "none", padding: 0 }}>
				{taskList.map(item => (
					<li 
						key={item.id}
						className="d-flex align-items-center justify-content-center mt-3"
						>
						<p
							className="text-success"
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
							style={{ width: "60px" }}
							onClick={() => deleteTask(item.id)}
							> Delete
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Home;
