import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { adminLogin } from "../redux/action/adminAction";
import { facultyLogin } from "../redux/action/facultyAction";
import { studentLogin } from "../redux/action/studentAction";
import classnames from "classnames";

import "../Style/facultyStudentLogin.css";

const userRoles = ["admin", "faculty", "student"];

const AdminFacultyStudentLoginPags = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const [loginUserRole, setLoginUserRole] = useState("admin");
  const [loginUserRegNum, setLoginUserRegNum] = useState("");
  const [loginUserPassword, setLoginUserPassword] = useState("");
  const [loginUserIsLoading, setLoginUserIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const history = useHistory();

  useEffect(() => {
    if (store.admin.isAuthenticated) {
      history.push("/admin");
    }
  }, [store.admin.isAuthenticated, history]);

  useEffect(() => {
    if (store.faculty.isAuthenticated) {
      history.push("/faculty");
    }
  }, [store.faculty.isAuthenticated, history]);

  useEffect(() => {
    if (store.student.isAuthenticated) {
      history.push("/home");
    }
  }, [store.student.isAuthenticated, history]);

  useEffect(() => {
    if (store.error) {
      setErrors(store.error);
    }
  }, [store.error]);

  const loginUserFormHandler = (e) => {
    e.preventDefault();
    setLoginUserIsLoading(true);

    if (loginUserRole === "admin") {
      dispatch(
        adminLogin({
          registrationNumber: loginUserRegNum,
          password: loginUserPassword,
        })
      );
    } else if (loginUserRole === "faculty") {
      dispatch(
        facultyLogin({
          registrationNumber: loginUserRegNum,
          password: loginUserPassword,
        })
      );
    } else if (loginUserRole === "student") {
      dispatch(
        studentLogin({
          registrationNumber: loginUserRegNum,
          password: loginUserPassword,
        })
      );
    }
  };

  useEffect(() => {
    if (
      store.error ||
      store.admin.isAuthenticated ||
      store.faculty.isAuthenticated ||
      store.student.isAuthenticated
    ) {
      setLoginUserIsLoading(false);
    } else {
      setLoginUserIsLoading(true);
    }
  }, [
    store.error,
    store.admin.isAuthenticated,
    store.faculty.isAuthenticated,
    store.student.isAuthenticated,
  ]);

  return (
    <div
      className="container-fluid overflow-hidden vw-100 vh-100 p-2 d-flex align-items-center"
      id="trail"
    >
      <div className="row gx-5 justify-content-around">
        <div className="col-md-6">
          <div id="logo"></div>
        </div>
        <div className="col-md-4">
          <div className="row" style={{ maxHeight: "auto" }}>
            <div className="col">
              <div className="row">
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="col">
                    <div className="text-center">
                      <h3>Log in</h3>
                    </div>
                  </div>

                  <form
                    className="col mb-3"
                    noValidate
                    onSubmit={loginUserFormHandler}
                  >
                    <div className="row mb-3">
                      <label for="exampleSelect1" className="form-label">
                        Role
                      </label>
                      <select
                        onChange={(e) => setLoginUserRole(e.target.value)}
                        value={loginUserRole}
                        id="exampleSelect1"
                        className="form-control"
                      >
                        {userRoles &&
                          userRoles.map((role) => (
                            <option value={role}>{role.toUpperCase()}</option>
                          ))}
                      </select>
                    </div>
                    <div className="row mb-3">
                      <label for="exampleInputText1" className="form-label">
                        Registration Number
                      </label>
                      <input
                        onChange={(e) => setLoginUserRegNum(e.target.value)}
                        value={loginUserRegNum}
                        type="text"
                        className={classnames("form-control", {
                          "is-invalid": errors.registrationNumber,
                        })}
                        id="exampleInputText1"
                        aria-describedby="loginUserRegNumHelp"
                      />
                      <small
                        id="loginUserRegNumHelp"
                        class="form-text text-muted"
                      >
                        {errors.registrationNumber && (
                          <div className="invalid-feedback">
                            {errors.registrationNumber}
                          </div>
                        )}
                      </small>
                    </div>
                    <div className="row mb-3">
                      <label for="exampleInputPassword1" className="form-label">
                        Password
                      </label>
                      <input
                        onChange={(e) => setLoginUserPassword(e.target.value)}
                        value={loginUserPassword}
                        type="password"
                        className={classnames("form-control", {
                          "is-invalid": errors.password,
                        })}
                        id="exampleInputPassword1"
                        aria-describedby="loginUserPasswordHelp"
                      />
                      <small
                        id="loginUserPasswordHelp"
                        class="form-text text-muted"
                      >
                        {errors.password && (
                          <div className="invalid-feedback">
                            {errors.password}
                          </div>
                        )}
                      </small>
                    </div>
                    <div className="row mb-3 justify-content-center">
                      <div className="col-md-1">
                        {loginUserIsLoading && (
                          <div
                            className="spinner-border text-primary"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row mb-3">
                      {!loginUserIsLoading && (
                        <button
                          type="submit"
                          className="btn btn-info btn-block"
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  </form>

                  {loginUserRole && loginUserRole !== "admin" && (
                    <div className="col">
                      <div className="text-center">
                        <Link to={`/forgotPassword/${loginUserRole}`}>
                          Forgot Password
                        </Link>
                      </div>
                    </div>
                  )}

                  {loginUserRole && loginUserRole === "admin" && (
                    <div className="col">
                      <div className="text-center">
                        <Link to={`/registerAdmin`}>Register Admin</Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFacultyStudentLoginPags;
