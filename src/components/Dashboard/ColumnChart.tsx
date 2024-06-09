import React from "react";

const ColumnChart = () => {
  return (
    <div className="card shadow widget1">
      <div className="card-header">
        <h4 className="card-title">Loading...</h4>
      </div>
      <div className="card-body">
        <canvas id="chart2" width="100%" height={299} />
      </div>
    </div>
  );
};

export default ColumnChart;
