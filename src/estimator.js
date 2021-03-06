import help from './helper';

const {
  bedsA, vent, severeCases, dollarFligth, icuCases, normaliseDays
} = help;

const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};
  const {
    reportedCases, periodType, timeToElapse, totalHospitalBeds, region
  } = data;
  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = region;

  // Solution to Challenge One
  const factor = help.getTimeToElapseInDays(periodType, timeToElapse);
  impact.currentlyInfected = help.currentlyInfected(reportedCases, 'normal');
  severeImpact.currentlyInfected = help.currentlyInfected(reportedCases, 'severe');
  impact.infectionsByRequestedTime = (impact.currentlyInfected) * (2 ** factor);
  severeImpact.infectionsByRequestedTime = (severeImpact.currentlyInfected) * (2 ** factor);

  // Solution to Challenge two
  const beds = totalHospitalBeds * 0.35;
  impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
  severeImpact.severeCasesByRequestedTime = severeCases(severeImpact.infectionsByRequestedTime);
  impact.hospitalBedsByRequestedTime = bedsA(beds, impact.severeCasesByRequestedTime);
  severeImpact.hospitalBedsByRequestedTime = bedsA(beds, severeImpact.severeCasesByRequestedTime);

  // Solution to Challenge three
  impact.casesForICUByRequestedTime = icuCases(impact.infectionsByRequestedTime);
  severeImpact.casesForICUByRequestedTime = icuCases(severeImpact.infectionsByRequestedTime);
  impact.casesForVentilatorsByRequestedTime = vent(impact.infectionsByRequestedTime);
  severeImpact.casesForVentilatorsByRequestedTime = vent(severeImpact.infectionsByRequestedTime);
  const day = normaliseDays(periodType, timeToElapse);
  const avgInc = avgDailyIncomePopulation * avgDailyIncomeInUSD;
  impact.dollarsInFlight = dollarFligth(impact.infectionsByRequestedTime, avgInc, day);
  severeImpact.dollarsInFlight = dollarFligth(severeImpact.infectionsByRequestedTime, avgInc, day);

  return {
    data,
    impact,
    severeImpact
  };
};
export default covid19ImpactEstimator;
