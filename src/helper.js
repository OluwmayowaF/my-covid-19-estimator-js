export default {
  getTimeToElapseInDays: (periodType, timeToElapse) => {
    let days = timeToElapse;
    switch (periodType) {
      default:
        days = Math.trunc(timeToElapse / 3);
        break;
      case 'weeks':
        days = Math.trunc((timeToElapse * 7) / 3);
        break;
      case 'months':
        days = Math.trunc((timeToElapse * 30) / 3);
        break;
    }
    return days;
  },
  normaliseDays: (periodType, timeToElapse) => {
    let days = timeToElapse;
    switch (periodType) {
      default:
        days = timeToElapse;
        break;
      case 'weeks':
        days = timeToElapse * 7;
        break;
      case 'months':
        days = timeToElapse * 30;
        break;
    }
    return days;
  },
  currentlyInfected: (reportedCases, impactType) => {
    if (impactType === 'severe') {
      return reportedCases * 50;
    }
    return reportedCases * 10;
  },
  severeCases: (infectionsByTime) => infectionsByTime * 0.15,
  bedsA: (estBed, severeCases) => Math.trunc(estBed - severeCases),
  // Challenge 3 starts here
  icuCases: (infectionsByTime) => Math.trunc(infectionsByTime * (5 / 100)),
  vent: (infectionsByTime) => infectionsByTime * (2 / 100),
  dollarFligth: (infectionsByTime, estInc) => +(infectionsByTime * estInc).toFixed(2)
};
