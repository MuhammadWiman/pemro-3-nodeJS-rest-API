const host = "s77d0011.ala.dedicated.gcp.emqxcloud.com";
const port = "8083";

const urlMQTT = `ws://${host}:${port}/ws`;

const mqttConfig = {
  username: "/sidikdik12:sidikdik12",
  password: "wiman123",
  clientId: `wiman_${new Date().getTime().toString()}`,
  protocolId: "MQTT",
};

module.exports = {
  host,
  port,
  urlMQTT,
  mqttConfig,
};
