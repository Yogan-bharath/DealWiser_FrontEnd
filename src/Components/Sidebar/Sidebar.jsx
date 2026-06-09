import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
      >
        {"->"}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${open ? "active" : ""}`}>

        <div className="sidebar-top">

          <div className="logo-admin">
            <span>Admin Console</span>
          </div>

          <nav>

            <NavLink
              to="/admin/add-product"
              className="nav-item"
              onClick={() => setOpen(false)}
            >
              Add Product
            </NavLink>

            <NavLink
              to="/admin/products"
              className="nav-item"
              onClick={() => setOpen(false)}
            >
              Products
            </NavLink>

          </nav>

        </div>
      </div>
    </>
  );
}