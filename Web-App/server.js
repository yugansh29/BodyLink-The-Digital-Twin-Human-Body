const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
app.use(cors());

app.use(express.static("public"));
app.use(express.json());

const graphData = {
  sleep: [10, 90],
  heartRate: [0, 0, 0, 0, 0],
  oxygen: [0, 0, 0, 0, 0],
  stress: [10, 90],
  hydration: [10, 90],
  temperature: [0, 0, 0, 0, 0],
  ecg: [0, 0, 0, 0, 0],
};

app.post("/update-sleep", (req, res) => {
  graphData.sleep = req.body.data;
  res.status(200).send({
    message: "Sleep data updated successfully!",
    data: graphData.sleep,
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
