import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Dashnavbar from "../DashNav/Dashnavbar";
import Dashcopy from "../Dashcopy/Dashcopy";
import WalletTable from "./walletTable";

export default function Wallet() {
  return (
    <div className="list text-main">
      <Sidebar />
      <div className="listContainer">
        <Dashnavbar />
        <WalletTable />
        <div className="flex justify-center  pb-2 mr-10 absolute bottom-0 center ml-20 ">
          <Dashcopy />
        </div>
      </div>
    </div>
  );
}
