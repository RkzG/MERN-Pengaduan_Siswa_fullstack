import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Register from "../Register/Index";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../action/PetugasActions";

export default function Login({ history, location }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { loading, error, adminInfo } = adminLogin;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/statistik");
    } else {
      if (adminInfo) {
        history.push("/admin/home");
      } else {
        history.push("/admin/login");
      }
    }
  }, [history, userInfo, adminInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <div className="container">
      <button className="btn btnBack btn-danger">
        <Link className="back text-light" to="/">
          Back
        </Link>
      </button>
      <div className="row justify-content-center">
        <div className="col-md-4 bodyLogin">
          <h2 className="headerLogin">Login</h2>
          <form onSubmit={submitHandler}>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                placeholder="Password"
                required
              />
            </div>
            <div className="footer">
              <div className="submit">
                <button class="btn btn-primary btn-lg btn-block" type="submit">
                  Login
                </button>
              </div>
              <br />
              <p className="text-light">
                have an account?
                <Link className=" ml-2 createAccount" to="/admin/register">
                  click here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
