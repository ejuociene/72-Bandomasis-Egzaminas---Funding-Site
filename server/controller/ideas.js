import express from 'express';
import db from '../database/connect.js';
import { ideasValidator } from '../middleware/validate.js';
import upload from "../middleware/multer.js"
// import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const ideas = await db.Ideas.findAll()
		res.json(ideas);
	} catch (err) {
		console.log(err);
		res.status(500).send('Įvyko serverio klaida');
	}
});

router.post('/new', upload.single("image"), ideasValidator, async (req, res) => {
	try {
		if (req.file) {
			req.body.image = '/uploads/' + req.file.filename;
		}
		await db.Ideas.create(req.body);
		res.send('Nauja idėja sėkmingai pridėta');
	} catch (err) {
		console.log(err);
		res.status(500).send('Įvyko serverio klaida');
	}
});

router.get('/:id', async (req, res) => {
	try {
		const idea = await db.Ideas.findByPk(req.params.id);
		res.json(idea);
	} catch (err) {
		console.log(err);
		res.status(500).send('Įvyko serverio klaida');
	}
});

router.put('/confirm/:ideaId', async (req, res) => {
	try {
		const idea = await db.Ideas.findByPk(req.params.ideaId);
		await idea.update({ status: 1 });
		res.send('Iėja sėkmingai patvirtinta');
	} catch (err) {
		console.log(err);
		res.status(500).send('Įvyko serverio klaida');
	}
});

router.delete('/delete/:id', async (req, res) => {
	try {
		const idea = await db.Ideas.findByPk(req.params.id);
		await idea.destroy();
		res.send('Idėja išstrinta');
	} catch (err) {
		console.log(err);
		res.status(500).send('Įvyko serverio klaida');
	}
});

export default router;
