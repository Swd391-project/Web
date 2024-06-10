import React from "react";

const WaveChart = () => {
  return (
    <div className="card shadow widget1">
      <div className="card-header">
        <h4 className="card-title">Hoạt động</h4>
        <span className="subtitle">TODAY 11, OCT 2023</span>
      </div>
      <div className="card-body">
        <canvas id="chart1" width="100%" height={40} />
      </div>
    </div>
  );
};

export default WaveChart;
