import React from "react";

const NewBirdList = () => {
  return (
    <div className="card shadow widget-2">
      <div className="card-header">
        <h4 className="card-title">Mới</h4>
      </div>
      <div className="card-body">
        <div className="panel-body widget-media main-scroll nicescroll-box">
          <ul className="list-group list-unstyled">
            <li className="list-group-item d-flex justify-content-between align-items-center media">
              <div className="d-flex">
                <div className="img-patient">
                  <img
                    src="https://via.placeholder.com/128/f8f8f8/2b2b2b"
                    className="rounded-circle"
                    alt="people"
                  />
                </div>
                <div className="media-body">
                  <h4 className="mb-0">L011</h4>
                  <span>A</span>
                </div>
              </div>
              <button
                type="button"
                className="ms-btn-icon btn-success"
                name="button"
              >
                <i className="fas fa-arrow-right" />
              </button>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center media">
              <div className="d-flex">
                <div className="img-patient">
                  <img
                    src="https://via.placeholder.com/128/f8f8f8/2b2b2b"
                    className="rounded-circle"
                    alt="people"
                  />
                </div>
                <div className="media-body">
                  <h4 className="mb-0">L012</h4>
                  <span>B</span>
                </div>
              </div>
              <button
                type="button"
                className="ms-btn-icon btn-success"
                name="button"
              >
                <i className="fas fa-arrow-right" />
              </button>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center media">
              <div className="d-flex">
                <div className="img-patient">
                  <img
                    src="https://via.placeholder.com/128/f8f8f8/2b2b2b"
                    className="rounded-circle"
                    alt="people"
                  />
                </div>
                <div className="media-body">
                  <h4 className="mb-0">L013</h4>
                  <span>C</span>
                </div>
              </div>
              <button
                type="button"
                className="ms-btn-icon btn-success"
                name="button"
              >
                <i className="fas fa-arrow-right" />
              </button>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center media">
              <div className="d-flex">
                <div className="img-patient">
                  <img
                    src="https://via.placeholder.com/128/f8f8f8/2b2b2b"
                    className="rounded-circle"
                    alt="people"
                  />
                </div>
                <div className="media-body">
                  <h4 className="mb-0">L014</h4>
                  <span>D</span>
                </div>
              </div>
              <button
                type="button"
                className="ms-btn-icon btn-success"
                name="button"
              >
                <i className="fas fa-arrow-right" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewBirdList;
