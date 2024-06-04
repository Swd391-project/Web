'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from '../app/style.module.css';

const Sidebar = () => {
    const pathname = usePathname();
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
                    <li className="has-submenu">
                        <Link href="#" className="has-arrow mm-collapsed">
                            <i className="fas fa-user-md" />
                            <span className="nav-label">Nhân viên</span>
                        </Link>
                        <ul className="list-unstyled mm-collapse">

                            <li>
                                <Link href="/add-user">Thêm nhân viên</Link>
                            </li>

                            <li>
                                <Link href="/user">Tất cả nhân viên</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="has-submenu">
                        <Link href="#" className="has-arrow mm-collapsed">
                            <i className="fas fa-crow" />
                            <span className="nav-label">Chim</span>
                        </Link>
                        <ul className="list-unstyled mm-collapse">
                            <li>
                                <Link href="/add-bird">Thêm Chim</Link>
                            </li>
                            <li>
                                <Link href="/bird">Tất Cả Chim</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="has-submenu">
                        <Link href="#" className="has-arrow mm-collapsed">
                            <i className="fas fa-igloo" />
                            <span className="nav-label">Lồng chim</span>
                        </Link>
                        <ul className="list-unstyled mm-collapse">
                            <li>
                                <Link href="/add-cage">Thêm lồng</Link>
                            </li>
                            <li>
                                <Link href="/cage">Tất cả Lồng</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="has-submenu">
                        <Link href="/cage-diagram">
                            <i className="fas fa-heart" />
                            <span className="nav-label">Sơ đồ khu ghép giống</span>
                        </Link>
                    </li>

                    <li className="has-submenu">
                        <Link href="/cage-diagram-single">
                            <i className="fas fa-kiwi-bird" />
                            <span className="nav-label">Sơ đồ khu nuôi chim</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="sidebar-widgets"></div>
        </aside>
    );
};

export default Sidebar