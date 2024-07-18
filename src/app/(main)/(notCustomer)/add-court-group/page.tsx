import BreadScrum from "@/components/BreadScrum";
import AddCourtGroupForm from "@/components/Form/AddCourtGroupForm";
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
              subTitle1="Thêm Cụm Sân Mới"
            />
            <AddCourtGroupForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
