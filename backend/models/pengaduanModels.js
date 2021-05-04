import mongoose from "mongoose";

const pengaduanSchema = mongoose.Schema(
  {
    siswa: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Siswa",
    },
    isi_laporan: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    lokasi: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Pengaduan = mongoose.model("Pengaduan", pengaduanSchema);

export default Pengaduan;
