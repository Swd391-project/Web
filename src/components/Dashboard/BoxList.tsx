import React from "react";

const BoxList = () => {
  return (
    <div className="row">
      <div className="col-sm-6 col-xl-3 col-lg-6">
        <div
          className="widget card card-primary bg-card1"
          style={{ backgroundColor: "rgb(220,53,69)" }}
        >
          <div className="card-body">
            <div className="media text-center">
              <span>
                <i className="fas fa-user fa-2x" />
              </span>
              <div className="media-body">
                <span className="text-white">Khách hàng</span>
                <h3 className="mb-0 text-white">1000</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-xl-3 col-lg-6">
        <div
          className="widget card card-danger bg-card2 "
          style={{ backgroundColor: "rgb(220,53,69)" }}
        >
          <div className="card-body">
            <div className="media text-center">
              <span>
                <i className="fas fa-landmark fa-2x" />
              </span>
              <div className="media-body">
                <span className="text-white">Sân</span>
                <h3 className="mb-0 text-white">300</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-xl-3 col-lg-6">
        <div
          className="widget card card-primary bg-card3"
          style={{ backgroundColor: "rgb(220,53,69)" }}
        >
          <div className="card-body">
            <div className="media text-center">
              <span>
                <i className="fas fa-users fa-2x" />
              </span>
              <div className="media-body">
                <span className="text-white">Nhân viên</span>
                <h3 className="mb-0 text-white">5</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-xl-3 col-lg-6">
        <div
          className="widget card card-primary bg-card4"
          style={{ backgroundColor: "rgb(220,53,69)" }}
        >
          <div className="card-body">
            <div className="media text-center">
              <span>
                <i className="fas fa-retweet fa-2x" />
              </span>
              <div className="media-body">
                <span className="text-white">Sân đang được đặt</span>
                <h3 className="mb-0 text-white">3</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxList;
