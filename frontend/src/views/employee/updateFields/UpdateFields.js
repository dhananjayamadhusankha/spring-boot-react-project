import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AddUser() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    phone: "",
    nationality: "",
    address: "",
    nic: "",
  });

  const [error, setError] = useState({
    name: "",
    phone: "",
    nationality: "",
    address: "",
    nic: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const { name, phone, nationality, address, nic } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      try {
        await axios.put(`/employee/${id}`, user);
        setSuccessMessage("Employee updated successfully!"); // Show success message
        setTimeout(() => {
          navigate("/users/update"); // Navigate to user details page after 1 seconds
        }, 1000);
      } catch (error) {
        console.error("Error adding employee:", error);
      }
    }
  };

  const validateFields = () => {
    let isValid = true;
    let nameError = "";
    let phoneError = "";
    let nationalityError = "";
    let addressError = "";
    let nicError = "";

    // phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      isValid = false;
      phoneError = "Please Enter a Valid phone Number";
    }

    // Name validation
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    if (!nameRegex.test(name)) {
      isValid = false;
      nameError = "Please Enter a Valid Name";
    }

    //Nationality validation
    if (nationality.length === 0) {
      isValid = false;
      nationalityError = "Please Enter Nationality";
    }

    //Address validation
    if (address.length === 0) {
      isValid = false;
      addressError = "Please Enter Address";
    }

    // NIC validation
    const nicRegex = /^([0-9]{9}[v|V]|[0-9]{12})$/;
    if (!nicRegex.test(nic)) {
      isValid = false;
      nicError = "Please Enter a Valid NIC Number";
    }

    setError({
      phone: phoneError,
      nic: nicError,
      name: nameError,
      nationality: nationalityError,
      address: addressError,
    });
    return isValid;
  };

  const loadUser = async () => {
    const result = await axios.get(`/employee/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className=" col-md-6 offset-md-3 border rounded p-4 shadow">
          <h2 className="text-center m-4 fw-bold">Update User Details</h2>
          <form onSubmit={(e) => onSubmit(e)}>
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
                value={name}
                onChange={(e) => onInputChange(e)}
                required
              />
              <label htmlFor="floatingInput">Employee Name</label>
              {error.name && (
                <div className="text-danger fw-semibold ">{error.name}</div>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                id="floatingInput"
                name="address"
                type="text"
                className="form-control"
                placeholder="Address"
                value={address}
                onChange={(e) => onInputChange(e)}
                required
              />
              <label htmlFor="floatingInput">Address</label>
              {error.address && (
                <div className="text-danger fw-semibold ">{error.address}</div>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                id="floatingInput"
                name="nationality"
                type="text"
                className="form-control"
                placeholder="Address"
                value={nationality}
                onChange={(e) => onInputChange(e)}
                required
              />
              <label htmlFor="floatingInput">Nationality</label>
              {error.nationality && (
                <div className="text-danger fw-semibold ">
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
                value={nic}
                onChange={(e) => onInputChange(e)}
                required
              />
              <label htmlFor="floatingInput">NIC</label>
              {error.nic && (
                <div className="text-danger fw-semibold ">{error.nic}</div>
              )}
            </div>

            <div className="form-floating mb-5">
              <input
                id="floatingInput"
                name="phone"
                type="text"
                className="form-control"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => onInputChange(e)}
                required
              />
              <label htmlFor="floatingInput">Phone Number</label>
              {error.phone && (
                <div className="text-danger fw-semibold ">{error.phone}</div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-outline-success px-4 fw-bold mx-2"
            >
              Update
            </button>
            <Link
              to={"/users/update"}
              className="btn btn-outline-danger fw-bold"
            >
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
