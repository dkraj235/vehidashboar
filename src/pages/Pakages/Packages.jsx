import React, { useContext, useEffect } from "react";
import Sidebar from "../../pages/Sidebar/Sidebar";
import Dashnavbar from "../DashNav/Dashnavbar";
import Dashcopy from "../Dashcopy/Dashcopy";
import PackageTable from "./packageTable";

export default function Packages() {
  return (
    <div className="list text-main">
      <Sidebar />
      <div className="listContainer">
        <Dashnavbar />
        <PackageTable />
        <div className="flex justify-center  pb-2 mr-10 absolute bottom-0 center ml-20 ">
          <Dashcopy />
        </div>
      </div>
    </div>
  );
}
