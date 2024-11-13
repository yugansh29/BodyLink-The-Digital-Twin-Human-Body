const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
app.use(cors());

app.use(express.static("public"));
app.use(express.json());

const graphData = {
  sleep: [1, 1],
  heartRate: [],
  oxygen: [],
  stress: [10, 90],
  hydration: [10, 90],
  temperature: [],
  calories: [],
  ecg: [],
};

app.post("/update-sleep", (req, res) => {
  if (graphData.sleep.length >= 2) {
    graphData.sleep.shift();
  }
  graphData.sleep.push(req.body.data);
  res.status(200).send({
    message: "Sleep data updated successfully!",
    data: graphData.sleep,
  });
});

app.post("/update-calories", (req, res) => {
  if (graphData.calories.length >= 5) {
    graphData.calories.shift();
  }
  graphData.calories.push(req.body.data);
  res.status(200).send({
    message: "Calories data updated successfully!",
    data: graphData.calories,
  });
});

app.post("/update-heart-rate", (req, res) => {
  if (graphData.heartRate.length >= 5) {
    graphData.heartRate.shift();
  }
  graphData.heartRate.push(req.body.data);
  res.status(200).send({
    message: "Heart rate data updated successfully!",
    data: graphData.heartRate,
  });
});

app.post("/update-oxygen", (req, res) => {
  if (graphData.oxygen.length >= 5) {
    graphData.oxygen.shift();
  }
  graphData.oxygen.push(req.body.data);
  res.status(200).send({
    message: "Oxygen data updated successfully!",
    data: graphData.oxygen,
  });
});

app.post("/update-temperature", (req, res) => {
  if (graphData.temperature.length >= 5) {
    graphData.temperature.shift();
  }
  graphData.temperature.push(req.body.data);
  res.status(200).send({
    message: "Temperature data updated successfully!",
    data: graphData.temperature,
  });
});

app.post("/update-ecg", (req, res) => {
  if (graphData.ecg.length >= 5) {
    graphData.ecg.shift();
  }
  graphData.ecg.push(req.body.data);
  res.status(200).send({
    message: "ECG data updated successfully!",
    data: graphData.ecg,
  });
});

app.post("/update-stress", (req, res) => {
  if (graphData.stress.length >= 2) {
    graphData.stress.shift();
  }
  graphData.stress.push(req.body.data);
  res.status(200).send({
    message: "Stress data updated successfully!",
    data: graphData.stress,
  });
});

app.post("/update-hydration", (req, res) => {
  if (graphData.hydration.length >= 2) {
    graphData.hydration.shift();
  }
  graphData.hydration.push(req.body.data);
  res.status(200).send({
    message: "Hydration data updated successfully!",
    data: graphData.hydration,
  });
});
app.get("/get-graph-data", (req, res) => {
  res.json(graphData);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
