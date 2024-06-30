const { default: mongoose } = require("mongoose");

const sensorSchema = new mongoose.Schema(
  {
    serial_number: {
      type: String,
      required: true,
    },
    data_sensor: {
      type: String,
      required: true,
    },
    time_stamp: {
      type: Date,
      required: true,
    },
  },
  {
    collection: "sensor",
  }
);

module.exports = mongoose.model("Sensor", sensorSchema);
