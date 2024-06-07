import BreadScrum from '@/components/BreadScrum'
import AddUserForm from '@/components/Form/AddUserForm'
import React from 'react'

const page = () => {
    return (
        <div id="main-wrapper" className="show">
            <div className="content-body">
                <div className="warper container-fluid">
                    <div className="new-patients main_container">
                        <BreadScrum
                            title="Thêm Nhân Viên Mới"
                            subRouteTitle="add-staff"
                            subTitle1="Thêm Nhân Viên Mới"
                        />
                        <AddUserForm />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default page