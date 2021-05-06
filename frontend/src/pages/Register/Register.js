import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../action/MasyarakatActions";

export default function Register() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [nisn, setNisn] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [tlpn, setTlpn] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState({});

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo } = userRegister;

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  useEffect(() => {
    if (adminInfo) {
      history.push("/admin/home");
    } else {
      if (userInfo) {
        history.push("/statistik");
      } else {
        history.push("register");
      }
    }
  }, [history, userInfo, adminInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(nisn, username, name, tlpn, password));
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4 bodyRegister pb-3">
          <h2 className="headerRegister">Register</h2>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <input
                value={nisn}
                onChange={(e) => setNisn(e.target.value)}
                type="string"
                className="form-control"
                placeholder="NISN"
                required
              />
            </div>
            <div className="form-group">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Username"
                required
              />
            </div>
            <div className="form-group">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Name"
                required
              />
            </div>
            <div className="form-group">
              <input
                value={tlpn}
                onChange={(e) => setTlpn(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Telephone"
                required
              />
            </div>
            <div className="form-group">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                placeholder="Password"
                required
              />
            </div>
            <div className="footer">
              <button class="btn btn-primary btn-lg btn-block" type="submit">
                Register
              </button>
              <br />
              <div>
                <p className="text-light">
                  Back to login
                  <Link className=" ml-2 createAccount" to="/Login">
                    click here
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
