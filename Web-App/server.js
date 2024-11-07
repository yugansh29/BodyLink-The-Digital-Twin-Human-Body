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
  oxygen: [0, 0, 0, 0, 0],
  stress: [10, 90],
  hydration: [10, 90],
  temperature: [0, 0, 0, 0, 0],
  calories: [0, 0, 0, 0, 0],
  ecg: [0, 0, 0, 0, 0],
};

app.post("/update-sleep", (req, res) => {
  graphData.sleep = req.body.data;
  res.status(200).send({
    message: "Sleep data updated successfully!",
    data: graphData.sleep,
  });
});

app.post("/update-calories", (req, res) => {
  graphData.calories = req.body.data;
  res.status(200).send({
    message: "Calories data updated successfully!",
    data: graphData.calories,
  });
});

app.post("/update-heart-rate", (req, res) => {
  // graphData.heartRate = req.body.data;
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
  graphData.oxygen = req.body.data;
  res.status(200).send({
    message: "Oxygen data updated successfully!",
    data: graphData.oxygen,
  });
});

app.post("/update-temperature", (req, res) => {
  graphData.temperature = req.body.data;
  res.status(200).send({
    message: "Temperature data updated successfully!",
    data: graphData.temperature,
  });
});

app.post("/update-ecg", (req, res) => {
  graphData.ecg = req.body.data;
  res.status(200).send({
    message: "ECG data updated successfully!",
    data: graphData.ecg,
  });
});

app.post("/update-stress", (req, res) => {
  graphData.stress = req.body.data;
  res.status(200).send({
    message: "Stress data updated successfully!",
    data: graphData.stress,
  });
});

app.post("/update-hydration", (req, res) => {
  graphData.hydration = req.body.data;
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
