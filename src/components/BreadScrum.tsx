import React from "react";

interface BreadScrumProps {
  title: string;
  subTitle1?: string;
  subTitle2?: string;
  subRouteTitle?: string;
}

const BreadScrum = ({
  title,
  subTitle1,
  subTitle2,
  subRouteTitle,
}: BreadScrumProps) => {
  return (
    <div className="row page-titles mx-0 w-[1200px]">
      <div className="col-sm-6 p-md-0">
        <div className="welcome-text">
          <h4 className="text-primary">{title}</h4>
        </div>
      </div>
      <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>

          {subRouteTitle && (
            <li className="breadcrumb-item active ">
              <a href={`/${subRouteTitle}`}>{subTitle1}</a>
            </li>
          )}

          {subTitle2 && (
            <li className="breadcrumb-item active">
              <a>{subTitle2}</a>
            </li>
          )}
        </ol>
      </div>
    </div>
  );
};

export default BreadScrum;
