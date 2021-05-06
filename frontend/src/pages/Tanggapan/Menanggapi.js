import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPengaduanDetailsAdmin,
  statusTanggapan,
  addTanggapan,
} from "../../action/TanggapanActions";
import Navbar from "../../component/Navbar/Index";

export default function ({ match, history }) {
  const pengaduanId = match.params.id;

  const [status, setStatus] = useState("");
  const [tanggapan, setTanggapan] = useState("");

  const dispatch = useDispatch();
  const pengaduanDetailsAdmin = useSelector(
    (state) => state.pengaduanDetailsAdmin
  );
  const { loading, error, pengaduans } = pengaduanDetailsAdmin;

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  useEffect(() => {
    if (adminInfo) {
      dispatch(getPengaduanDetailsAdmin(pengaduanId));
    } else {
      history.push("/admin/login");
    }
  }, [adminInfo, dispatch, history, pengaduanId]);

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(
      statusTanggapan({
        _id: pengaduanId,
        status,
      })
    );
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addTanggapan({
        _id: pengaduanId,
        tanggapan,
        pengaduan: pengaduanId,
      })
    );
    history.push("/admin/menanggapi");
  };

  return (
    <div>
      <Navbar />
      <div className="container formPengaduan">
        <h2>Response</h2>
        <div className="row">
          <div className="card text-white bg-glass shadow mt-4 mb-3 bodyPengaduan2 col-6 offset-3">
            <div className="card-body ml-5">
              <img
                src={pengaduans.image}
                alt=""
                width="200"
                height="200"
                className="imgPengaduan"
              />
              <form className="pengaduanForm" onSubmit={updateHandler}>
                <div className="row">
                  <div className="col-12">
                    <label>Proses</label>
                    <input
                      className="Proses ml-2"
                      type="radio"
                      label="Dalam Proses"
                      id="status"
                      name="status"
                      value="Proses"
                      onChange={(e) => setStatus(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <label>Selesai</label>
                    <input
                      className="Sukses ml-2"
                      type="radio"
                      label="Selesai"
                      id="status"
                      name="status"
                      value="Selesai"
                      onChange={(e) => setStatus(e.target.value)}
                    ></input>
                  </div>
                </div>

                <button type="submit" className="btn btn-info">
                  Kirim Status
                </button>
              </form>
              <form className="pengaduanForm" onSubmit={submitHandler}>
                <div className="row">
                  <div className="col-12">
                    <textarea
                      className="form-control text-light isiLaporan bg-glass border-2 "
                      placeholder="Beri Tanggapan"
                      value={tanggapan}
                      onChange={(e) => setTanggapan(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {/* <div className="row deskripsiMenanggapi">
              <div className="card text-white bg-glass shadow mt-4 mb-3 bodyPengaduan2 col-6 offset-3 ">
                <div className="card-body">
                  <form className="pengaduanForm" onSubmit={submitHandler}>
                    <div className="row">
                      <div className="col-12">
                        <textarea
                          className="form-control text-light isiLaporan bg-glass border-2 "
                          placeholder="Beri Tanggapan"
                          value={tanggapan}
                          onChange={(e) => setTanggapan(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                  <br />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
