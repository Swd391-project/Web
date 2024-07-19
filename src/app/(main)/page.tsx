"use client";
import Navbar from "@/components/Navbar";
import BoxList from "@/components/Dashboard/BoxList";
import WaveChart from "@/components/Dashboard/WaveChart";
import NewBirdList from "@/components/Dashboard/NewBirdList";
import ColumnChart from "@/components/Dashboard/ColumnChart";
import PieChart from "@/components/Dashboard/PieChart";
import PieShadcnUI from "@/components/Dashboard/PieShadcnUI";

import React, { useEffect } from "react";
import LineChartShadcnUI from "@/components/Dashboard/LineChartShadcnUI";
import RadialChartShadcnUI from "@/components/Dashboard/RadialChartShadcnUI";

const page = () => {
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header"></header>
        <div className="content-body">
          <div className="warper container-fluid">
            <div className="col-sm-6 p-md-0">
              <div className="welcome-text">
                <h4 className="container">Dashboard</h4>
              </div>
            </div>
            <div className="new-patients main_container">
              <BoxList />

              <div className="row">
                <div className="col-lg-8">
                  <LineChartShadcnUI />
                </div>
                <div className="col-lg-4">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-3">
                      <PieShadcnUI />
                    </div>
                    <div>
                      <RadialChartShadcnUI />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
