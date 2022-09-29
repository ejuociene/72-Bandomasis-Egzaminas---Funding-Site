import express from 'express';
import session from 'express-session';
import cors from 'cors';
import Admins from './controller/admins.js';
import Fundings from './controller/fundings.js';
import Ideas from './controller/ideas.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(express.json());

app.set('trust proxy', 1);
app.use(
	session({
		secret: 'labai slapta fraze',
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: false,
			maxAge: 6000000
		}
	})
);

app.use('/api/admins', Admins);
app.use('/api/ideas', Ideas);
app.use('/api/fundings', Fundings);

app.listen(3000);
