const { default: mongoose } = require("mongoose");

const dosenSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    matkul_diampu: {
      type: String,
      required: true,
    },
    alamat: {
      type: String,
      required: true,
    },
  },
  {
    collection: "dosen",
  }
);

module.exports = mongoose.model("Dosen", dosenSchema);
