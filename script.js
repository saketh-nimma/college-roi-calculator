function preset(cost, years, salary) {
  document.getElementById("cost").value = cost;
  document.getElementById("years").value = years;
  document.getElementById("salary").value = salary;
}

let chart;

function calculate() {
  const cost = Number(document.getElementById("cost").value);
  const years = Number(document.getElementById("years").value);
  const salary = Number(document.getElementById("salary").value);
  const rate = Number(document.getElementById("rate").value) / 100;

  const totalCost = cost * years;
  const annualLoan = totalCost * rate;
  const netIncome = salary - annualLoan;
  const breakEven = totalCost / netIncome;

  document.getElementById("output").innerHTML = `
    Total Cost: $${totalCost.toLocaleString()}<br>
    Annual Loan Payment: $${annualLoan.toLocaleString()}<br>
    Net Annual Income: $${netIncome.toLocaleString()}<br>
    Break-even Time: ${breakEven.toFixed(1)} years
  `;

  buildChart(totalCost, netIncome);
}

function buildChart(cost, income) {
  const years = [];
  const earnings = [];
  const debt = [];

  let totalEarned = 0;

  for (let i = 1; i <= 10; i++) {
    years.push(i);
    totalEarned += income;
    earnings.push(totalEarned);
    debt.push(cost);
  }

  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("roiChart"), {
    type: "line",
    data: {
      labels: years,
      datasets: [
        {
          label: "Cumulative Earnings",
          data: earnings,
          borderWidth: 2
        },
        {
          label: "College Cost",
          data: debt,
          borderWidth: 2
        }
      ]
    }
  });
}
