const Dev = require('../models/Dev');

module.exports = {
	async store(req, res) {
		console.log(req.params.devId);
		console.log(req.headers.user);

		const { devId } = req.params;
		const { user } = req.headers;

		const loggedDev = await Dev.findById(user);
		const targetDev = await Dev.findById(devId);

		if (!targetDev) {
			return res.status(400).json({ error: 'Dev not exists'});
		}

		loggedDev.dislikes.push(targetDev._id);	// Insiro o ID do dev Dislikeado na propriedade dislikes do dev logado na aplicação

		await loggedDev.save();

		return res.json(loggedDev);
	}
};
