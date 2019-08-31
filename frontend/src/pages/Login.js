import React, { useState } from 'react'; // Sempre importar o React em TODO O COMPONENTE criado;
import './Login.css';

import api from '../services/api';

import logo from '../assets/logo.svg';

export default function Login({ history }) {	// Atributo history que toda a função possui que pode ser manipulado para rotas;
	const [username, setUsername] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();

		const response = await api.post('/devs', {
			username,
		});

		const { _id } = response.data;

		history.push(`/dev/${_id}`);
	}

	return (
		<div className="login-container">
			<form onSubmit={handleSubmit}>
				<img src={logo} alt="Tindev" />
				<input 
				placeholder="Type your Github user"
				value={username}
				onChange={e => setUsername(e.target.value)} // Entre chaves = Código Javascript
				/>
				<button type="submit"> Submit </button> 
			</form>
		</div>
	);
}

