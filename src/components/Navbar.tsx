import Link from 'next/link';
import React from 'react'

const Navbar = () => {
    return (
        <div className="nav-header">
            <div className="brand-logo">
                <Link href="/">
                    {" "}
                    <img
                        className="logo-tabib"
                        src="/assets/images/badmintonBackground-removebg-preview.png"
                        alt=""
                    />
                </Link>
                <Link href="/">
                    <img
                        className="brand-title"
                        style={{ width: "100px", height: "60px" }}
                        src="/assets/images/PackageTitle.png"
                        alt=""
                    />
                </Link>
            </div>
        </div>
    );
};

export default Navbar