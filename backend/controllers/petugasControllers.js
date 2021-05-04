import asyncHandler from "express-async-handler";
import generateToken from "../utils/generatorToken.js";
import Petugas from "../models/petugasModels.js";

//@desc Auth Admin && get Token
//@route POST /api/petugas/login
//@access Public
const authPetugas = asyncHandler(async (req, res) => {
  //inisialisasi
  const { username, password } = req.body;
  //mencari username di database petugas
  const admin = await Petugas.findOne({ username });
  //jika username ada dan password nya sama maka token akan di generate
  if (admin && (await admin.matchPassword(password))) {
    res.json({
      message: `Selamat datang petugas`,
      _id: admin._id,
      name: admin.name,
      username: admin.username,
      token: generateToken(admin._id),
    });
    //jika data ada yang salah maka terjadi error
  } else {
    res.status(401);
    throw new Error("Invalid username and password");
  }
});

//@desc Register petugas baru
//@route post /api/petugas
//@access Public
const registerPetugas = asyncHandler(async (req, res) => {
  const { nip, email, name, username, password, tlpn } = req.body;

  //Jika di database petugas ada username yang sama maka terjadi error
  const adminExist = await Petugas.findOne({ username });
  if (adminExist) {
    res.status(400);
    throw new Error("User already exist");
  }
  //Jika username belum ada di database maka database Petugas akan membuat data baru
  const admin = await Petugas.create({
    nip,
    email,
    name,
    username,
    password,
    tlpn,
  });
  //jika registrasi berhasil maka akan tampil data json nya
  if (admin) {
    res.status(201).json({
      _id: admin._id,
      nip: admin.nip,
      email: admin.email,
      name: admin.name,
      username: admin.username,
      password: admin.password,
      tlpn: admin.tlpn,
      token: generateToken(admin._id),
    });

    //jika gagal akan ada respon Invalid admin data
  } else {
    res.status(400);
    throw new Error("Invalid admin data");
  }
});

//@desc Petugas Profile
//@route GET /api/petugas/Profile
//@access Private/prtugas
const getPetugasProfile = asyncHandler(async (req, res) => {
  //mencari id dari petugas
  const admin = await Petugas.findById(req.params.id);
  //jika id admin ada maka akan tampil data json nya
  if (admin) {
    res.json(admin);
    //jika tidak maka akan ada respon admin not found
  } else {
    res.status(400);
    throw new Error("Admin not found");
  }
});

//@desc Update Admin
//@route PUT /api/petugas/:id
//@access Private
const updatePetugasProfile = asyncHandler(async (req, res) => {
  //mencari id petugas di database
  const admin = await Petugas.findById(req.params.id);
  //jika ada maka profile petugas dapat di update
  if (admin) {
    admin.nip = req.body.nip || admin.nip;
    admin.email = req.body.email || admin.email;
    admin.name = req.body.name || admin.name;
    admin.username = req.body.username || admin.username;
    admin.tlpn = req.body.tlpn || admin.tlpn;
    admin.password = req.body.password || admin.password;

    //menyimpan perubahan pada data
    const updateAdmin = await admin.save();
    res.json({
      _id: updateAdmin._id,
      nip: updateAdmin.nip,
      email: updateAdmin.email,
      name: updateAdmin.name,
      username: updateAdmin.username,
      tlpn: updateAdmin.tlpn,
      password: updateAdmin.password,
    });

    //jika id tidak ada di database maka akan ada respon admin not found
  } else {
    res.status(401);
    throw new Error("Admin not found");
  }
});

//@desc All Admin
//@route GET /api/petugas/
//@access Private
const getAllPetugas = asyncHandler(async (req, res) => {
  //mengambil data dari database petugas
  const admin = await Petugas.find();
  //jika ada data maka akan tampil data json nya
  if (admin) {
    res.json(admin);
    //jika tidak ada data maka akan ada respon Admin not found
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});

//@desc DELETE Petugas
//@route DELETE /api/petugas/:id
//@access Private/Admin
const deleteAdmin = asyncHandler(async (req, res) => {
  //mencari id petugas di database Petugas
  const Admin = await Petugas.findById(req.params.id);

  //jika ada maka data petugas berdasarkan id yang dipilih akan dihapus
  if (Admin) {
    await Admin.remove();
    res.json({ message: "Admin Removed" });

    //jika id tidak ada maka akan ada respon admin not found
  } else {
    res.status(404);
    throw new Error("Admin not Found");
  }
});
//export module
export {
  registerPetugas,
  authPetugas,
  updatePetugasProfile,
  getPetugasProfile,
  getAllPetugas,
  deleteAdmin,
};
