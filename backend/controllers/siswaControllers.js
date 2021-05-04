import asyncHandler from "express-async-handler";
import generateToken from "../utils/generatorToken.js";
import Siswa from "../models/siswaModels.js";

//@desc Auth siswa && get Token
//@route POST /api/siswa/login
//@access Public
const authSiswa = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await Siswa.findOne({ username });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});

//@desc Register siswa baru
//@route post /api/siswa
//@access Public
const registerSiswa = asyncHandler(async (req, res) => {
  const { nisn, email, tlpn, name, username, password } = req.body;

  const userExist = await Siswa.findOne({ username });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }
  const user = await Siswa.create({
    nisn,
    email,
    name,
    username,
    tlpn,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      username: user.username,
      tlpn: user.tlpn,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc User Profile
//@route GET /api/siswa/:id/Profile
//@access Private
const getSiswaProfile = asyncHandler(async (req, res) => {
  const user = await Siswa.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@desc User
//@route GET /api/siswa/
//@access Private
const getAllSiswa = asyncHandler(async (req, res) => {
  const user = await Siswa.find();
  if (user) {
    res.json(user);
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@desc Update User
//@route PUT /api/siswa/:id
//@access Private
const updateSiswaProfile = asyncHandler(async (req, res) => {
  const user = await Siswa.findById(req.params.id);
  if (user) {
    user.nisn = req.body.nisn || user.nisn;
    user.email = req.body.email || user.email;
    user.name = req.body.name || user.name;
    user.username = req.body.username || user.username;
    user.tlpn = req.body.tlpn || user.tlpn;
    user.password = req.body.password || user.password;

    const updateUser = await user.save();
    res.json({
      _id: updateUser._id,
      email: updateUser.email,
      name: updateUser.name,
      username: updateUser.username,
      password: updateUser.password,
    });
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});

//@desc DELETE user
//@route DELETE /api/user/:id
//@access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await Siswa.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User Removed" });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

export {
  authSiswa,
  registerSiswa,
  getSiswaProfile,
  getAllSiswa,
  updateSiswaProfile,
  deleteUser,
};
