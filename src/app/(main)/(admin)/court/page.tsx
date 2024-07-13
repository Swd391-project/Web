"use client"
import BreadScrum from '@/components/BreadScrum'
import CourtClient from '@/components/Table/CourtTable/CourtClient'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <>
            <div id="main-wrapper" className="show">
                <div className="content-body">
                    <div className="warper container-fluid">
                        <BreadScrum
                            title="Danh Sách Các Sân"
                            subRouteTitle="court"
                            subTitle1="Danh Sách các Sân"
                        />
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-header fix-card">
                                        <div className="row">
                                            <div className="col-8">
                                                <h4 className="card-title">Danh Sách Sân</h4>
                                            </div>

                                            <div className="col-4 float-end">
                                                <Link
                                                    href="/add-court"
                                                    className="btn btn-primary float-end"
                                                >
                                                    Thêm Sân Mới
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="container">
                                        <CourtClient />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default page