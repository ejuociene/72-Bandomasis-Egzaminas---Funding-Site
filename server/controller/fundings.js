import express from 'express';
import db from '../database/connect.js';
import { fundingsValidator } from '../middleware/validate.js';

const router = express.Router();

router.post('/new/:ideaId', fundingsValidator, async (req, res) => {
	try {
		req.body.ideaId = req.params.ideaId;
		await db.Fundings.create(req.body);
		const idea = await db.Ideas.findOne({where: {id: req.params.ideaId}})
		idea.raisedAmount = idea.raisedAmount + req.body.amount
		if (idea.raisedAmount >= idea.goal) {
			idea.isCompleted = 1;
		}
		await idea.save()
		res.send('Dėkojame už Jūsų prisidėjimą!');
	} catch (err) {
		console.log(err);
		res.status(500).send('Įvyko serverio klaida');
	}
});

export default router;
