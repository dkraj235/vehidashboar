import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Dashnavbar from "../DashNav/Dashnavbar";
import Dashcopy from "../Dashcopy/Dashcopy";

const Message = () => {
  return (
    <div className="list text-main">
      <Sidebar />
      <div className="listContainer">
        <Dashnavbar />
        <div className="flex justify-center  pb-2 mr-10 absolute bottom-0 center ml-20 ">
          <Dashcopy />
        </div>
      </div>
    </div>
  );
};

export default Message;