import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerAdmin } from "../../action/PetugasActions.js";

export default function Register() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [nip, setNip] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [tlpn, setTlpn] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [response, setResponse] = useState({});

  const adminRegister = useSelector((state) => state.adminRegister);
  const { adminInfo } = adminRegister;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/statistik");
    } else {
      if (adminInfo) {
        history.push("/admin/home");
      } else {
        history.push("/admin/register");
      }
    }
  }, [history, userInfo, adminInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerAdmin(nip, email, username, name, tlpn, password));
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4 bodyRegister pb-3">
          <h2 className="headerRegister">Register</h2>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <input
                value={nip}
                onChange={(e) => setNip(e.target.value)}
                type="text"
                className="form-control"
                placeholder="NIP"
                required
              />
            </div>
            <div className="form-group">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Email"
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
                  <Link className=" ml-2 createAccount" to="/admin/Login">
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
