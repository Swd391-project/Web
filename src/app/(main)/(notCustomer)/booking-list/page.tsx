"use client"
import BreadScrum from '@/components/BreadScrum'
import BookingListClient from '@/components/Table/BookingListTable/BookingListClient'
import React from 'react'

const page = () => {
    return (
        <>
            <div id="main-wrapper" className="show">
                <div className="content-body">
                    <div className="warper container-fluid">
                        <div className="all-patients main_container">
                            <BreadScrum
                                title="Danh Sách Sân Mới"
                                subRouteTitle="court"
                                subTitle1="Danh Sách Sân Mới"
                            />
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="container">
                                            <BookingListClient />
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