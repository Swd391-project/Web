import BreadScrum from "@/components/BreadScrum";
import AddCourtForm from "@/components/Form/AddCourtForm";
import AddCourtGroupForm from "@/components/Form/AddCourtGroupForm";
import React from "react";

const page = () => {
    return (
        <div id="main-wrapper" className="show">
            <div className="content-body">
                <div className="warper container-fluid">
                    <div className="new-patients main_container">
                        <BreadScrum
                            title="Thêm Nhân Sân Mới"
                            subRouteTitle="add-group"
                            subTitle1="Thêm Sân Mới"
                        />
                        <AddCourtForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
