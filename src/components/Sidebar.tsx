"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../app/style.module.css";
import { useAuth } from "@/context/authContext";

const Sidebar = () => {
  const { user } = useAuth();
  // console.log(user)
  const pathname = usePathname();
  const isAdmin = user?.role === "Admin";
  const isManager = user?.role === "Manager";
  const isStaff = user?.role === "Staff";
  const isCustomer = user?.role === "Customer";
  return (
    <aside className={`left-panel nicescroll-box ${styles.leftPanel}`}>
      <nav className="navigation">
        <ul className="list-unstyled main-menu">
          <li className="has-submenu active">
            <Link href="/">
              <i className="fas fa-th-large" />
              <span className="nav-label">Dashboard</span>
            </Link>
          </li>
          {/* {isAdmin && (
            <li className="has-submenu">
              <Link href="#" className="has-arrow mm-collapsed">
                <i className="fas fa-user-md" />
                <span className="nav-label">Nhân viên</span>
              </Link>
              <li>
                <Link href="/add-user">Thêm nhân viên</Link>
              </li>

              <li>
                <Link href="/user">Tất cả nhân viên</Link>
              </li>
            </li>
          )} */}
          {isAdmin && (
            <li className="has-submenu">
              <Link href="/add-user">
                <i className="fas fa-user-plus" />
                <span className="nav-label">Thêm nhân viên</span>
              </Link>
            </li>
          )}
          {isAdmin && (
            <li className="has-submenu">
              <Link href="/user">
                <i className="fas fa-address-book" />
                <span className="nav-label">Tất cả nhân viên</span>
              </Link>
            </li>
          )}
          <li className="has-submenu">
            <Link href="/court-group">
              <i className="fas fa-building" />
              <span className="nav-label">Cụm sân</span>
            </Link>
          </li>
          <li className="has-submenu">
            <Link href="/court">
              <i className="fas fa-home" />
              <span className="nav-label">Sân</span>
            </Link>
          </li>
          <li className="has-submenu">
            <Link href="/booking-list">
              <i className="fas fa-list" />
              <span className="nav-label">Danh sách đặt sân</span>
            </Link>
          </li>
          <li className="has-submenu">
            <Link href="/booking">
              <i className="fas fa-calendar" />
              <span className="nav-label">Xem lịch trình</span>
            </Link>
          </li>
          <li className="has-submenu">
            <Link href="/add-booking">
              <i className="fas fa-play" />
              <span className="nav-label">Đặt sân</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="sidebar-widgets"></div>
    </aside>
  );
};

export default Sidebar;
