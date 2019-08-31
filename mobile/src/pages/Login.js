import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
// Acessibilidade: No ios, é recomendada a importação de KeyboardAvoidingView e Platform
// para o teclado do ios não sobrepor o input da aplicação nem o botao.

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ navigation }) {
	const [user, setUser] = useState('');

	useEffect(() => { /* Quando usuário recarrega a página, função useeffect é acionada e busca o usuario ja logado e o manda para a Main. */
		AsyncStorage.getItem('user').then(user => {
			if (user) {		// Se user não está vazio e existe um usuario, direciona ele para rota Main
				navigation.navigate('Main', { user })
			} 
		})
	}, []);

	async function handleLogin() {
		const response = await api.post('/devs', { username: user });
  
		const { _id } = response.data;

		await AsyncStorage.setItem('user', _id);

		navigation.navigate('Main', { user: _id });
	}

	return (
		<View style={styles.container}>
			<Image source={logo} />

			<TextInput 
				autoCapitalize="none"
				autoCorrect={false}
				placeholder="Type your Github user"
				placeholderTextColor="#999"
				style={styles.input}
				value={user}
				onChangeText={setUser}
			/>

			<TouchableOpacity onPress={handleLogin} style={styles.button}>
				<Text style={styles.buttonText}>Sendd</Text> 
			</TouchableOpacity> 
		</View>
	);
}

// Estilo dos objetos do React-Native
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000000',	/* Cor de fundo do aplicativo: #f5f5f5 */
		justifyContent: 'center',
		alignItems: 'center',
		padding: 30
	},

	input: {
		height: 46,
		alignSelf: 'stretch',
		backgroundColor: '#FFF',
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 4,
		marginTop: 20,
		padding: 15,
	},

	// Estilo do botão (cor posição, etc)
	button: {
		height: 46,
		alignSelf: 'stretch',
		backgroundColor: '#DF4723',
		borderRadius: 4,
		marginTop: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},

	// Estilo do texto do botão
	buttonText: {
		color: '#FFF',
		fontWeight: 'bold',
		fontSize: 16,
	},

});
