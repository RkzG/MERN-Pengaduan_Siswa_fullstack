import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Homescreen({ history }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  useEffect(() => {
    if (adminInfo) {
      history.push("/admin/home");
    } else {
      if (userInfo) {
        history.push("/statistik");
      } else {
        history.push("/");
      }
    }
  }, [history, userInfo, adminInfo]);

  return (
    <body className="homescreen">
      <div className="container ">
        <div className="content">
          <div className="card text-white bg-glass shadow mb-3 bodyPengaduan col-6 offset-2">
            <div className="card-body ml-5">
              <h1 className="ml-4">Hello...</h1>
              <div className="userLogin">
                <h2>Login As User</h2>
                <button className="btn btn-info">
                  <Link className="text-light" to="/login">
                    User
                  </Link>
                </button>
              </div>
              <div className="adminLogin">
                <h2>Login As Admin</h2>
                <button className="btn btn-info">
                  <Link className="text-light" to="/admin/login">
                    Admin
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}
