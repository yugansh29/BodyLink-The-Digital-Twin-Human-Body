# Body_Link-The-Digital-Twin-Human-Body
The purpose of this study is to develop a digital twin of the human body that utilizes basic sensors to visualize the status of various organs in real-time. The research aims to address the problem of providing a continuous, non-invasive, and cost-effective method for monitoring the health status of individuals.

# Digital Twin of Human Body
## Running the Web Application

To start the web application:

1. Navigate into the `Web-App` directory:
   ```bash
   cd Web-App
2. Install Dependencies
   ```bash
   npm install
4. run
   ```bash
   node server.js
   
## System Architecture and Design

The system architecture is designed to integrate multiple components into a cohesive platform that enables real-time monitoring and simulation of the human body’s health status. It consists of three main layers:

- **Wearable Device Layer**: Collects real-time physiological data from the user using a variety of sensors (ECG, PPG, temperature, pulse oximeter, bioimpedance sensors).
- **Data Processing Layer**: Handles data acquisition, preprocessing, feature extraction, and machine learning-based predictions.
- **Digital Twin Platform Layer**: Stores, processes, and analyzes data to simulate the health status of the user in real-time. The platform features a health monitoring dashboard and an alert system, pushing analyzed results to the relevant stakeholders.

### Key Technologies:
- **Data Transmission Protocol**: MQTT (Message Queuing Telemetry Transport)
- **Cloud Service**: Vultr Cloud Service for data storage and processing
- **Machine Learning Models**: Used for health anomaly detection and predictions
- **Connectivity**: WiFi and Bluetooth connectivity modules

### Data Flow:
1. Wearable device sensors collect data (ECG, heart rate, temperature, etc.).
2. Data is sent via MQTT over WiFi/Bluetooth to the Cloud.
3. Vultr Cloud Service processes the data, applying machine learning models for real-time analysis.
4. Results are sent back to the user's application or dashboard, and alerts are generated when anomalies are detected.

---

## Explanation of Key Components and Modules

### Wearable Device Components:
- **ECG Sensor**: Measures the electrical activity of the heart.
- **PPG Sensor**: Provides insights into the heart rate and blood oxygen levels.
- **Temperature Sensor**: Monitors body temperature.
- **Pulse Oximeter**: Tracks blood oxygen saturation levels.
- **Bioimpedance Sensor**: Assesses body hydration and other bioimpedance-related factors.
- **Microcontroller (ESP32)**: Manages sensor data and controls communication protocols.
- **Connectivity Module (WiFi/Bluetooth)**: Transfers collected sensor data to the cloud for analysis via MQTT.

### Data Processing Layer:
- **Data Acquisition**: Captures the raw data from the sensors.
- **Preprocessing**: Normalizes and cleanses the data.
- **Feature Extraction**: Extracts key features like heart rate, temperature, and blood oxygen saturation.
- **Machine Learning Module**: Predicts potential health issues based on historical and real-time data.
- **Digital Twin Simulation**: Simulates the real-time state of the body based on the input from the wearable device.

### Digital Twin Platform:
- **Database**: Stores both historical and real-time data collected from the wearable.
- **Real-Time Analytics Engine**: Provides live analysis of the incoming data stream.
- **Health Monitoring Dashboard**: Visualizes the body’s health status.
- **Alert System**: Sends notifications in case of anomalies detected by the system.

---

## API Documentation

### Data Ingestion API
- **Endpoint**: `/data/ingest`
- **Method**: `POST`
- **Description**: This API is used to send sensor data from the wearable device to the Vultr Cloud for analysis.

#### Request Parameters:
- `ecg_data` (Float): ECG sensor reading.
- `ppg_data` (Float): PPG sensor reading.
- `temperature_data` (Float): Body temperature reading.
- `spo2_data` (Float): Blood oxygen level reading.
- `bioimpedance_data` (Float): Hydration level and other bioimpedance factors.

#### Response:
- `status`: Success or failure message.
- `alert`: Returns true if the system detects any anomalies.

### Analytics API
- **Endpoint**: `/data/analyze`
- **Method**: `GET`
- **Description**: Fetches the analyzed results based on real-time or historical data for visualization on the dashboard.

#### Response:
- `heart_rate`: Calculated heart rate.
- `spo2`: Oxygen saturation level.
- `hydration`: Current hydration level.
- `temperature`: Body temperature.

### Alert Notification API
- **Endpoint**: `/alert/send`
- **Method**: `POST`
- **Description**: Sends an alert to the user's app if an anomaly is detected by the machine learning models.

#### Request Parameters:
- `user_id`: Unique user identifier.
- `alert_type`: Type of alert (e.g., “Cardiac Issue,” “Dehydration Alert”).

#### Response:
- `status`: Notification sent successfully or failure.

---

## Setup and Usage Instructions

### Pre-requisites:
- **ESP32 microcontroller** with WiFi/Bluetooth support
- Basic sensor modules (**ECG, PPG, temperature, pulse oximeter, bioimpedance**)
- Internet access for cloud communication via MQTT
- Access to the **Vultr Cloud Service**

### Setup:

1. **Wearable Device Configuration**:
   - Connect the sensors to the ESP32 microcontroller.
   - Set up WiFi/Bluetooth connectivity on the ESP32 using the appropriate libraries.
   - Program the ESP32 to collect sensor data and push it to the Vultr Cloud via MQTT.

2. **Cloud Integration**:
   - Create an account on Vultr and set up the necessary infrastructure for data storage and machine learning analytics.
   - Configure the MQTT broker to handle incoming sensor data and route it to the analytics engine.

3. **Data Processing**:
   - Deploy preprocessing scripts and machine learning models on Vultr to handle incoming data.
   - Set up triggers for anomaly detection and send alerts when predefined thresholds are crossed.

### Usage:

- **Real-Time Monitoring**:
  - Wear the device, and data will be automatically collected and sent to the cloud.
  - Use the monitoring dashboard to visualize real-time data and health trends.

- **Alerts**:
  - Receive alerts on your mobile device in case of anomalies such as abnormal heart rate or temperature.

- **Historical Data Analysis**:
  - Access the analytics engine to review historical data trends and predict potential health issues.

---


