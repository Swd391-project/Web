import BreadScrum from "@/components/BreadScrum";
import React from "react";

const page = () => {
  return (
    <div id="main-wrapper" className="show">
      <div className="content-body">
        <div className="warper container-fluid">
          <div className="new-patients main_container">
            <BreadScrum
              title="Thêm Nhân Cụm Sân Mới"
              subRouteTitle="add-court-group"
              subTitle1="Thêm Nhân Cụm Sân Mới"
            />
            {/* components */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
