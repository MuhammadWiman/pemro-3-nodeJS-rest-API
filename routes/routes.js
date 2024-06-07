const express = require("express");
const Mahasiswa = require("../models/Mahasiswa");
const router = express.Router();

router.get("/getMahasiswa", async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.find();
    res.json(mahasiswa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/mahasiswa", async (req, res) => {
  try {
    const mahasiswa = new Mahasiswa({
      nama: req.body.nama,
      npm: req.body.npm,
      prodi: req.body.prodi,
    });
    const addMahasiswa = await mahasiswa.save();
    res.json({
      pesan: "Input Data Berhasil",
      data: addMahasiswa,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const editMahasiswa = await Mahasiswa.findByIdAndUpdate(id, body);
    const getId = await Mahasiswa.findById(id);

    res.json({
      message: "Berhasil update data",
      data: getId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteMahasiswa = await Mahasiswa.findByIdAndDelete(id);

    res.json({
      message: "Data Berhasil di hapus",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
