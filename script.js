let collegeCount = 0;
let chart;
const collegeContainer = document.getElementById('collegeContainer');
const outputDiv = document.getElementById('output');

const colorSets = {
  earnings: ["#16a34a","#2563eb","#f59e0b","#8b5cf6","#10b981","#f97316"],
  cost: ["#dc2626","#b91c1c","#9333ea","#be185d","#ef4444","#f43f5e"]
};

const presets = {
  state: { cost: 25000, years: 4, salary: 65000, rate: 5 },
  private: { cost: 55000, years: 4, salary: 75000, rate: 5 },
  community: { cost: 18000, years: 4, salary: 62000, rate: 5 },
  mit: { cost: 70000, years: 4, salary: 95000, rate: 5 },
  harvard: { cost: 75000, years: 4, salary: 100000, rate: 5 }
};

// Initial colleges
addCollege();
addCollege();

// Event Listeners
document.getElementById('addCollegeBtn').addEventListener('click', addCollege);
document.getElementById('downloadChartBtn').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'college_roi_chart.png';
  link.href = chart.toBase64Image();
  link.click();
});
document.getElementById('downloadResultsBtn').addEventListener('click', () => {
  const blob = new Blob([outputDiv.innerText], { type: 'text/plain' });
  const link = document.createElement('a');
  link.download = 'college_roi_results.txt';
  link.href = URL.createObjectURL(blob);
  link.click();
});

document.getElementById('presetDropdown').addEventListener('change', e => {
  const preset = presets[e.target.value];
  if (!preset) return;
  if (collegeCount === 0) addCollege();
  const firstCol = document.getElementById(`college1`);
  firstCol.querySelector(`#cost1`).value = preset.cost;
  firstCol.querySelector(`#years1`).value = preset.years;
  firstCol.querySelector(`#salary1`).value = preset.salary;
  firstCol.querySelector(`#rate1`).value = preset.rate;

  firstCol.querySelector(`#costVal1`).textContent = preset.cost;
  firstCol.querySelector(`#yearsVal1`).textContent = preset.years;
  firstCol.querySelector(`#salaryVal1`).textContent = preset.salary;
  firstCol.querySelector(`#rateVal1`).textContent = preset.rate;

  calculate();
});

function addCollege() {
  collegeCount++;
  const colDiv = document.createElement('div');
  colDiv.className = 'college-input';
  colDiv.id = `college${collegeCount}`;
  colDiv.innerHTML = `
    <h3>College ${collegeCount}</h3>
    <button class="remove-btn" title="Remove College">×</button>
    <label>💰 Annual Cost ($)<span id="costVal${collegeCount}">25000</span></label>
    <input type="range" id="cost${collegeCount}" min="5000" max="100000" value="25000">
    <label>🏫 Years to Graduate <span id="yearsVal${collegeCount}">4</span></label>
    <input type="range" id="years${collegeCount}" min="1" max="8" value="4">
    <label>💵 Starting Salary ($)<span id="salaryVal${collegeCount}">65000</span></label>
    <input type="range" id="salary${collegeCount}" min="20000" max="200000" value="65000">
    <label>📉 Loan Interest Rate (%)<span id="rateVal${collegeCount}">5</span></label>
    <input type="range" id="rate${collegeCount}" min="0" max="20" value="5">
  `;
  collegeContainer.appendChild(colDiv);

  const removeBtn = colDiv.querySelector('.remove-btn');
  removeBtn.addEventListener('click', () => {
    collegeContainer.removeChild(colDiv);
    calculate();
  });

  const sliders = colDiv.querySelectorAll('input[type=range]');
  sliders.forEach(slider => slider.addEventListener('input', calculate));
  sliders.forEach(slider => slider.addEventListener('input', () => {
    document.getElementById(`costVal${collegeCount}`).textContent = document.getElementById(`cost${collegeCount}`).value;
    document.getElementById(`yearsVal${collegeCount}`).textContent = document.getElementById(`years${collegeCount}`).value;
    document.getElementById(`salaryVal${collegeCount}`).textContent = document.getElementById(`salary${collegeCount}`).value;
    document.getElementById(`rateVal${collegeCount}`).textContent = document.getElementById(`rate${collegeCount}`).value;
  }));

  calculate();
}

function calculate() {
  outputDiv.innerHTML = "";
  const data = [];
  const collegeElements = collegeContainer.querySelectorAll('.college-input');

  collegeElements.forEach((col, idx) => {
    const cost = Number(col.querySelector(`#cost${idx+1}`).value);
    const years = Number(col.querySelector(`#years${idx+1}`).value);
    const salary = Number(col.querySelector(`#salary${idx+1}`).value);
    const rate = Number(col.querySelector(`#rate${idx+1}`).value) / 100;

    const totalCost = cost * years;
    const annualLoan = totalCost * rate;
    const netIncome = salary - annualLoan;
    const breakEven = totalCost / netIncome;

    outputDiv.innerHTML += `
      <h4>College ${idx+1}</h4>
      Total Cost: $${totalCost.toLocaleString()}<br>
      Annual Loan Payment: $${annualLoan.toLocaleString()}<br>
      Net Annual Income: $${netIncome.toLocaleString()}<br>
      Break-even Time: <span style="color:${breakEven <= 5 ? 'green':'red'}">${breakEven.toFixed(1)} years</span><br><br>
    `;

    data.push({ totalCost, netIncome });
  });

  buildChart(data);
}

function buildChart(data) {
  const yearsArr = Array.from({length: 10}, (_, i) => i+1);
  const datasets = [];

  data.forEach((college, index) => {
    let totalEarned = 0;
    const earnings = [];
    const debt = [];
    for(let i=1;i<=10;i++){
      totalEarned += college.netIncome;
      earnings.push(totalEarned);
      debt.push(college.totalCost);
    }

    datasets.push({
      label: `College ${index+1} Earnings`,
      data: earnings,
      borderColor: colorSets.earnings[index % colorSets.earnings.length],
      backgroundColor: colorSets.earnings[index % colorSets.earnings.length]+'33',
      fill: true,
      tension: 0.3,
      borderWidth: 3
    });

    datasets.push({
      label: `College ${index+1} Cost`,
      data: debt,
      borderColor: colorSets.cost[index % colorSets.cost.length],
      backgroundColor: colorSets.cost[index % colorSets.cost.length]+'33',
      fill: true,
      tension: 0.3,
      borderWidth: 3
    });
  });

  if(chart) chart.destroy();

  chart = new Chart(document.getElementById('roiChart'), {
    type: 'line',
    data: { labels: yearsArr, datasets: datasets },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        tooltip: { mode: 'index', intersect: false }
      },
      interaction: { mode: 'nearest', axis: 'x', intersect: false },
      scales: {
        y: { beginAtZero: true, title: { display: true, text: 'Dollars ($)' } },
        x: { title: { display: true, text: 'Years' } }
      }
    }
  });
}

// Initial calculation
calculate();
