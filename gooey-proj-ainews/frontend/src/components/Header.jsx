import React, { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  return (
    <header className="aw-header-area header-absolute">
      <div className="container">
        <div className="col-12 d-flex flex-wrap align-items-center justify-content">
          {/* Logo Section */}
          <div className="logo-box">
            <a href="https://atlaschat.io/">
              <img src="data:image/png;base64,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" alt="logo"/>
            </a>
          </div>

          {/* Header Menu */}
          <div style={{'width':'60%'}}>
            
                  <a href="https://atlaschat.io/" className="backbutton">Back To AtlasChat</a>
                
          </div>

          {/* Profile Section */}
          <div className="profile-area">
            {/* <div className="profile" onClick={toggleProfileMenu}>
              <div className="img-box">
                <img
                  src="https://i.postimg.cc/BvNYhMHS/user-img.jpg"
                  alt="User"
                />
              </div>
              <div className="user">
                <h5>John Watson</h5>
                <span className="down-icon">
                  <img src="assets/img/down_icon.svg" alt="Expand" />
                </span>
                <span className="down-icon d-cross">
                  <img src="assets/img/cross.svg" alt="Close" />
                </span>
              </div>
            </div> */}

            {/* Profile Menu */}
            {/* {profileMenuOpen && (
              <div className="menu">
                <ul>
                  <li>
                    <a href="#">
                      <img src="assets/img/user.svg" alt="Profile" /> Profile
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="assets/img/mail.svg" alt="Inbox" /> Inbox
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="assets/img/setting.svg" alt="Settings" />{" "}
                      Settings
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="assets/img/help.svg" alt="Help" /> Help
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="assets/img/sign-out.svg" alt="Sign Out" /> Sign
                      Out
                    </a>
                  </li>
                </ul>
              </div>
            )} */}
          </div>

          {/* Mobile Menu Button */}
          <div className="mobile-menu d-lg-none"></div>

          {/* Menu Bar for Mobile */}
          {/* <div className="menu-bar d-lg-none">
            <button onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;




