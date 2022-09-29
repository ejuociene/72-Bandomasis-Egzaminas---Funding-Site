export const auth = (req, res, next) => {
	if (req.session.loggedin) return next();
	return res.status(401).send('Vartotojo sesijos laikas pasibaigė');
};

export const adminAuth = (req, res, next) => {
	if (req.session.loggedin && req.session.role === 1) return next();
	return res.status(401).send('Vartotojo sesijos laikas pasibaigė');
};
