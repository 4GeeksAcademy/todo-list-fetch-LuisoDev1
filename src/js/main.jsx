import React, { useState } from "react";

// create your first component
const Home = () => {
	const [task, setTask] = useState("");
	const [taskList, setTaskList] = useState([]);


	const URL = "URL_AQUI"; // No olvidar


	// FUNCIÓN PARA AGREGAR TAREAS
	const addTask = async () => {
		if (task.trim() === "") return;
		const newTask = { label: task, is_done: false}		
		await fetch(URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newTask)
		});
		setTaskList([...taskList, newTask]);
		setTask("");
	};
	

	// FUNCIÓN PARA BORRAR TAREAS
	const deleteTask = async (taskToDelete) => {
		await fetch(URL, {
			method: "DELETE"
		});
		const newTaskList = taskList.filter((item) => item !== taskToDelete);
		setTaskList(newTaskList); // Agrego al etado taskList la nueva lista filtrada
	};

	return (
		<div className="text-center d-flex flex-column">

			<h1
				className="text-center mt-5 text-success"
				style={{ fontSize: "55px", userSelect: "none" }}
			    >Todo List
			</h1>

			<input
				type="text"
				className="form-control w-25 mx-auto"
				value={task}
				onChange={(e) => setTask(e.target.value)}
				onKeyUp={(e) => {
					if (e.key === "Enter") addTask();
				}}
			/>

			<div className="d-flex justify-content-center my-3">
				<button
					className="btn btn-success p-0"
					style={{ width: "80px", height: "40px" }}
					onClick={addTask}
					>Add Task
				</button>
			</div>

			{/* Renderizando la lista de tareas a traves de map */}
			{taskList.map((taskItem, index) => (
				<div
					key={index}
					className="d-flex align-items-center justify-content-center"
				    >
					<p
						className="mt-3 text-success"
						style={{
							border: "2px solid #000",
							width: "20%",
							borderRadius: "8px",
							fontWeight: "bold",
							userSelect: "none"
						}}
						>{taskItem.label}
					</p>

					<button
						type="button"
						className="btn text-center p-0 btn-close"
						style={{ width: "60px" }}
						onClick={() => deleteTask(taskItem)}
					/>
				</div>
			))}

		</div>
	);
};

export default Home;
