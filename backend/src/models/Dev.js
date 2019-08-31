const { Schema, model } = require('mongoose');

const DevSchema = new Schema({
	name: {
		type: String,
		requires: true,
	},
	user: {
		type: String,
		required: true,
	}, 
		bio: String,
		avatar: {
			type: String,
			required: true,
		},
		likes: [{
			type: Schema.Types.ObjectId,
			ref: 'Dev',
		}],
		dislikes: [{
			type: Schema.Types.ObjectId,
			ref: 'Dev',
		}],
	}, {
		timestamps: true,	// Cria coluna automatica chamada createdAt e updatedAt
	});

	module.exports = model('Dev', DevSchema); //Exportar model
	// Agora qualquer arquivo da aplicação que importar este model 
	// vai poder inserir dados na tabela, buscar, atualizar, deletar e etc.
