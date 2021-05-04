import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminDetails, updateAdminLevel } from "../../action/PetugasActions";
import Navbar from "../../component/Navbar/Index";
import { Link } from "react-router-dom";

export default function DetailPetugas({ match, history }) {
  const idPetugas = match.params.id;

  const [level, setLevel] = useState();
  const dispatch = useDispatch();

  const adminDetails = useSelector((state) => state.adminDetails);
  const { admins } = adminDetails;

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  useEffect(() => {
    if (adminInfo) {
      dispatch(getAdminDetails(idPetugas));
    } else {
      history.push("/admin/login");
    }
  }, [adminInfo, history, dispatch, idPetugas]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateAdminLevel({
        id: idPetugas,
        level,
      })
    );
    history.push("/petugas/data");
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2> Data Masyarakat </h2>
        <ul class="list-group list-group-flush detailMasyarakat ">
          <Link to="/petugas/data" className="createAccount">
            Kembali
          </Link>
          <li class="list-group-item">
            ID : <b>{admins._id}</b>
          </li>
          <li class="list-group-item">
            NIP : <b>{admins.nip}</b>
          </li>
          <li class="list-group-item">
            EMAIL : <b>{admins.email}</b>
          </li>
          <li class="list-group-item">
            NAME : <b>{admins.name}</b>
          </li>
          <li class="list-group-item">
            USERNAME : <b>{admins.username}</b>
          </li>
          <li class="list-group-item">
            TELEPHONE : <b>{admins.tlpn}</b>
          </li>
          <li class="list-group-item">
            TGL PEMBUATAN : <b>{admins.createdAt}</b>
          </li>
        </ul>
      </div>
    </div>
  );
}
