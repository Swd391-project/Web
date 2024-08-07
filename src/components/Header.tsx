"use client";
import { useAuth } from "@/context/authContext";
import useCourtGroup from "@/hook/useCourtGroup";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type CourtGroup = {
  id: number;
  name: string;
  // other properties if any
};



const Header = () => {
  const { user } = useAuth();
  const { courtGroups } = useCourtGroup();
  const userName = user?.fullName;
  const imageUrl = user?.userImage;
  const [selectedCourtGroupId, setSelectedCourtGroupId] = useState<number | null>(null);
  const router = useRouter();
  useEffect(() => {
    const storedCourtGroupId = sessionStorage.getItem("selectedCourtGroupId");
    if (storedCourtGroupId) {
      setSelectedCourtGroupId(parseInt(storedCourtGroupId, 10));
    }
  }, []);

  useEffect(() => {
    if (selectedCourtGroupId !== null) {
      sessionStorage.setItem("selectedCourtGroupId", selectedCourtGroupId.toString());
    }
    const event = new CustomEvent("courtGroupIdChange", { detail: selectedCourtGroupId });
    window.dispatchEvent(event);
  }, [selectedCourtGroupId]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value, 10);
    setSelectedCourtGroupId(selectedId);
  };

  const deleteCookie = (name: any) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/sign-in');
  };

  return (
    <div className="header">
      <header className="top-head container-fluid">
        <div className="nav-control">
          <div className="hamburger">
            <span className="line" />
            <span className="line" />
            <span className="line" />
          </div>
          <div className="left-header content-header__menu">
            <ul className="list-unstyled">
              {/* <li className="nav-link btn">
                <Link href="/process">
                  <i className="far fa-calendar-check" />{" "}
                  <span> Xem quá trình</span>
                </Link>
              </li>
              <li className="nav-link btn">
                <Link href="/add-process">
                  <i className="far fa-file-alt" /> <span> Tạo Quá Trình</span>
                </Link>
              </li> */}
              <li className="nav-link btn">
                <select
                  className="form-select"
                  value={selectedCourtGroupId !== null ? selectedCourtGroupId : ""}
                  onChange={handleSelectChange}
                >
                  {/* <option value="">Chọn cụm sân</option> */}
                  {courtGroups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </li>
            </ul>
          </div>
        </div>

        <div className="header-right">
          <div className="fullscreen notification_dropdown widget-5 mt-3">
            <div className="d-flex">
              <span className="text-lg">Welcome,</span>
              <span className="text-red-500 ml-2 text-lg"> {userName}</span>
            </div>
          </div>
          <div className="my-account-wrapper widget-7">
            <div className="account-wrapper">
              <div className="account-control">
                <a className="login header-profile" href="#" title="Sign in">
                  <div className="header-info"></div>
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="User profile picture"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <Image
                      src="/assets/images/avatar.jpg"
                      alt="Default avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                </a>
                <div className="account-dropdown-form dropdown-container">
                  <div className="form-content">
                    <Link href={`/staff/1`}>
                      <i className="far fa-user" />
                      <span className="ml-2">Hồ sơ</span>
                    </Link>
                    {/* <a href="/sign-in"> */}
                    <a onClick={handleLogout}>
                      <i className="fas fa-sign-in-alt" />
                      <span className="ml-2">Logout</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
