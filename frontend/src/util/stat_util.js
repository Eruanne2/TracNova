import Statistics from 'statistics';

// example input: 

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

// export and use this function
const sum = (arr) => arr.reduce((acc, el) => acc + el);
const avg = (arr) => sum(arr) / arr.length;

const getCorrelationCoefficient = (data, varTypes) => {
  const types = Object.values(varTypes);
  const hasBinary = types.includes('binary');
  const hasMetric = types.includes('metric');

  if (types.length !== 2) throw 'Invalid varTypes.';

  if (hasBinary && !hasMetric){
    const valSets = data.map(pair => Object.values(pair));
    const count = { '0,0': 0, '0,1': 0, '1,0': 0, '1,1': 0 };

    valSets.forEach(set => {
      let key = set.toString();
      count[key] += 1 
    });
    
    const table = Object.values(count);

    return phi(table);
  }

  if (hasBinary && hasMetric){
    // point-biserial
    return pointBiserial(data, varTypes);
  }

  if (!hasBinary && hasMetric){
    // spearman
    const stats = new Statistics(data, varTypes);
    const spearman = stats.spearmansRho(...Object.keys(varTypes));

    return spearman.rho;
  }
  
  else return 'Invalid varTypes.';
};


// Phi Correlation
const phi = table => {
  return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt((table[2] + table[3]) * (table[0] + table[1]) * (table[1] + table[3]) * (table[0] + table[2]))
}

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