const Dev = require('../models/Dev');

module.exports = {
	async store(req, res) {
		console.log(req.io, req.connectedUsers);

		const { devId } = req.params;
		const { user } = req.headers;

		const loggedDev = await Dev.findById(user);
		const targetDev = await Dev.findById(devId);

		if (!targetDev) {
			return res.status(400).json({ error: 'Dev not exists'});
		}

		/** Para notificar o match é preciso pegar as duas conexões de socket ativas, se existirem, do loggedDev e do targetDev (Quem deu o like e do que recebeu o like) **/
		if (targetDev.likes.includes(loggedDev._id)){
			const loggedSocket = req.connectedUsers[user];
			const targetSocket = req.connectedUsers[devId];

			if (loggedSocket){ /** Aqui só avisa os usuários do match se os dois estiverem conectados. Porém, pode ser feito se um dos usuários não estiverem logados no momento, guardando o like numa collection no mongoDB. */
				req.io.to(loggedSocket).emit('match', targetDev);
			}

			if (targetSocket) {
				req.io.to(targetSocket).emit('match', loggedDev);
			}
		}

		loggedDev.likes.push(targetDev._id);	// Insiro o ID na propriedade likes do dev logado na aplicação

		await loggedDev.save();

		return res.json(loggedDev);
	}
};
