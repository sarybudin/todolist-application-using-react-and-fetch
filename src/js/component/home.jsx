import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

const createTodo = async () => {
	try {
		return await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/sbudin",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify([]),
				redirect: "follow"
			}
		).then(response => response.json());
	} catch (error) {
		console.log(error);
		return { result: "Error al actualizar" };
	}
};
const getTodo = async () => {
	try {
		return await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/sbudin",
			{
				method: "GET",
				redirect: "follow"
			}
		).then(response => response.json());
	} catch (error) {
		console.log(error);
		return [];
	}
};
const putTodo = async (data = []) => {
	try {
		return await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/sbudin",
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
				redirect: "follow"
			}
		).then(response => response.json());
	} catch (error) {
		console.log(error);
		return { result: "Error al actualizar" };
	}
};
const deleteTodo = async () => {
	try {
		return await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/sbudin",
			{
				method: "DELETE",
				redirect: "follow"
			}
		).then(response => response.json());
	} catch (error) {
		console.log(error);
		return [];
	}
};
//create your first component
const Home = () => {
	const [input, setInput] = useState("");
	const [lista, setLista] = useState([]);

	// se ejecuta al tener cambio de variables
	useEffect(() => {});
	// se ejecuta al renderizar
	useEffect(() => {
		console.log(">Renderizando");
		getTodo().then(lista => {
			setLista(lista.map(dato => dato.label));
		});
	}, []);

	return (
		<div className="text-center mt-5 padre">
			<div className="contenedor">
				<h1>ToDo</h1>

				<input
					type="text"
					placeholder="whats need to be done?"
					onChange={e => {
						setInput(e.target.value);
						console.log(input);
					}}
					value={input}
					onKeyUp={e => {
						//solo enter
						if (e.keyCode === 13) {
							if (input !== "") {
								// pregunta si hay datos en la lista
								if (lista.length == 0) {
									// entra porque no tiene datos
									// entonces crea la lista, actualiza con el nuevo dato y obtiene los datos

									// crea la lista
									createTodo().then(val => {
										let dato = [];
										[...lista, input].forEach(value => {
											dato.push({
												label: value,
												done: false
											});
										});
										// actualiza con nuevos datos
										putTodo(dato).then(val => {
											// obtiene todos los datos
											getTodo().then(lista => {
												setLista(
													lista.map(
														dato => dato.label
													)
												);
											});
										});
										// deja el input vacío
										setInput("");
									});
								} else {
									// entra al else porque tiene datos
									// entonces solo tiene que actualizar y obtener

									//setLista([...lista, input]);
									let dato = [];
									[...lista, input].forEach(value => {
										dato.push({
											label: value,
											done: false
										});
									});

									// actualiza los datos
									putTodo(dato).then(val => {
										// obtiene todos los datos
										getTodo().then(lista => {
											setLista(
												lista.map(dato => dato.label)
											);
										});
									});
									// deja el input vacio
									setInput("");
								}
							}
						}
					}}
				/>
				<ul>
					{lista.map((valorlista, key) => {
						return (
							<li key={key}>
								{valorlista}
								<a
									onClick={() => {
										lista.splice(key, 1);
										//setLista([...lista]);
										let dato = [];
										[...lista].forEach(value => {
											dato.push({
												label: value,
												done: false
											});
										});

										// pregunta si existen datos en la lista
										// entonces ingresa al if para actualizar la lista con array vacio
										// de lo contrario elimina todo
										if (dato.length > 0) {
											// actualiza los datos
											putTodo(dato).then(val => {
												// obtiene todo
												getTodo().then(lista => {
													setLista(
														lista.map(
															dato => dato.label
														)
													);
												});
											});
										} else {
											// elimina todo y deja la lista vacia
											deleteTodo().then(value => {
												setLista([]);
											});
										}
									}}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-trash"
										viewBox="0 0 16 16">
										<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
										<path
											fillRule="evenodd"
											d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
										/>
									</svg>
								</a>
							</li>
						);
					})}
				</ul>
				<label>{lista.length} item left</label>
			</div>
		</div>
	);
};

export default Home;
