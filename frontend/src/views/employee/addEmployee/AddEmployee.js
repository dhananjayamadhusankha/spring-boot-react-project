import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AddEmployee() {
  const [user, setUser] = useState({
    name: "",
    address: "",
    nationality: "",
    nic: "",
    phone: "",
  });

  const [error, setError] = useState({
    name: "",
    address: "",
    nationality: "",
    nic: "",
    phone: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const { name, address, nationality, nic, phone } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      try {
        await axios.post("/employee", user);
        setSuccessMessage("Employee added successfully!");
        setTimeout(() => {
          window.location.href = "/users/view";
        }, 1000);
      } catch (error) {
        console.error("Error adding employee:", error);
      }
    }
  };

  const validateFields = () => {
    let isValid = true;
    let errors = {
      name: "",
      address: "",
      nationality: "",
      nic: "",
      phone: "",
    };

    // Name validation
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    if (!nameRegex.test(name)) {
      isValid = false;
      errors.name = "Please enter a valid name";
    }

    // Address validation
    if (address.trim().length === 0) {
      isValid = false;
      errors.address = "Please enter an address";
    }

    // Nationality validation
    if (nationality.trim().length === 0) {
      isValid = false;
      errors.nationality = "Please enter nationality";
    }

    // NIC validation
    if (nic.trim().length === 0) {
      isValid = false;
      errors.nic = "Please enter a NIC number";
    }

    // Phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      isValid = false;
      errors.phone = "Please enter a valid phone number";
    }

    // NIC validation
    const nicRegex = /^([0-9]{9}[v|V]|[0-9]{12})$/;
    if (!nicRegex.test(nic)) {
      isValid = false;
      errors.nic = "Please Enter a Valid NIC Number";
    }

    setError(errors);
    return isValid;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 shadow">
          <h2 className="text-center m-4 fw-bold">Add User Details</h2>
          <form onSubmit={onSubmit} method="post">
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}
            <div className="form-floating mb-3">
              <input
                id="floatingInput"
                name="name"
                type="text"
                className="form-control"
                placeholder="Employee Name"
                onChange={onInputChange}
                required
              />
              <label htmlFor="floatingInput">Employee Name</label>
              {error.name && (
                <div className="text-danger fw-semibold">{error.name}</div>
              )}
            </div>
            <div className="form-floating mb-3">
              <input
                id="floatingInput"
                name="address"
                type="text"
                className="form-control"
                placeholder="Address"
                onChange={onInputChange}
                required
              />
              <label htmlFor="floatingInput">Address</label>
              {error.address && (
                <div className="text-danger fw-semibold">{error.address}</div>
              )}
            </div>
            <div className="form-floating mb-3">
              <input
                id="floatingInput"
                name="nationality"
                type="text"
                className="form-control"
                placeholder="Nationality"
                onChange={onInputChange}
                required
              />
              <label htmlFor="floatingInput">Nationality</label>
              {error.nationality && (
                <div className="text-danger fw-semibold">
                  {error.nationality}
                </div>
              )}
            </div>
            <div className="form-floating mb-3">
              <input
                id="floatingInput"
                name="nic"
                type="text"
                className="form-control"
                placeholder="NIC"
                onChange={onInputChange}
                required
              />
              <label htmlFor="floatingInput">NIC</label>
              {error.nic && (
                <div className="text-danger fw-semibold">{error.nic}</div>
              )}
            </div>
            <div className="form-floating mb-5">
              <input
                id="floatingInput"
                name="phone"
                type="text"
                className="form-control"
                placeholder="Phone Number"
                onChange={onInputChange}
                required
              />
              <label htmlFor="floatingInput">Phone Number</label>
              {error.phone && (
                <div className="text-danger fw-semibold">{error.phone}</div>
              )}
            </div>
            <button type="submit" className="btn btn-dark mb-4">
              Add Employee
            </button>
            &nbsp;&nbsp;
            <Link to={"/"} className="btn btn-outline-dark mb-4 mr-4">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
