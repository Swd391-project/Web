import BreadScrum from "@/components/BreadScrum";
import React from "react";

const AddBirdPage = () => {
    return (
        <div id="main-wrapper" className="show">
            <div className="content-body">
                <div className="warper container-fluid">
                    <div className="new-patients main_container">
                        <BreadScrum
                            title="Thêm Thông Tin Chim"
                            subRouteTitle="add-bird"
                            subTitle1="Thêm Thông Tin Chim"
                        />

                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div>Page</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBirdPage;