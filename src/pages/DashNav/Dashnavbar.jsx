import "./dashnavbar.css";
import React from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";

import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Dashnavbar = () => {
  const { dispatch, token, setIsAuthenticated } = useContext(AuthContext);
  const popupState = usePopupState({ variant: "popover", popupId: "demoMenu" });

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <div className="bg-logoClr dashNav flex items-center text-sm font-normal  overflow-hidden border-none">
      <div className="wrapper w-full p-0 flex items-center justify-end mr-5">
        <div className="items flex justify-evenly mr-5">
          <div className="item flex items-center mr-5 relative  ">
            <NotificationsNoneOutlinedIcon className="icon iconClr" />
            <div className="counter w-3 h-3   text-main flex font-bold items-center justify-center ">
              1
            </div>
          </div>
          <div className="item flex items-center mr-5 relative  ">
            <ChatBubbleOutlineOutlinedIcon className="icon  iconClr" />
            <div className="counter counter w-3 h-3   text-main flex font-bold items-center justify-center ">
              2
            </div>
          </div>
          <div className="item flex items-center mr-5 relative ">
            <li className="dashList">
              <AccountCircleOutlinedIcon
                {...bindTrigger(popupState)}
                className="iconSideBar text-xl"
              />
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={popupState.close}>
                  <Link to={"/dashboard/customers/profile"}>
                    <AccountCircleIcon style={{ color: "orange" }} />
                    &nbsp;&nbsp;Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={popupState.close}>
                  <SettingsIcon style={{ color: "orange" }} />
                  &nbsp;&nbsp;Account Settings
                </MenuItem>
                <hr className="mt-3" />
                <MenuItem onClick={handleLogOut}>
                  <Link to="/">
                    <ExitToAppIcon
                      onClick={handleLogOut}
                      style={{ color: "orange" }}
                      className="iconSideBar"
                    />
                    &nbsp;&nbsp; Log Out
                  </Link>
                </MenuItem>
              </Menu>
            </li>
            {/* <li className="dashList">
              <ExitToAppIcon className="iconSideBar" />
              <span className="sideBarSpan">Logout</span>
            </li> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashnavbar;
