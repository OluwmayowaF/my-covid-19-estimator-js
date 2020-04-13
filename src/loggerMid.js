import fs from 'fs';
import os from 'os';

const getTimeInMilliseconds = (startTime) => {
  const timeInNS = 1e9; // time in nano seconds
  const timeInMS = 1e6; // time in milli seconds
  const timeDifference = process.hrtime(startTime);
  return (timeDifference[0] * timeInNS + timeDifference[1]) / timeInMS;
};

const requestLogger = (request, response, next) => {
  const { method, url } = request;
  const { statusCode } = response;
  const startTime = process.hrtime();
  const timeInMS = getTimeInMilliseconds(startTime).toLocaleString();
  const content = `${method}\t\t${url}\t\t${statusCode}\t\t${Math.trunc(
    timeInMS
  )
    .toString()
    .padStart(2, '00')}ms`;

  fs.writeFile('requestlog.txt', content + os.EOL, { flag: 'a+' }, (err) => {
    if (err) {
      console.log(err);
      return;
    }
  });
  next();
};

export default requestLogger;
