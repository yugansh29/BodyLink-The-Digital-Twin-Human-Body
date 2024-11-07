document.addEventListener("DOMContentLoaded", async function () {
  var chartsConfig = await createChartsConfig();

  Object.keys(chartsConfig).forEach(async function (chartID) {
    var ctx = document.getElementById(chartID).getContext("2d");
    new Chart(ctx, {
      type: chartsConfig[chartID].type,
      data: await chartsConfig[chartID].data,
      options: Object.assign(
        {},
        chartsConfig[chartID].type === "pie"
          ? pieChartOptions()
          : defaultOptions(),
        { responsive: true, maintainAspectRatio: false }
      ),
    });
  });
});

async function createChartsConfig() {
  return {
    chart1: { type: "line", data: await ecgChartData() },
    chart2: { type: "line", data: await heartChartData() },
    chart3: { type: "pie", data: await sleepChartData() },
    chart4: { type: "pie", data: await stressChartData() },
    chart6: { type: "bar", data: await caloriesChartData() },
    chart7: { type: "line", data: await oxygenChartData() },
    chart8: { type: "pie", data: await hydrationChartData() },
    chart9: { type: "bar", data: await tempChartData() },
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

async function ecgChartData() {
  const data = await fetchData();
  if (!data) {
    return {
      labels: ["0s", "1s", "2s", "3s", "4s"],
      datasets: [
        {
          label: "Electrocardiogram",
          data: [0, 0, 0, 0, 0],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
  }
  return {
    labels: ["0s", "1s", "2s", "3s", "4s"],
    datasets: [
      {
        label: "Electrocardiogram",
        data: data.ecg,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
}

async function heartChartData() {
  const data = await fetchData();
  if (!data) {
    return {
      labels: ["00:00", "06:00", "12:00", "18:00", "24:00"],
      datasets: [
        {
          label: "Heart Rate",
          data: [0, 0, 0, 0, 0],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
  }
  return {
    labels: ["00:00", "06:00", "12:00", "18:00", "24:00"],
    datasets: [
      {
        label: "Heart Rate",
        data: data.heartRate,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
}

async function oxygenChartData() {
  const data = await fetchData();
  if (!data) {
    return {
      labels: ["Morning", "Noon", "Afternoon", "Evening", "Night"],
      datasets: [
        {
          label: "Blood Oxygen",
          data: [0, 0, 0, 0, 0],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
  }
  return {
    labels: ["Morning", "Noon", "Afternoon", "Evening", "Night"],
    datasets: [
      {
        label: "Blood Oxygen",
        data: data.oxygen,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
}

async function sleepChartData() {
  const data = await fetchData();
  if (!data) {
    return {
      labels: ["Bad Sleep", "Good Sleep"],
      datasets: [
        {
          label: "Sleep Quality",
          data: [0, 0],
          backgroundColor: ["rgb(75, 192, 192, 0.2)", "rgb(75, 192, 192)"],
        },
      ],
    };
  }
  return {
    labels: ["Bad Sleep", "Good Sleep"],
    datasets: [
      {
        label: "Sleep Quality",
        data: data.sleep,
        backgroundColor: ["rgb(75, 192, 192, 0.2)", "rgb(75, 192, 192)"],
      },
    ],
  };
}

async function stressChartData() {
  const data = await fetchData();
  if (!data) {
    return {
      labels: ["Anxious", "Relaxed"],
      datasets: [
        {
          label: "Stress Level",
          data: [0, 0],
          backgroundColor: ["rgb(75, 192, 192, 0.2)", "rgb(75, 192, 192)"],
        },
      ],
    };
  }
  return {
    labels: ["Anxious", "Relaxed"],
    datasets: [
      {
        label: "Stress Level",
        data: data.stress,
        backgroundColor: ["rgb(75, 192, 192, 0.2)", "rgb(75, 192, 192)"],
      },
    ],
  };
}

async function hydrationChartData() {
  const data = await fetchData();
  if (!data) {
    return {
      labels: ["Low Hydration", "Healthy Hydration"],
      datasets: [
        {
          label: "Hydration Level",
          data: [0, 0],
          backgroundColor: ["rgb(75, 192, 192, 0.2)", "rgb(75, 192, 192)"],
        },
      ],
    };
  }
  return {
    labels: ["Low Hydration", "Healthy Hydration"],
    datasets: [
      {
        label: "Hydration Level",
        data: data.hydration,
        backgroundColor: ["rgb(75, 192, 192, 0.2)", "rgb(75, 192, 192)"],
      },
    ],
  };
}

async function caloriesChartData() {
  const data = await fetchData();
  if (!data) {
    return {
      labels: ["Q1", "Q2", "Q3", "Q4", "Q5"],
      datasets: [
        {
          label: "Calories Burned",
          data: [0, 0, 0, 0],
          backgroundColor: "rgb(75, 192, 192)",
        },
      ],
    };
  }
  return {
    labels: ["Q1", "Q2", "Q3", "Q4", "Q5"],
    datasets: [
      {
        label: "Calories Burned",
        data: data.calories,
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };
}

async function tempChartData() {
  const data = await fetchData();
  if (!data) {
    return {
      labels: ["00:00", "06:00", "12:00", "18:00", "24:00"],
      datasets: [
        {
          label: "Body Temperature",
          data: [0, 0, 0, 0, 0],
          backgroundColor: "rgb(75, 192, 192)",
        },
      ],
    };
  }
  return {
    labels: ["00:00", "06:00", "12:00", "18:00", "24:00"],
    datasets: [
      {
        label: "Body Temperature",
        data: data.temperature,
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };
}

// function ecgChartData() {
//   return {
//     labels: ["0s", "1s", "2s", "3s", "4s"],
//     datasets: [
//       {
//         label: "Electrocardiogram",
//         data: [65, 59, 80, 81],
//         fill: false,
//         borderColor: "rgb(75, 192, 192)",
//         tension: 0.1,
//       },
//     ],
//   };
// }
// function heartChartData() {
//   return {
//     labels: ["00:00", "06:00", "12:00", "18:00", "24:00"],
//     datasets: [
//       {
//         label: "Heart Rate",
//         data: [65, 59, 80, 81],
//         fill: false,
//         borderColor: "rgb(75, 192, 192)",
//         tension: 0.1,
//       },
//     ],
//   };
// }
// function oxygenChartData() {
//   return {
//     labels: ["Morning", "Noon", "Afternoon", "Evening", "Night"],
//     datasets: [
//       {
//         label: "Blood Oxygen",
//         data: [65, 59, 80, 81],
//         fill: false,
//         borderColor: "rgb(75, 192, 192)",
//         tension: 0.1,
//       },
//     ],
//   };
// }

// async function sleepChartData() {
//   try {
//     const response = await fetch("http://localhost:3000/get-graph-data");
//     const graphData = await response.json();
//     return {
//       labels: ["Bad Sleep", "Good Sleep"],
//       datasets: [
//         {
//           label: "Sleep Quality",
//           data: graphData.sleep,
//           backgroundColor: ["rgb(75, 192, 192, 0.2)", "rgb(75, 192, 192)"],
//         },
//       ],
//     };
//   } catch (error) {
//     console.error("Failed to fetch sleep data:", error);
//     return {
//       labels: ["Bad Sleep", "Good Sleep"],
//       datasets: [
//         {
//           label: "Sleep Quality",
//           data: [0, 0],
//           backgroundColor: ["rgb(75, 192, 192, 0.2)", "rgb(75, 192, 192)"],
//         },
//       ],
//     };
//   }
// }
// async function stressChartData() {
//   try {
//     const response = await fetch("http://localhost:3000/get-graph-data");
//     const graphData = await response.json();
//     return {
//       labels: ["Anxious", "Relaxed"],
//       datasets: [
//         {
//           label: "Stress Level",
//           data: graphData.stress,
//           backgroundColor: ["rgb(75, 192, 192, 0.2)", "rgb(75, 192, 192)"],
//         },
//       ],
//     };
//   } catch (error) {
//     console.error("Failed to fetch sleep data:", error);
//     return {
//       labels: ["Anxious", "Relaxed"],
//       datasets: [
//         {
//           label: "Stress Level",
//           data: [0, 0],
//           backgroundColor: ["rgb(75, 192, 192, 0.2)", "rgb(75, 192, 192)"],
//         },
//       ],
//     };
//   }
// }
// async function hydrationChartData() {
//   try {
//     const response = await fetch("http://localhost:3000/get-graph-data");
//     const graphData = await response.json();
//     return {
//       labels: ["Low Hydration", "Healthy Hydration"],
//       datasets: [
//         {
//           label: "Hydration Level",
//           data: graphData.hydration,
//           backgroundColor: ["rgb(75, 192, 192, 0.2)", "rgb(75, 192, 192)"],
//         },
//       ],
//     };
//   } catch (error) {
//     console.error("Failed to fetch Hydration data:", error);
//     return {
//       labels: ["Low Hydration", "Healthy Hydration"],
//       datasets: [
//         {
//           label: "Hydration Level",
//           data: [0, 0],
//           backgroundColor: ["rgb(75, 192, 192, 0.2)", "rgb(75, 192, 192)"],
//         },
//       ],
//     };
//   }
// }

// function barChartData() {
//   return {
//     labels: ["Q1", "Q2", "Q3", "Q4"],
//     datasets: [
//       {
//         label: "Calories Burned",
//         data: [20, 30, 40, 50],
//         backgroundColor: "rgb(75, 192, 192)",
//       },
//     ],
//   };
// }
// function tempChartData() {
//   return {
//     labels: ["00:00", "06:00", "12:00", "18:00", "24:00"],
//     datasets: [
//       {
//         label: "Body Temperature",
//         data: [65, 59, 80, 81],
//         backgroundColor: "rgb(75, 192, 192)",
//       },
//     ],
//   };
// }
//rgb(255, 99, 132)
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
