import React, { useState } from "react";
import Navbar from "../../component/Navbar/Index";
import Table from "../../component/Table";

export default function User() {
  const datas = [
    {
      nik: "089178431",
      username: "FrankyWahyu28",
      name: "FrankyWahyu",
      tlpn: "081231392722",
      action: "",
    },
  ];

  const gantiStatus = (id, status) => {
    if (status) console.log("id :" + id + " Diterima");
    else console.log("id :" + id + " Ditolak");
  };

  const renderButton = (ids) => {
    return (
      <div className="d-flex">
        <button
          onClick={() => gantiStatus(ids, true)}
          className="btn btn-success"
        >
          Accept
        </button>
        <button
          onClick={() => gantiStatus(ids, false)}
          className="btn btn-danger"
        >
          Decline
        </button>
      </div>
    );
  };

  const column = [
    {
      heading: "Nik",
      value: (v) => v.nik,
    },
    {
      heading: "Username",
      value: (v) => v.username,
    },

    {
      heading: "Name",
      value: (v) => v.name,
    },
    {
      heading: "Telephone",
      value: (v) => v.tlpn,
    },
    {
      heading: "Action",
      value: (v) => renderButton(v.id),
    },
  ];
  return (
    <div>
      <Navbar />
      <div className="container tabelLaporan">
        <h2>User Data</h2>
        <div className="row card shadow-lg table-light text-dark px-5 py-3">
          <Table
            column={column}
            data={datas}
            className="overflow-auto table-sm"
          />
        </div>
      </div>
    </div>
  );
}
