"use client"
import BreadScrum from "@/components/BreadScrum";
import Schedule from "@/components/Schedule/Schedule";

const BookingPage = () => {
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
                            <Schedule />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
