import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import { Link } from "react-router-dom";
import vehicleanImage from "../../images/hz_vehiclean.png";

const Sidebar = () => {
  return (
    <div
     
      className="dsidebar  min-h-full bg-logoClr    "
    >
      <div className=" flex justify-center items-center bg-contain">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="items-center justify-center  ">
            <img className="vehilogoSize" src={vehicleanImage} alt="Images" />
          </div>
        </Link>
      </div>
      <div className="pl-2">
        <ul className="list-none m-0 p-0">
          <p className="titleNav">DASHBOARD</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li className="dashList">
              <DashboardIcon className="iconSideBar" />
              <span className="sideBarSpan">Dashboard</span>
            </li>
          </Link>
          <p className="titleNav">CUSTOMERS</p>
          <Link to="/dashboard/customers" style={{ textDecoration: "none" }}>
            <li className="dashList">
              <PersonOutlineIcon className="iconSideBar" />
              <span className="sideBarSpan">Customers</span>
            </li>
          </Link>
          <Link
            to="/dashboard/customers/wallet"
            style={{ textDecoration: "none" }}
          >
            <li className="dashList">
              <StoreIcon className="iconSideBar" />
              <span className="sideBarSpan">Wallet</span>
            </li>
          </Link>
          <Link to="/dashboard/customers/sub-mails">
            <li className="dashList">
              <CreditCardIcon className="iconSideBar" />
              <span className="sideBarSpan">Subscribed Mail</span>
            </li>
          </Link>
          <Link to="/dashboard/customers/messages">
            <li className="dashList">
              <LocalShippingIcon className="iconSideBar" />
              <span className="sideBarSpan">Contact Messages</span>
            </li>
          </Link>
          <p className="titleNav">PACKAGES</p>
          <Link to="/dashboard/packages/">
            <li className="dashList">
              <InsertChartIcon className="iconSideBar" />
              <span className="sideBarSpan">Packages</span>
            </li>
          </Link>
          <Link to="/dashboard/orders">
            <li className="dashList">
              <InsertChartIcon className="iconSideBar" />
              <span className="sideBarSpan">Orders</span>
            </li>
          </Link>

          <p className="titleNav">SETTING</p>
          <Link to="/dashboard/settings">
            <li className="dashList">
              <SettingsSystemDaydreamOutlinedIcon className="iconSideBar" />
              <span className="sideBarSpan">Settings</span>
            </li>
          </Link>
          <li className="dashList">
            <PsychologyOutlinedIcon className="iconSideBar" />
            <span className="sideBarSpan">Third Party</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
