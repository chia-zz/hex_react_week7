import { Outlet, Link } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="container mt-3">
      <Outlet />
    </div>
  );
}

export default AdminLayout;
