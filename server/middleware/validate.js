import Joi from 'joi';

const validate = (schema, req, res, next) => {
	console.log(req.body);
	const options = {
		abortEarly: true,
		stripUnknown: true
	};
	const { error, value } = schema.validate(req.body, options);
	let message = '';
	if (error) {
		console.log(error.details[0].path[0]);
		switch (error.details[0].path[0]) {
			case 'email':
				message = 'Neteisingas el.pašto adresas';
				break;
			case 'password':
				message = 'Slaptažodis turi turėti nuo 5 iki 12 ženklų';
				break;
			case 'goal': 
				message = "Sumos tikslas turi būti daugiau nei nulis"
				break;
			default:
				message = 'Prašome užpildyti visus laukelius';
				break;
		}
		return res.status(500).send(message);
	}
	req.body = value;
	next();
};

export const registerValidator = (req, res, next) => {
	const schema = Joi.object({
		firstName: Joi.string().min(1).max(255).required(),
		lastName: Joi.string().min(1).max(255).required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(5).max(12).required()
	});
	validate(schema, req, res, next);
};

export const loginValidator = (req, res, next) => {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(5).max(12).required()
	});
	validate(schema, req, res, next);
};

export const ideasValidator = (req, res, next) => {
	const schema = Joi.object({
		text: Joi.string().required(),
		image: Joi.string(),
		goal: Joi.number().precision(2).min(1).required(),
		raisedAmount: Joi.number().precision(2).allow(""),
	});
	validate(schema, req, res, next);
};

export const fundingsValidator = (req, res, next) => {
	const schema = Joi.object({
		fullName: Joi.any().required(),
		amount: Joi.number().precision(2).required()
	});
	validate(schema, req, res, next);
};

export default validate;
