import React, { useState } from "react";
import axios from "axios";
import departmentList from "../data/departmentList.json";
import "../Style/RegisterAdminOnce.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const RegisterAdminOnce = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [dob, setDob] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const handleRegisterAdminOnceForm = async () => {
    if (!name) {
      return alert(`Invalid name!`);
    }
    if (!email) {
      return alert(`Invalid email!`);
    }
    if (!dob) {
      return alert(`Invalid dob!`);
    }
    if (!contactNumber) {
      return alert(`Invalid contactNumber!`);
    }
    if (!department) {
      return alert(`Invalid department!`);
    }

    const adminCredentails = {
      name,
      email,
      dob,
      contactNumber: Number(contactNumber),
      department,
    };

    try {
      const result1 = await axios({
        method: "Get",
        url: "/api/admin/data/totalAdmins",
      });

      if (result1.data.totalAdmins > 0) {
        return alert(
          `There are ${result1.data.totalAdmins} admin/s already exist.`
        );
      }

      await axios({
        method: "Post",
        url: "/api/admin/addAdmin",
        data: adminCredentails,
      });
      return alert(`Admin Regisered Successfully!`);
    } catch (err) {
      return alert("Error in register admin");
    }
  };

  return (
    <div className="container-fluid overflow-hidden vw-100 vh-100 d-flex justify-content-center align-items-center bigBanner">
      <div
        className="container overflow-auto bg-white rounded-lg shadow"
        style={{ maxHeight: "80vh" }}
      >
        <div className="sticky-top p-3 bg-white">
          <h4>Register Admin</h4>
          <div className="text-muted">
            Only if there is no admin you can register an admin.
          </div>
        </div>

        <form
          noValidate
          onSubmit={handleRegisterAdminOnceForm}
          className="mb-3"
        >
          <div className="row">
            <div className="col">
              <div className="overflow-auto p-3" style={{ maxHeight: "40vh" }}>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label for="exampleInputText1">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputText1"
                        aria-describedby="textHelp1"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label for="exampleInputEmail1">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp1"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleSelect1">Department</label>
                      <select
                        className="form-control"
                        id="exampleSelect1"
                        value={department}
                        onChange={(e) => {
                          setDepartment(e.target.value);
                        }}
                      >
                        <option>Select</option>
                        {departmentList &&
                          departmentList.map((_dept) => (
                            <option value={_dept.nameAbbr}>{_dept.name}</option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label for="exampleInputDate1">D.O.B.</label>
                      <input
                        type="date"
                        className="form-control"
                        id="exampleInputDate1"
                        aria-describedby="dateHelp1"
                        value={dob}
                        onChange={(e) => {
                          setDob(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label for="exampleInputText3">Contact Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputText3"
                        aria-describedby="textHelp3"
                        value={contactNumber}
                        onChange={(e) => {
                          setContactNumber(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row p-3">
                <div className="col">
                  <div className="mb-3">
                    <button type="submit" className="btn btn-info">
                      Register
                    </button>
                  </div>
                  <Link to={`/`}>Already have an admin account?</Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterAdminOnce;
