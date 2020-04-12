import { Router } from 'express';
import jsonxml from 'jsonxml';
import fs from 'fs';
import os from 'os';
import estimator from './estimator';

const router = Router();

const baseUrl = '/api/v1/on-covid-19';

const logBuild = (meth, path, stat, time) => `${meth}\t\t${path}\t\t${stat}\t\t${time}`;
const logRequests = (content) => {
  fs.writeFile('requestlog.txt', content + os.EOL, { flag: 'a+' }, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('File written sucessfully');
  });
};
router.post(`${baseUrl}`, async (req, res) => {
  const { body } = req;
  const estimate = await estimator(body);

  res.status(200).send(estimate);
  const log = logBuild(req.method, req.path, res.statusCode, res.getHeader('X-Response-Time'));
  logRequests(log);
});
router.post(`${baseUrl}/json`, async (req, res) => {
  const { body } = req;
  const estimate = await estimator(body);
  res.status(200).send(estimate);
  const log = logBuild(req.method, req.path, res.statusCode, res.getHeader('X-Response-Time'));
  logRequests(log);
});
router.post(`${baseUrl}/xml`, async (req, res) => {
  const { body } = req;
  const estimate = await estimator(body);
  res.status(200).set('Content-Type', 'application/xml').send(jsonxml([estimate]));
  const log = logBuild(req.method, req.path, res.statusCode, res.getHeader('X-Response-Time'));
  logRequests(log);
});
router.get(`${baseUrl}/logs`, async (req, res) => {
  fs.readFile('requestlog.txt', (err, content) => {
    if (err) {
      console.log(err);
      return;
    }

    res.status(200).send(content);
  });
});


export default router;
