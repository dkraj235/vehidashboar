import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashnavbar from "../../pages/DashNav/Dashnavbar";
import Dashcopy from "../../pages/Dashcopy/Dashcopy";

const CreatePackage = () => {
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState({
    packageName: "",
    packageTitle: "",
    packageDesc: "",
    packageImg: "",
    packagePrice: "",
    packageDiscount: "",
  });

  const handleChange = (e) => {
    setPackageData({ ...packageData, [e.target.name]: e.target.value });
  };
  let baseUrl;
  if (process.env.NODE_ENV === "development") {
    baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
  } else {
    baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${baseUrl}/packages/create-package`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(packageData),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      navigate("/dashboard/packages/");
      setPackageData({
        packageName: "",
        packageTitle: "",
        packageDesc: "",
        packageImg: "",
        packagePrice: "",
        packageDiscount: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Dashnavbar />
        <div className="top">
          <h1 className="text-2xl font-roboto tracking-wide">
            <i className="fa-solid fa-box"></i> Add new Products
          </h1>
        </div>
        <div className="bottom">
          <div className="right">
            <div className="container w-full">
              <form
                onSubmit={handleSubmit}
                className="ml-5 mt-10	w-full  p-10 rounded"
              >
                <div className="flex flex-wrap gap-0 w-full">
                  <div className=" lg:w-1/2 flex flex-col">
                    <label className="mb-2 text-lg" htmlFor="packageName">
                      Package Name
                    </label>
                    <input
                      required
                      onChange={handleChange}
                      id="packageName"
                      name="packageName"
                      value={packageData.packageName}
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
                      className="w-90 rounded formInput mr-10"
                      type="text"
                      placeholder="Package Title"
                      onChange={handleChange}
                      id="packageTitle"
                      name="packageTitle"
                      value={packageData.packageTitle}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-0 w-full mt-3">
                  <div className=" lg:w-1/2 flex flex-col">
                    <label className="mb-2 text-lg" htmlFor="packageDesc">
                      Package Description
                    </label>
                    <input
                      className="w-90 rounded formInput mr-10"
                      type="text"
                      placeholder="Package Description"
                      onChange={handleChange}
                      id="packageDesc"
                      name="packageDesc"
                      value={packageData.packageDesc}
                    />
                  </div>
                  <div className="lg:w-1/2 flex flex-col">
                    <label className="mb-2 text-lg" htmlFor="packageImg">
                      Package Image
                    </label>
                    <input
                      className="w-90 rounded formInput mr-10"
                      type="text"
                      placeholder="Package Image URL"
                      onChange={handleChange}
                      id="packageImg"
                      name="packageImg"
                      value={packageData.packageImg}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-0 w-full mt-3">
                  <div className=" lg:w-1/2 flex flex-col">
                    <label className="mb-2 text-lg" htmlFor="packagePrice">
                      Package Price
                    </label>
                    <input
                      required
                      className="w-90 rounded formInput mr-10"
                      type="Number"
                      placeholder="Package Price"
                      onChange={handleChange}
                      id="packagePrice"
                      name="packagePrice"
                      value={packageData.packagePrice}
                    />
                  </div>
                  <div className="lg:w-1/2 flex flex-col">
                    <label className="mb-2 text-lg" htmlFor="packageDiscount">
                      Package Discount
                    </label>
                    <input
                      required
                      className="w-90 rounded formInput mr-10"
                      type="Number"
                      placeholder="Package Discount Only "
                      onChange={handleChange}
                      id="packageDiscount"
                      name="packageDiscount"
                      value={packageData.packageDiscount}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-10  ">
                  <button
                    type="submit"
                    className="w-40 mr-8 bg-black   hover:bg-logoClr text-white   font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                  >
                    PUBLISH
                  </button>
                </div>
              </form>
            </div>
            {/* {packageData} */}
          </div>
        </div>
        <div className="flex justify-center  pb-2 mr-10 absolute bottom-0 right-10">
          <Dashcopy />
        </div>
      </div>
    </div>
  );
};

export default CreatePackage;
