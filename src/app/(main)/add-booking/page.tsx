import BreadScrum from "@/components/BreadScrum";
import AddBookingCourtForm from "@/components/Form/AddBookingCourtForm";
import AddBookingCourt from "@/components/Form/AddBookingCourtForm";
import React from "react";

const AddBookingForm = () => {
    return (
        <div id="main-wrapper" className="show">
            <div className="content-body">
                <div className="warper container-fluid">
                    <div className="new-patients main_container">
                        <BreadScrum
                            title="Thêm Thông Tin Đặt Sân"
                            subRouteTitle="add-bird"
                            subTitle1="Thêm Thông Tin Đặt Sân"
                        />

                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <AddBookingCourtForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBookingForm;