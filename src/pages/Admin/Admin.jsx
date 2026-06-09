import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import './Admin.css'
import Navbar from "../../Components/Navbar/Navbar";
export default function Admin() {
  return (
    <div className="">
    <Navbar/>
    <div className="admin-layout">
      <Sidebar className="navbar" />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
    </div>
  );
}