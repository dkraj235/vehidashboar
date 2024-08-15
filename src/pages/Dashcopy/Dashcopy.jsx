import React from "react";
import vehicleanImage from "../../images/hz_vehiclean.png";
export default function Dashcopy() {
  return (
    <div className="h-30 w-full text-pgcolor text-xs b  flex justify-around">
      <img className="h-6 w-auto" src={vehicleanImage} alt="" />
      <span className="w-auto px-5"> © 2024 Vehismart Clean Pvt Ltd.</span>
    </div>
  );
}
