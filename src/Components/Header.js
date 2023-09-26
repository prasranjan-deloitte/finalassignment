import React, { useState } from "react";
import { ClayInput } from "@clayui/form";
import "../CSS/header.css";
import { useOktaAuth } from "@okta/okta-react";

import profile from "../Images/Profile picture.png";

const Header = () => {
  const [active, setActive] = useState(false);
  const { oktaAuth, authState } = useOktaAuth();
  const handleLogout = async () => oktaAuth.signOut();

  return (
    <>
      {active ? (
        <>
          <div className="c-mt-5 shadow-lg signout">
            <div className="c-p-2">My Profile</div>
            <div className="c-p-2" onClick={handleLogout}>
              Sign Out
            </div>
          </div>
        </>
      ) : (
        <div></div>
      )}
      <div className="d-flex w-100">
        <div className="inputsection">
          <ClayInput
            id="basicInputText"
            placeholder="search"
            type="text"
            className="inputfeild"
          />
        </div>
        <div className="profilesection d-flex c-p-3 justify-content-around">
          <div className="c-mt-2"> Aanjali Gupta </div>
          <div className="profilephoto d-flex">
            <img
              alt="responsive image"
              className="img-fluid"
              src={profile}
              onClick={() => setActive(!active)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
