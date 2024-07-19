"use client";

import React from "react";
import Link from "next/link";
import BreadScrum from "@/components/BreadScrum";
import CourtGroupClient from "@/components/Table/CourtGroupTable/CourtGroupClient";

const page = () => {
  return (
    <>
      <div id="main-wrapper" className="show">
        <div className="content-body">
          <div className="warper container-fluid">
            <BreadScrum
              title="Danh Sách các cụm sân"
              subRouteTitle="court-group"
              subTitle1="Danh Sách các cụm sân"
            />
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header fix-card">
                    <div className="row">
                      <div className="col-8">
                        <h4 className="card-title"> Danh Sách Cụm sân</h4>
                      </div>

                      <div className="col-4 float-end">
                        <Link
                          href="/add-court-group"
                          className="btn btn-primary float-end"
                        >
                          Thêm Chi Nhánh Sân Mới
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="container">
                    <CourtGroupClient />
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

export default page;
