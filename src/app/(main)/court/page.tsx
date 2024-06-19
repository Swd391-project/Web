"use client"
import BreadScrum from '@/components/BreadScrum'
import Calendar from '@/components/Calendar'
import UserClient from '@/components/Table/UserTable/UserClient'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <>
            <div id="main-wrapper" className="show">
                <div className="content-body">
                    <div className="warper container-fluid">
                        <div className="all-patients main_container">
                            <BreadScrum
                                title="Danh Sách Nhân Viên Mới"
                                subRouteTitle="user"
                                subTitle1="Danh Sách Nhân Viên Mới"
                            />
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        {/*  */}
                                        <div className="container">
                                            <Calendar />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page