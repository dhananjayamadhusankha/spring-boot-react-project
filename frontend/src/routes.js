import React from "react";
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
// Users
const AddEmployee = React.lazy(() =>
  import("./views/employee/addEmployee/AddEmployee")
);
const UpdateEmployee = React.lazy(() =>
  import("./views/employee/updateEmployee/UpdateEmployee")
);
const ViewEmployee = React.lazy(() =>
  import("./views/employee/viewEmployee/ViewEmployee")
);
const UpdateField = React.lazy(() =>
  import("./views/employee/updateFields/UpdateFields")
);

const routes = [
  { path: "dashboard", name: "Dashboard", element: Dashboard },
  { path: "/users", name: " Manage Users", element: ViewEmployee, exact: true },
  { path: "/users/add", name: "Add Users", element: AddEmployee },
  { path: "/users/update", name: "Update Users", element: UpdateEmployee },
  { path: "/users/view", name: "View Users", element: ViewEmployee },
  {
    path: "/users/updateData/UpdateField/:id",
    name: "Edit User",
    element: UpdateField,
  },
];

export default routes;
