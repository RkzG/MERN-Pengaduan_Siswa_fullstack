import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "../../component/Navbar/Index";
import { createPengaduan } from "../../action/PegaduanActions";
import moment from "moment";

export default function Pengaduan() {
  const history = useHistory();
  const [isi_laporan, setIsi_Laporan] = useState("");
  const [image, setImage] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState({});

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createPengaduan({
        isi_laporan,
        image,
        lokasi,
      })
    );
    history.push("/Laporan");
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container formPengaduan">
        <h2>Pengaduan Laporan</h2>
        <div className="row">
          <div className="card text-white bg-glass shadow mb-3 bodyPengaduan col-6 offset-3">
            <div className="card-body">
              <form className="pengaduanForm" onSubmit={submitHandler}>
                <div class="row">
                  <div class="col-12">
                    <textarea
                      id="isi_laporan"
                      value={isi_laporan}
                      onChange={(e) => setIsi_Laporan(e.target.value)}
                      rows="4"
                      className="form-control text-light isiLaporan bg-glass border-0"
                      placeholder="Isi Laporan"
                    ></textarea>
                  </div>
                  <div class="col-5 mt-3">
                    <textarea
                      id="lokasi"
                      value={lokasi}
                      onChange={(e) => setLokasi(e.target.value)}
                      rows="2"
                      className="form-control text-light isiLaporan bg-glass border-0"
                      placeholder="Lokasi"
                    ></textarea>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-10">
                    <label for="exampleFormControlFile1">Pilih Foto</label>
                    <input
                      id="image"
                      onChange={uploadFileHandler}
                      type="file"
                      accept="image/x-png,image/gif,image/jpeg"
                      class="form-control-file"
                      id="image-file"
                    />
                    {uploading}
                  </div>
                  <div>
                    <span
                      class="btn btn-info btnPengaduan"
                      onClick={submitHandler}
                    >
                      Submit
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
