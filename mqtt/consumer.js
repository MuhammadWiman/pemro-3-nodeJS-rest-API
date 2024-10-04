const mqtt = require("mqtt");
const moment = require("moment");

const { mqttConfig, urlMQTT } = require("../mqtt/mqtt");
const mqttClient = mqtt.connect(urlMQTT, mqttConfig);

let sensorData = null; // Module-scoped variable to store sensor data

mqttClient.on("connect", () => {
  console.log("Connected to MQTT broker");
  mqttClient.subscribe("data/sensor", (err) => {
    if (err) {
      console.error("Subscription error:", err);
    }
  });
});

mqttClient.on("message", (topic, message) => {
  // Mendapatkan waktu sekarang sesuai dengan zona waktu tertentu
  const now = moment().format("YYYY-MM-DDTHH:mm:ssZ");
  const messageContent = message.toString();
  console.log("Received message:", messageContent);

  const [serial_number, data_sensor] = messageContent.split("#");

  sensorData = {
    serial_number,
    data_sensor,
    time_stamp: now.toString(),
  };
});

function getSensorData() {
  return sensorData;
}

module.exports = {
  getSensorData,
};
