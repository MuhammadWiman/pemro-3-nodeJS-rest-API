const express = require("express");
const Dosen = require("../models/Dosen");
const router_dosen = express.Router();

router_dosen.get("/dosen", async (req, res) => {
  try {
    const dosen = await Dosen.find();
    res.json(dosen);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router_dosen.post("/dosen", async (req, res) => {
  try {
    const dosen = new Dosen({
      nama: req.body.nama,
      matkul_diampu: req.body.matkul_diampu,
      alamat: req.body.alamat,
    });
    const addDosen = await dosen.save();
    res.json({
      pesan: "Input Data Berhasil",
      data: addDosen,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router_dosen.put("/dosen/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const editDosen = await Dosen.findByIdAndUpdate(id, body);
    const getId = await Dosen.findById(id);

    res.json({
      message: "Berhasil update data",
      data: getId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router_dosen.delete("/dosen/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteDosen = await Dosen.findByIdAndDelete(id);

    res.json({
      message: "Data Berhasil di hapus",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router_dosen;
