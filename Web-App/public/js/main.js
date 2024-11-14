if (document.body.clientWidth < 1920) {
  document.body.style.transform = "scale(0.8)";
  const header = document.querySelector(".header img");
  const toggle = document.querySelector(".toggle-button");
  const sidebar = document.querySelector(".sidebar");
  header.style.top = "-7%";
  header.style.right = "-7%";
  toggle.style.top = "-7%";
  toggle.style.left = "-7%";
  sidebar.style.top = "-5%";
  sidebar.style.left = "-20%";
}
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".toggle-button");
  const sidebar = document.querySelector(".sidebar");
  const wrapper = document.querySelector(".wrapper");
  toggleButton.addEventListener("click", function () {
    if (document.body.clientWidth < 1920) {
      if (sidebar.style.left === "-7.6%") {
        sidebar.style.left = "-20%";
        wrapper.style.marginLeft = "0";
        wrapper.style.transition = "margin-left 0.5s ease, width 0.3s ease";
      } else {
        sidebar.style.left = "-7.6%";
        wrapper.style.marginLeft = "7.6%";
        wrapper.style.transition = "margin-left 0.5s ease, width 0.3s ease";
      }
    } else {
      if (sidebar.style.left === "0vw") {
        sidebar.style.left = "-5vw";
        wrapper.style.marginLeft = "0";
        wrapper.style.transition = "margin-left 0.5s ease, width 0.3s ease";
      } else {
        sidebar.style.left = "0vw";
        wrapper.style.marginLeft = "5vw";
        wrapper.style.transition = "margin-left 0.5s ease, width 0.3s ease";
      }
    }
  });
});

let charts = {};
document.addEventListener("DOMContentLoaded", async function () {
  const chartsConfig = await createChartsConfig();
  Object.keys(chartsConfig).forEach(function (chartID) {
    const ctx = document.getElementById(chartID).getContext("2d");
    charts[chartID] = new Chart(ctx, {
      type: chartsConfig[chartID].type,
      data: chartsConfig[chartID].data,
      options: Object.assign(
        {},
        chartsConfig[chartID].type === "pie"
          ? pieChartOptions()
          : defaultOptions(),
        {
          responsive: true,
          maintainAspectRatio: false,
        }
      ),
    });
  });
  setInterval(updateCharts, 5000);
});

async function updateCharts() {
  const newData = await fetchData();
  Object.keys(charts).forEach(async (chartID) => {
    const chart = charts[chartID];
    switch (chartID) {
      case "chart1":
        updateChartData(chart, await ecgChartData(newData));
        break;
      case "chart2":
        updateChartData(chart, await heartChartData(newData));
        break;
      case "chart3":
        updateChartData(chart, await sleepChartData(newData));
        break;
      case "chart4":
        updateChartData(chart, await stressChartData(newData));
        break;
      case "chart6":
        updateChartData(chart, await caloriesChartData(newData));
        break;
      case "chart7":
        updateChartData(chart, await oxygenChartData(newData));
        break;
      case "chart8":
        updateChartData(chart, await hydrationChartData(newData));
        break;
      case "chart9":
        updateChartData(chart, await tempChartData(newData));
        break;
    }
  });
}

function updateChartData(chart, newData) {
  chart.data.labels = newData.labels;
  chart.data.datasets.forEach((dataset, i) => {
    dataset.data = newData.datasets[i].data;
  });
  chart.update();
}

async function createChartsConfig() {
  const data = await fetchData();
  return {
    chart1: { type: "line", data: await ecgChartData(data) },
    chart2: { type: "line", data: await heartChartData(data) },
    chart3: { type: "pie", data: await sleepChartData(data) },
    chart4: { type: "pie", data: await stressChartData(data) },
    chart6: { type: "bar", data: await caloriesChartData(data) },
    chart7: { type: "line", data: await oxygenChartData(data) },
    chart8: { type: "pie", data: await hydrationChartData(data) },
    chart9: { type: "bar", data: await tempChartData(data) },
  };
}

async function fetchData() {
  const apiEndpoint = "http://localhost:3000/get-graph-data";
  try {
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null;
  }
}

async function ecgChartData(data) {
  return {
    labels: ["0s", "1s", "2s", "3s", "4s"],
    datasets: [
      {
        label: "Electrocardiogram",
        data: data.ecg,
        fill: false,
        borderColor: "rgb(29 56 85)",
        tension: 0.1,
      },
    ],
  };
}

async function heartChartData(data) {
  return {
    labels: ["00:00", "06:00", "12:00", "18:00", "24:00"],
    datasets: [
      {
        label: "Heart Rate",
        data: data.heartRate,
        fill: false,
        borderColor: "rgb(29 56 85)",
        tension: 0.1,
      },
    ],
  };
}
async function oxygenChartData(data) {
  return {
    labels: ["Morning", "Noon", "Afternoon", "Evening", "Night"],
    datasets: [
      {
        label: "Blood Oxygen",
        data: data.oxygen,
        fill: false,
        borderColor: "rgb(29 56 85)",
        tension: 0.1,
      },
    ],
  };
}

async function sleepChartData(data) {
  return {
    labels: ["Bad Sleep", "Good Sleep"],
    datasets: [
      {
        label: "Sleep Quality",
        data: data.sleep,
        backgroundColor: ["rgb(29 56 85, 0.2)", "rgb(29 56 85)"],
      },
    ],
  };
}

async function stressChartData(data) {
  return {
    labels: ["Anxious", "Relaxed"],
    datasets: [
      {
        label: "Stress Level",
        data: data.stress,
        backgroundColor: ["rgb(29 56 85, 0.2)", "rgb(29 56 85)"],
      },
    ],
  };
}

async function hydrationChartData(data) {
  return {
    labels: ["Low Hydration", "Healthy Hydration"],
    datasets: [
      {
        label: "Hydration Level",
        data: data.hydration,
        backgroundColor: ["rgb(29 56 85, 0.2)", "rgb(29 56 85)"],
      },
    ],
  };
}

async function caloriesChartData(data) {
  return {
    labels: ["Q1", "Q2", "Q3", "Q4", "Q5"],
    datasets: [
      {
        label: "Calories Burned",
        data: data.calories,
        backgroundColor: "rgb(29 56 85)",
      },
    ],
  };
}

async function tempChartData(data) {
  return {
    labels: ["00:00", "06:00", "12:00", "18:00", "24:00"],
    datasets: [
      {
        label: "Body Temperature",
        data: data.temperature,
        backgroundColor: "rgb(29 56 85)",
      },
    ],
  };
}

function defaultOptions() {
  return {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
}

function pieChartOptions() {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
}
