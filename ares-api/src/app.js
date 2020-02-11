import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import poseidon_hashing from './routes/poseidon_hashing';


const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ limit: '2mb', extended: false }));

app.get('/healthcheck', (req, res) => res.sendStatus(200));
app.use('/poseidon_hashing', poseidon_hashing);


export default app;
module.exports = app;
