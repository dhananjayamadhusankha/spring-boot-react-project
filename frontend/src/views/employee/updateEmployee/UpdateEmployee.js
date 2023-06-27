import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await axios.get("/employees");
      setUsers(response.data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const deleteUser = async (id) => {
    await axios.delete(`/employee/${id}`);
    loadUsers();
  };

  const deleteUsersWithSwal = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteUser(id);
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Mobile",
      selector: "phone",
      sortable: true,
    },
    {
      name: "Nationality",
      selector: "nationality",
      sortable: true,
    },
    {
      name: "Address",
      selector: "address",
      sortable: true,
    },
    {
      name: "NIC",
      selector: "nic",
      sortable: true,
    },
    {
      name: "Age",
      selector: "age",
      sortable: true,
    },
    {
      name: "Birthday",
      selector: "birthday",
      sortable: true,
    },
    {
      name: "Gender",
      selector: "gender",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Link
            to={`/users/updateData/UpdateField/${row.id}`}
            className="mx-1 text-warning text-decoration-none fw-bold"
          >
            Edit
          </Link>
          <button
            className="mx-1 text-danger bg-transparent border-0 text-decoration-underline fw-bold"
            onClick={() => deleteUsersWithSwal(row.id)}
          >
            Delete
          </button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <CRow>
      <CCol xs={12} className="mt-5">
        <CCard className="mb-4 container">
          <CCardHeader>
            <h2 className="fw-bold">Update Users</h2>
          </CCardHeader>
          <CCardBody className="py-5 table-responsive">
            <div className="mb-5">
              <input
                className="float-end"
                type="text"
                placeholder="Search Name"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <DataTable
              className="table"
              columns={columns}
              data={filteredUsers}
              pagination={true}
              highlightOnHover={true}
              striped={true}
              dense={true}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default UsersTable;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import DataTable from "react-data-table-component";
// import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
// import { Link } from "react-router-dom";
// import { CModal, CModalBody, CModalFooter, CModalHeader } from "@coreui/react";

// const UsersTable = () => {
//   const [users, setUsers] = useState([]);
//   const [searchText, setSearchText] = useState("");

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   const loadUsers = async () => {
//     try {
//       const response = await axios.get("/employees");
//       setUsers(response.data);
//     } catch (error) {
//       console.error("Error loading users:", error);
//     }
//   };

//   const [deleteUserId, setDeleteUserId] = useState(null);
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false);

//   const deleteUser = (id) => {
//     setDeleteUserId(id);
//     setShowConfirmationModal(true);
//   };

//   const confirmDeleteUser = async () => {
//     try {
//       await axios.delete(`/employee/${deleteUserId}`);
//       loadUsers();
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//     setShowConfirmationModal(false);
//     setDeleteUserId(null); // Reset deleteUserId after deletion
//   };

//   const filteredUsers =
//     users &&
//     users.filter((user) =>
//       user.name.toLowerCase().includes(searchText.toLowerCase())
//     );

//   const columns = [
//     {
//       name: "Id",
//       selector: "id",
//       sortable: true,
//     },
//     {
//       name: "Name",
//       selector: "name",
//       sortable: true,
//     },
//     {
//       name: "Mobile",
//       selector: "phone",
//       sortable: true,
//     },
//     {
//       name: "Nationality",
//       selector: "nationality",
//       sortable: true,
//     },
//     {
//       name: "Address",
//       selector: "address",
//       sortable: true,
//     },
//     {
//       name: "NIC",
//       selector: "nic",
//       sortable: true,
//     },
//     {
//       name: "Age",
//       selector: "age",
//       sortable: true,
//     },
//     {
//       name: "Birthday",
//       selector: "birthday",
//       sortable: true,
//     },
//     {
//       name: "Gender",
//       selector: "gender",
//       sortable: true,
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <>
//           <Link
//             to={`/users/updateData/UpdateField/${row.id}`}
//             className="mx-1 text-warning text-decoration-none fw-bold"
//           >
//             Edit
//           </Link>
//           <button
//             className="mx-1 text-danger bg-transparent border-0 text-decoration-underline fw-bold"
//             onClick={() => deleteUser(row.id)}
//           >
//             Delete
//           </button>
//         </>
//       ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//       button: true,
//     },
//   ];

//   return (
//     <CRow>
//       <CCol xs={12} className="mt-5">
//         <CCard className="mb-4 container">
//           <CCardHeader>
//             <h2 className="fw-bold">Update Users</h2>
//           </CCardHeader>
//           <CCardBody className="py-5 table-responsive">
//             <div className="mb-5">
//               <input
//                 className="float-end"
//                 type="text"
//                 placeholder="Search Name"
//                 value={searchText}
//                 onChange={(e) => setSearchText(e.target.value)}
//               />
//             </div>
//             <DataTable
//               className="table"
//               columns={columns}
//               data={filteredUsers}
//               pagination={true}
//               highlightOnHover={true}
//               striped={true}
//               dense={true}
//             />
//           </CCardBody>
//         </CCard>
//         <CModal
//           show={showConfirmationModal}
//           onClose={() => setShowConfirmationModal(false)}
//         >
//           <CModalHeader closeButton>Confirm Deletion</CModalHeader>
//           <CModalBody>Are you sure you want to delete this user?</CModalBody>
//           <CModalFooter>
//             <button
//               className="btn btn-secondary"
//               onClick={() => setShowConfirmationModal(false)}
//             >
//               Cancel
//             </button>
//             <button className="btn btn-danger" onClick={confirmDeleteUser}>
//               Delete
//             </button>
//           </CModalFooter>
//         </CModal>
//       </CCol>
//     </CRow>
//   );
// };

// export default UsersTable;
