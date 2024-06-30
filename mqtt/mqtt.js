const host = "103.167.112.188";
const port = "15675";

const urlMQTT = `ws://${host}:${port}/ws`;

const mqttConfig = {
  username: "/iot:kelas_edp",
  password: "kelas_edp",
  clientId: `wiman_${new Date().getTime().toString()}`,
  protocolId: "MQTT",
};

module.exports = {
  host,
  port,
  urlMQTT,
  mqttConfig,
};
