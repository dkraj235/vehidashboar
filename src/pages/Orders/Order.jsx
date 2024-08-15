import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../pages/Sidebar/Sidebar";
import Dashnav from "../DashNav/Dashnavbar";
import OrderTable from "./OrderTable";
import Dashcopy from "../Dashcopy/Dashcopy";

export default function Order() {
  
  return (
    <div className="list text-main overflow">
      <Sidebar />
      <div className="listContainer">
        <Dashnav />
        <OrderTable />
        <div className="flex justify-center  pb-2 mr-10 absolute bottom-0 center ml-20 ">
          <Dashcopy />
        </div>
      </div>
    </div>
  );
}
