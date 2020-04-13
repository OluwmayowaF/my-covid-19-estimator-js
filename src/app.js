import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import cors from 'cors';
import responseTime from 'response-time';
import morgan from 'morgan';
import fs from 'fs';
import routes from './routes';

const app = express();
const appLogStream = fs.createWriteStream('app.txt', { flag: 'a+' })
morgan.token('response-time-ms', function getResponseTime(req, res) {
    return '0'+Math.trunc(this['response-time'](req, res))+'ms'
  })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(responseTime());
app.use(morgan(':method  :url :status :response-time-ms', { stream: appLogStream}));
app.use(routes);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is listening on localhost:${port}`));

export default app;
