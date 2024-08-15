import "./customers.css";
import Sidebar from "../Sidebar/Sidebar";
import DashNav from "../DashNav/Dashnavbar";
import Datatable from "../Datatable/Datatable";
import Dashcopy from "../Dashcopy/Dashcopy";

const Customers = () => {
  return (
    <div className="list text-main">
      <Sidebar />
      <div className="listContainer">
        <DashNav />
        <Datatable />
        <div className="flex justify-center  pb-2 mr-10 absolute bottom-0 center ml-20 ">
          <Dashcopy />
        </div>
      </div>
    </div>
  );
};

export default Customers;
