import "./dbhome.css";

import Sidebar from "../Sidebar/Sidebar";
import Dashnavbar from "../DashNav/Dashnavbar";
import Dashcopy from "../Dashcopy/Dashcopy";
import Widget from "../../pages/Widget/Widget";
import Featured from "../../pages/Featured/Featured";
import Chart from "../../pages/Charts/Chart";
import Datatable from "../Datatable/Datatable";
import { Link } from "react-router-dom";

const DbHome = () => {
  return (
    <div className="home flex overflow-x-scroll">
      <div className="fixed">
        <Sidebar />
      </div>
      <div
        style={{ marginLeft: "210px" }}
        className="homeContainer flex-6 relative"
      >
        <Dashnavbar />
        <div style={{ marginLeft: "50px" }} className="widgets flex p-5 gap-5">
          <Link to="/dashboard/customers">
            <Widget type="user" />
          </Link>
          <Link to="/dashboard/orders">
            <Widget type="order" />
          </Link>
          <Link to="/dashboard/orders">
            <Widget type="earning" />
          </Link>
          <Link to="/dashboard/orders">
            <Widget type="balance" />
          </Link>
        </div>
        <div style={{ marginLeft: "20px" }} className="charts" py-1 px-5>
          <Featured />
          {/* <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} /> */}
        </div>
        <div
          style={{ marginLeft: "70px" }}
          className="listContainer text-gray mb-4"
        >
          <Datatable />
        </div>
      </div>
      <div className="my-5 flex justify-center  pb-2 mr-10 absolute bottom-0 right-10">
        <Dashcopy />
      </div>
    </div>
  );
};

export default DbHome;
