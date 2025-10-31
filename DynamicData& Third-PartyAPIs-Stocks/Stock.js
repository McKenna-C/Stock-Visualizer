//What the stock code started off as
//Whithout a lot of AI enhancements

document.getElementById("fetchData").addEventListener("click", async () => {
    const symbol = document.getElementById("stockSymbol").value.trim().toUpperCase();
    const output = document.getElementById("output");

    if (!symbol) {
      output.textContent = "Please enter a stock symbol.";
      return;
    }

    output.textContent = "Loading data...";

    const apiKey = "J6K2Z61TYN6K7ZMV"; // API key from Alpha Vantage
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      // Check if data exists
      if (!data["Time Series (5min)"]) {
        output.textContent = "No data found for this symbol.";
        return;
      }

      // Get the most recent data point
      const timeSeries = data["Time Series (5min)"];
      const latestTime = Object.keys(timeSeries)[0];
      const latestData = timeSeries[latestTime];

      // Show only key info
    output.textContent = `
    Stock: ${symbol}
    Time: ${latestTime}
    Open: ${latestData["1. open"]}
    High: ${latestData["2. high"]}
    Low: ${latestData["3. low"]}
    Close: ${latestData["4. close"]}
    Volume: ${latestData["5. volume"]}
      `;
    } catch (err) {
      output.textContent = "Error fetching data.";
      console.error(err);
    }
  });



   