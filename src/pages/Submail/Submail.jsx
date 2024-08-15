import React, { useContext } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Dashnavbar from "../DashNav/Dashnavbar";
import Dashcopy from "../Dashcopy/Dashcopy";
import SubTable from "./SubTable";

export default function Submail() {
  return (
    <div className="list text-main">
      <Sidebar />
      <div className="listContainer">
        <Dashnavbar />
        <SubTable />
        <div className="flex justify-center  pb-2 mr-10 absolute bottom-0 center ml-20 ">
          <Dashcopy />
        </div>
      </div>
    </div>
  );
}
