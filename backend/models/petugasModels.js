import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const petugasSchema = mongoose.Schema(
  {
    nip: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    tlpn: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

petugasSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

petugasSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Petugas = mongoose.model("Petugas", petugasSchema);

export default Petugas;
