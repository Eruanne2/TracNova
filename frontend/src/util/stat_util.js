// const Statistics = require('statistics.js'); // do not remove the .js !!!!
import Statistics from "statistics.js"
// { "10/15/2021": 127.83, "04/21/2021": 69 }
// { "10/15/2021": true, "04/19/2021": true, "04/21/2021": false }
// => [ { var1: } ]

export const formatData = (...variables) => {
  variables = variables.filter(variable => variable);
  
  if (variables.length === 0) return [];

  const formDataObj = {};
  const dates = new Set(
    variables.reduce((acc, variable) => (
      acc.concat(Object.keys(variable.dailylogs || {}))
    ), [])
  );

  for (let date of dates){
    formDataObj[date] = {date};
    for (let variable of variables)
      if (variable.dailylogs[date] === undefined){
        delete formDataObj[date];
        break;
      }
      else
        formDataObj[date][variable.name] = variable.dailylogs[date];
  }

  return Object.values(formDataObj)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

const formatVarTypes = (...variables) => Object.fromEntries(
  variables.map( variable => 
    [ variable.name, 
      (variable.unit === 'boolean') ? 'binary' : 
        // (variable.unit === 'rating' ? 'rating' : 
        variable.unit
    ]
  )
);

// get number of data points
export const numDataPoints = (variable1, variable2) => 
  formatData(variable1, variable2).length;

// takes data from daily logs and formats it as shown below
export const getStatData = (...variables) =>
  [formatData(...variables), formatVarTypes(...variables)];

// example input for getCorrelationCoefficient: 

// var data = [
// 	{ painMeds: 0, walkingMin: 12 },
// 	{ painMeds: 0, walkingMin: 8 },
// 	{ painMeds: 1, walkingMin: 22 },
// 	{ painMeds: 1, walkingMin: 16 },
//  { painMeds: 0, walkingMin: 7 },
// 	{ painMeds: 1, walkingMin: 20 },
//  { painMeds: 1, walkingMin: 18 }
// ];

// varTypes = { painMeds: 'binary', walkingMin: 'metric' }   -->   (varTypes are either 'binary' or 'metric')

const sum = (arr) => arr.reduce((acc, el) => acc + el, 0);
const avg = (arr) => arr.length === 0 ? 0 : sum(arr) / arr.length;

// export and use this function
// export const getCorrelationCoefficient = (data, varTypes) => {
export const getCorrelationCoefficient = (var1, var2) => {
  const [rawData, varTypes] = getStatData(var1, var2);

  for (let key of Object.keys(varTypes)){
    if (varTypes[key] !== "binary")
      varTypes[key] = "metric";
  }

  const data = rawData.map(({date, ...pair}) => pair);
  
  const types = Object.values(varTypes);
  const hasBinary = types.includes('binary');
  const hasOther = types.filter(type => type !== 'binary').length > 0;

  if (types.length !== 2) throw 'Invalid varTypes.';

  if (hasBinary && !hasOther){
    const valSets = data.map(pair => Object.values(pair));
    const count = { '0,0': 0, '0,1': 0, '1,0': 0, '1,1': 0 };

    valSets.forEach(set => {
      let key = set.toString();
      count[key] += 1 
    });
    
    const table = Object.values(count);

    return phi(table);
  }

  if (hasBinary && hasOther){
    // point-biserial
    return pointBiserial(data, varTypes);
  }

  if (!hasBinary && hasOther){
    // spearman
    const stats = new Statistics(data, varTypes);
    const spearman = stats.spearmansRho(...Object.keys(stats.columns));

    return spearman.rho;
  }
  
  else console.warn('Invalid varTypes in stat_util.');
};


// Phi Correlation
const phi = ([_00, _01, _10, _11]) => 
  (_11 * _00 - _10 * _01) /
    Math.sqrt((_10 + _11) * (_00 + _01) * (_01 + _11) * (_00 + _10))


// Point-Biserial Correlation
const pointBiserial = (testData, varTypes) => {
  let binaryVar, metricVar;

  for (let key in varTypes) {
    if (varTypes[key] === 'binary') binaryVar = key
    else if (varTypes[key] === 'metric') metricVar = key;
  }

  const onesVals = [];
  const zeroesVals = [];

  testData.forEach(dataSet => {
    if (dataSet[binaryVar] === 1) onesVals.push(dataSet[metricVar])
    else if (dataSet[binaryVar] === 0) zeroesVals.push(dataSet[metricVar]);
  });
  
  const onesAvg = avg(onesVals);
  const zeroesAvg = avg(zeroesVals);
  const std_dev = popStdDev(onesVals.concat(zeroesVals));

  return (onesAvg - zeroesAvg) * Math.sqrt(onesVals.length * zeroesVals.length) / (testData.length * std_dev)
};

// Population Standard Deviation (helper)
const popStdDev = arr => {
  const mean = avg(arr);

  return Math.sqrt(
    arr.reduce((acc, val) => acc + (val - mean) ** 2, 0) / arr.length
  );
};
