import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { PackageContext } from "../../context/packageContext";
import Dashcopy from "../Dashcopy/Dashcopy";
import Sidebar from "../Sidebar/Sidebar";
import Dashnavbar from "../DashNav/Dashnavbar";

export default function Packageupdate() {
  const navigate = useNavigate();
  const { packageData } = useContext(PackageContext);
  const [myPackage, setMyPackage] = useState({});
  const { packageId } = useParams();
  console.log(packageId);

  let baseUrl;
  if (process.env.NODE_ENV === "development") {
    baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
  } else {
    baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
  }

  useEffect(() => {
    if (packageData && packageData.length > 0) {
      const foundPackage = packageData.find((pkg) => pkg._id === packageId);
      if (foundPackage) {
        setMyPackage(foundPackage);
      }
    }
  }, [packageData, packageId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(myPackage),
    };

    try {
      const response = await fetch(
        `${baseUrl}/packages/update-package/${packageId}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to update package data");
      }

      navigate("/dashboard/packages");
    } catch (error) {
      console.error("Error updating package data:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMyPackage((prevPackage) => ({
      ...prevPackage,
      [name]: value,
    }));
  };

  const {
    packageName,
    packageTitle,
    packageDescription,
    packageImg,
    packagePrice,
    packageDiscount,
  } = myPackage;

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Dashnavbar />
        <div className="p-0 ml-5">
          <h1 className="text-2xl font-roboto tracking-wide">
            <EditIcon /> Update Package Details
          </h1>
        </div>

        <div className="bottom">
          <div className="right">
            <div className="container w-full">
              <form onSubmit={handleSubmit} className="ml-5 mt-8 p-10 rounded">
                <div className="flex flex-wrap gap-0 w-full">
                  <div className="lg:w-1/2 flex flex-col">
                    <label className="mb-2 text-lg" htmlFor="packageName">
                      Package Name
                    </label>
                    <input
                      onChange={handleChange}
                      id="packageName"
                      name="packageName"
                      value={packageName}
                      className="w-90 rounded formInput mr-10"
                      type="text"
                      placeholder="Package Name"
                    />
                  </div>
                  <div className="lg:w-1/2 flex flex-col">
                    <label className="mb-2 text-lg" htmlFor="packageTitle">
                      Package Title
                    </label>
                    <input
                      onChange={handleChange}
                      id="packageTitle"
                      name="packageTitle"
                      value={packageTitle}
                      className="w-90 rounded formInput mr-10"
                      type="text"
                      placeholder="Package Title"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-0 w-full mt-3">
                  <div className="lg:w-1/2 flex flex-col">
                    <label
                      className="mb-2 text-lg"
                      htmlFor="packageDescription"
                    >
                      Package Description
                    </label>
                    <input
                      onChange={handleChange}
                      id="packageDescription"
                      name="packageDescription"
                      value={packageDescription}
                      className="w-90 rounded formInput mr-10"
                      type="text"
                      placeholder="Package Description"
                    />
                  </div>
                  <div className="lg:w-1/2 flex flex-col">
                    <label className="mb-2 text-lg" htmlFor="packageImg">
                      Package Image URL
                    </label>
                    <input
                      onChange={handleChange}
                      id="packageImg"
                      name="packageImg"
                      value={packageImg}
                      className="w-90 rounded formInput mr-10"
                      type="text"
                      placeholder="Package Image URL"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-0 w-full mt-3">
                  <div className="lg:w-1/2 flex flex-col">
                    <label className="mb-2 text-lg" htmlFor="packagePrice">
                      Package Price
                    </label>
                    <input
                      onChange={handleChange}
                      id="packagePrice"
                      name="packagePrice"
                      value={packagePrice}
                      className="w-90 rounded formInput mr-10"
                      type="Number"
                      placeholder="Package Price"
                    />
                  </div>
                  <div className="lg:w-1/2 flex flex-col">
                    <label className="mb-2 text-lg" htmlFor="packageDiscount">
                      Package Discount
                    </label>
                    <input
                      onChange={handleChange}
                      id="packageDiscount"
                      name="packageDiscount"
                      value={packageDiscount}
                      className="w-90 rounded formInput mr-10"
                      type="Number"
                      placeholder="Package Discount"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-10">
                  <button
                    type="submit"
                    className="w-40 mr-8 bg-black hover:bg-logoClr text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                  >
                    Update Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex justify-center pb-2 mr-10 absolute bottom-0 right-10">
          <Dashcopy />
        </div>
      </div>
    </div>
  );
}
