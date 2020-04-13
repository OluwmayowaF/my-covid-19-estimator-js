import { Router } from 'express';
import jsonxml from 'jsonxml';
import fs from 'fs';
import estimator from './estimator';

const router = Router();

const baseUrl = '/api/v1/on-covid-19';

router.post(`${baseUrl}/`, async (req, res) => {
  const { body } = req;
  const estimate = await estimator(body);
  res.header('Content-Type', 'application/json');
  res.status(200).send(estimate);
});
router.post(`${baseUrl}/json`, async (req, res) => {
  const { body } = req;
  const estimate = await estimator(body);
  res.header('Content-Type', 'application/json');
  res.status(200).send(estimate);
});
router.post(`${baseUrl}/xml`, async (req, res) => {
  const { body } = req;
  const estimate = await estimator(body);
  res.header('Content-Type', 'application/xml');
  res.status(200).send(jsonxml([estimate]));
});
router.get(`${baseUrl}/logs`, async (req, res) => {
  fs.readFile('requestlog.txt', (err, content) => {
    if (err) {
      // console.log(err);
      return;
    }
    res.header('Content-Type', 'text/plain; charset=UTF-8');
    res.status(200).send(content);
  });
});

export default router;
