import "./setting.css";
import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Dashnavbar from "../DashNav/Dashnavbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Link, useNavigate } from "react-router-dom";
import Dashcopy from "../Dashcopy/Dashcopy";
import SocialMedia from "./SocialMedia";
import Aboutus from "./Aboutus";
import { SettingDataContext } from "../../context/settingDetContext";
export default function Global() {
  const { settingData } = useContext(SettingDataContext);
  const [activeTab, setActiveTab] = useState("tab1");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState(false);

  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
  });

  useEffect(() => {
    if (settingData && settingData.length > 0) {
      const defaultFormData = settingData[0];
      setFormData(defaultFormData);
    }
  }, [settingData]);

  let baseUrl;
  if (process.env.NODE_ENV === "development") {
    baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
  } else {
    baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  function handlChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/settings/businessDetails`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedSettings = await response.json();
        setPopupVisible(true);
        setTimeout(() => {
          setPopupVisible(false);
        }, 3000);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="list text-main">
      <Sidebar />
      <div className="homeContainer relative ">
        <Dashnavbar />

        <div className="ml-5  ">
          <h1 className="text-2xl font-roboto tracking-wide">Settings</h1>
        </div>

        <div className="tabs flex justify-start mb-3 mt-7 ml-5 gap-10">
          <div className={`tab1 ${activeTab === "tab1" ? "active" : ""}`}>
            <button onClick={() => handleTabClick("tab1")}>
              <span
                className={`text-black font-normal   hover:text-white hover:bg-black border-black border  p-2 text-xl rounded-full`}
              >
                Bussiness Settings
              </span>
            </button>
          </div>
          <div className={`tab2 ${activeTab === "tab2" ? "active" : ""}`}>
            <button onClick={() => handleTabClick("tab2")}>
              <span className=" text-black font-normal  hover:text-white hover:bg-black border-black border p-2 text-xl rounded-full  ">
                Social Media
              </span>
            </button>
          </div>
          <div className={`tab3 ${activeTab === "tab3" ? "active" : ""}`}>
            <button onClick={() => handleTabClick("tab3")}>
              <span className="text-black font-normal  hover:text-white hover:bg-black border-black border p-2 text-xl rounded-full  ">
                About Us
              </span>
            </button>
          </div>
          {/* <div className={`tab2 ${activeTab === "tab4" ? "active" : ""}`}>
              <button onClick={() => handleTabClick("tab4")}>
                <span className="text-black font-normal  hover:text-white hover:bg-black border-black border p-2 text-xl rounded-full  ">
                  other Settings
                </span>
              </button>
            </div> */}
        </div>

        {activeTab === "tab2" && <SocialMedia />}
        {activeTab === "tab3" && <Aboutus />}
        {activeTab === "tab1" && (
          <div className="container  formContainer">
            <form
              onSubmit={handleSubmit}
              enctype="multipart/form-data"
              className="ml-5 py-7 rounded"
            >
              <div className="w-40 mx-7 p-3 pr-10 absolute right-0 top-30">
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt="vehiConnect_logo"
                />
                <div className="formInput">
                  <label htmlFor="file">
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    name="businessImage2"
                    type="file"
                    id="file2"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <div className="w-60 m-4 p-3 absolute right-0 bottom-10">
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt="vehiConnect_logo"
                />
                <div className="formInput">
                  <label htmlFor="file">
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    name="businessImage"
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-0 w-full mt-3">
                <div className=" lg:w-1/2 flex flex-col">
                  <label className="mb-2 text-lg" for="full_name">
                    Business Name:
                  </label>
                  <input
                    onChange={handlChange}
                    className="w-90 rounded formInput mr-10"
                    placeholder="Bussiness Name"
                    type="text"
                    id="full_name"
                    name="businessName"
                    value={formData.businessName}
                    required
                  />
                </div>
                <div className=" lg:w-1/2 flex flex-col">
                  <label className="mb-2 text-lg" for="phone_number">
                    Phone Number:
                  </label>
                  <input
                    onChange={handlChange}
                    className="w-90 rounded formInput mr-10"
                    type="tel"
                    id="phone_number"
                    name="phone"
                    value={formData.phone}
                    placeholder="+990 3343 7865"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    oninput="this.value = this.value.slice(0, 10)"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-0 w-full mt-3">
                <div className=" lg:w-1/2 flex flex-col">
                  <label className="mb-2 text-lg" for="email">
                    Email Address:
                  </label>
                  <input
                    onChange={handlChange}
                    className="w-90 rounded formInput mr-10"
                    placeholder="Bussiness Email"
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    required
                  />
                </div>
                <div className="lg:w-1/2 flex flex-col">
                  <label className="mb-2 text-lg" for="address">
                    Address:
                  </label>
                  <input
                    onChange={handlChange}
                    className="w-90 rounded formInput mr-10"
                    placeholder="address"
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    required
                  />
                </div>
              </div>
              <div className="lg:w-full flex flex-col mt-3">
                <label className="mb-2 text-lg" for="bio">
                  BIO:
                </label>
                <textarea
                  onChange={handlChange}
                  className="w-90 rounded formInput mr-10"
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  rows="4"
                  cols="60"
                ></textarea>
              </div>
               <div className="mt-5 flex justify-end gap-2">
                {popupVisible && (
                  <div className="popup">Saved succesfully!</div>
                )}
                <br /> <br />
                <button
                  type="submit"
                  className="w-40 bg-black hover:bg-logoClr hover:text-white  text-white   font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Save Now
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="flex justify-center  pb-2 mr-10">
          <Dashcopy />
        </div>
      </div>
    </div>
  );
}
