import React, { useEffect, useState } from "react";
import axios from "axios";

const BoxList = () => {
  const [data, setData] = useState({
    users: 0,
    courts: 0,
    staffs: 0,
    bookings: 0,
  });

  useEffect(() => {
    axios
      .get("https://swdbbmsapi.azurewebsites.net/api/booking/dashboard-overall")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
                <h3 className="mb-0 text-white">{data.users}</h3>
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
                <h3 className="mb-0 text-white">{data.courts}</h3>
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
                <h3 className="mb-0 text-white">{data.staffs}</h3>
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
                <span className="text-white">Bookings</span>
                <h3 className="mb-0 text-white">{data.bookings}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxList;
