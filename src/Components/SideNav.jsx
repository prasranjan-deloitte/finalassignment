import React, { useState } from "react";
import icon2 from "../Images/icon2.png";
import "../CSS/sidenav.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const SideNav = () => {
  const [active, setActive] = useState(1);
  return (
    <>
      <div className="col-md-2 d-flex flex-column maindiv min-vh-100">
        <div className="">
          <img
            alt="responsive image"
            className="img-fluid c-mt-5 c-ml-3"
            src={icon2}
          />
        </div>
        <div className="d-flex flex-column c-mt-6 letterclass">
          <Link to="/projectBoard">
            <div
              className={
                (active === 1 ? "alternateclass" : "text-white") +
                " buttoncss shadow-lg mt-3 rounded d-flex"
              }
              onClick={() => setActive(1)}
            >
              <div className={active === 1 ? "line" : ""}></div>
              <div className="c-p-4">PROJECT BOARD</div>
            </div>
          </Link>
          <Link to="/createIssue">
            <div
              className={
                (active === 2 ? "alternateclass" : "text-white") +
                " buttoncss shadow-lg mt-3 rounded d-flex"
              }
              onClick={() => setActive(2)}
            >
              <div className={active === 2 ? "line" : ""}></div>
              <div className="c-p-4">CREATE ISSSUE</div>
            </div>
          </Link>
          <Link to="/createProject">
            <div
              className={
                (active === 3 ? "alternateclass" : "text-white") +
                " buttoncss shadow-lg mt-3 rounded d-flex"
              }
              onClick={() => setActive(3)}
            >
              <div className={active === 3 ? "line" : ""}></div>
              <div className="c-p-4">CREATE PROJECT</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideNav;
