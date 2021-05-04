import asyncHandler from "express-async-handler";
import Pengaduan from "../models/pengaduanModels.js";

//@desc Tambah pengaduan
//@route POST /api/order
//@access Private
const addPengaduan = asyncHandler(async (req, res) => {
  const { isi_laporan, image, lokasi, status } = req.body;
  const pengaduan = new Pengaduan({
    siswa: req.user._id,
    isi_laporan,
    image,
    lokasi,
    status: "Terkirim",
  });
  const report = await pengaduan.save();
  res.status(201).json(report);
});

//@desc Get All Report
//@route GET /api/pengaduan/dataPengaduan
//@access Private/Petugas
const getDataPengaduan = asyncHandler(async (req, res) => {
  //mencari data pengaduan di database pengaduan
  const allReport = await Pengaduan.find().populate("siswa", "id name");
  //jika data pengaduan ada maka akan tampil data json nya
  if (allReport) {
    res.json(allReport);
    //jika data pengaduan tidak ada maka akan ada respon data pengdauan not found
  } else {
    res.status(404);
    throw new Error("Data pengaduan not found");
  }
});

//@desc Validasi
//@route Update /api/pengaduan/:id/validasi
//@access PrivatePetugas
const validasiDataPengaduan = asyncHandler(async (req, res) => {
  //mencari data pengaduan berdasarkan ID di database pengaduan
  const validasi = await Pengaduan.findById(req.params.id);
  //jika data ada maka data bisa diupdate
  if (validasi) {
    validasi.status = req.body.status || validasi.status;
    //melakukan update data
    const updateValidasi = await validasi.save();
    //menampilkan data yang sudah diperbarui
    res.json(updateValidasi);
  } else {
    res.status(404);
    throw new Error("Data pengaduan not found");
  }
});

//@desc menampilkan all data sesuai user
//@route GET /api/pengaduan/
//@access private
const getPengaduanByUser = asyncHandler(async (req, res) => {
  const pengaduan = await Pengaduan.find({ siswa: req.user.id });

  if (pengaduan) {
    res.json(pengaduan);
  } else {
    res.status(404);
    throw new Error("Data pengaduan not found");
  }
});

//@desc DELETE user
//@route DELETE /api/user/:id
//@access Private/Admin
const deletePengaduan = asyncHandler(async (req, res) => {
  const report = await Pengaduan.findById(req.params.id);

  if (report) {
    await report.remove();
    res.json({ message: "Report removed" });
  } else {
    res.status(404);
    throw new Error("Report not found");
  }
});

export {
  addPengaduan,
  getDataPengaduan,
  getPengaduanByUser,
  validasiDataPengaduan,
  deletePengaduan,
};
