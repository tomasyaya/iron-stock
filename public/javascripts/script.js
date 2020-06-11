async function printCharts(shortName) {
  const key = 'AKW7U8FI1GS9YXYK';
  const functionName = 'TIME_SERIES_DAILY';
  const symbolName = shortName;
  const apiUrl = `https://www.alphavantage.co/query?function=${functionName}&symbol=${symbolName}&apikey=${key}`;
  
  try {
    const responseFromAPI = await axios.get(apiUrl);
    printTheChart(responseFromAPI.data, symbolName);
  } catch (error) {
    console.log('Error while getting the data: ', error);
  }
}

function printTheChart(stockData, symbolName) {
  const dailyData = stockData['Time Series (Daily)'];

  const stockDates = Object.keys(dailyData);
  const stockPrices = stockDates.map(date => dailyData[date]['4. close']);

  const ctx = document.getElementById(`my-chart-${symbolName}`).getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockDates,
      datasets: [
        {
          label: 'Stock Chart',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: stockPrices
        }
      ]
    }
  }); // closes chart = new Chart()
} // closes printTheChart()

(async () => {
  const actions = document.querySelectorAll('#actionsCard');
  for (action of actions) {
    const [{innerText: name}] = action.getElementsByClassName('symbolName');
    await printCharts(name);
  }
})()

