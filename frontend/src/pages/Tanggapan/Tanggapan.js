import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Navbar from "../../component/Navbar/Index";
import { useDispatch, useSelector } from "react-redux";
import {
  listPengaduan,
  deletePengaduanAdmin,
} from "../../action/TanggapanActions";

export default function Tanggapan() {
  const dispatch = useDispatch();
  const history = useHistory();

  const pengaduanList = useSelector((state) => state.pengaduanList);
  const { loading, error, tanggapans } = pengaduanList;

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const pengaduanDeleteAdmin = useSelector(
    (state) => state.pengaduanDeleteAdmin
  );

  useEffect(() => {
    if (adminInfo) {
      dispatch(listPengaduan());
    } else {
      history.push("/admin/login");
    }
  }, [dispatch, history, adminInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure")) {
      dispatch(deletePengaduanAdmin(id));
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className="container">
        <div className="row card shadow-lg table-light text-dark px-5 py-3 tableResponse">
          <table class="table table-striped ">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Reporters</th>
                <th scope="col">Status</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {tanggapans &&
                tanggapans
                  .filter(
                    (item) =>
                      item.status === "Terkirim" || item.status === "Proses"
                  )
                  .map((pengadu) => (
                    <tr key={pengadu._id}>
                      <td>{pengadu._id}</td>
                      <td>{pengadu.siswa && pengadu.siswa.name}</td>
                      <td>{pengadu.status}</td>
                      <td>{pengadu.isi_laporan}</td>
                      <td>
                        <Link to={`/admin/tanggapi/${pengadu._id}`}>
                          <button className="btn btn-success">Response</button>
                        </Link>
                        {pengadu.status === "Selesai" ? (
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteHandler(pengadu._id)}
                          >
                            Delete
                          </button>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
