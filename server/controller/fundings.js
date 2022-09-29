import express from 'express';
import db from '../database/connect.js';
import { fundingsValidator } from '../middleware/validate.js';
// import { adminAuth } from '../middleware/auth.js';

const router = express.Router();

// router.get('/', async (req, res) => {
// 	try {
// 		const fundings = await db.Fundings.findAll(options);
// 		res.json(salons);
// 	} catch (err) {
// 		console.log(err);
// 		res.status(500).send('Įvyko serverio klaida');
// 	}
// });

router.post('/new/:ideaId', fundingsValidator, async (req, res) => {
	try {
		req.body.ideaId = req.params.ideaId;
		await db.Fundings.create(req.body);
		res.send('Dėkojame už Jūsų prisidėjimą!');
	} catch (err) {
		console.log(err);
		res.status(500).send('Įvyko serverio klaida');
	}
});

// router.get('/:id', async (req, res) => {
// 	try {
// 		const funding = await db.Salons.findByPk(req.params.id, {
// 			include: [
// 				{ model: db.Workers, attributes: [ 'id', 'firstName', 'lastName', 'photo' ] },
// 				{ model: db.Services, attributes: [ 'id', 'name', 'duration', 'price' ] }
// 			]
// 		});
// 		res.json(salon);
// 	} catch (err) {
// 		console.log(err);
// 		res.status(500).send('Įvyko serverio klaida');
// 	}
// });

// router.put('/edit/:id', adminAuth, salonsValidator, async (req, res) => {
// 	try {
// 		const salon = await db.Salons.findByPk(req.params.id);
// 		await salon.update(req.body);
// 		res.send('Salono informacija sėkmingai atnaujinta');
// 	} catch (err) {
// 		console.log(err);
// 		res.status(500).send('Įvyko serverio klaida');
// 	}
// });

// router.delete('/delete/:id', adminAuth, async (req, res) => {
// 	try {
// 		const salon = await db.Salons.findByPk(req.params.id);
// 		await salon.destroy();
// 		res.send('Salonas ištrintas');
// 	} catch (err) {
// 		console.log(err);
// 		res.status(500).send('Įvyko serverio klaida');
// 	}
// });

export default router;
