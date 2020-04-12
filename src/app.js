import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import responseTime from 'response-time';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(responseTime())
app.use(routes);


const port = 5000;

app.listen(port, () => console.log(`Server is listening on localhost:${port}`))

export default app;