import { useParams } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { CustomerContext } from "../../context/customrContext";
import { useNavigate } from "react-router-dom";
import Dashcopy from "../Dashcopy/Dashcopy";
import Sidebar from "../Sidebar/Sidebar";
import Dashnavbar from "../DashNav/Dashnavbar";
import EditIcon from "@mui/icons-material/Edit";

export default function Edit() {
  const navigate = useNavigate();
  const { customerData } = useContext(CustomerContext);
  const [customer, setCustomer] = useState({});
  const { customerid } = useParams();
  let baseUrl;
  if (process.env.NODE_ENV === "development") {
    baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
  } else {
    baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
  }

  useEffect(() => {
    if (customerData && customerData.length > 0) {
      const foundCustomer = Object.values(customerData)
        .flat()
        .find((customer) => customer._id === customerid);
      if (foundCustomer) {
        setCustomer(foundCustomer);
      }
    }
  }, [customerData, customerid]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const bearerToken = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    };

    const requestOptions = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(customer),
    };

    try {
      const response = await fetch(
        `${baseUrl}/customer/update/${customerid}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to update customer data");
      }

      navigate("/dashboard/customers");
    } catch (error) {
      console.error("Error updating customer data:", error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const customerName = customer?.customerName || "";
  const customerEmail = customer?.customerEmail || "";
  const customerPhone = customer?.customerPhone || "";
  const customerAddress = customer?.customerAddress || "";

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Dashnavbar />
        <div className="p-0 ml-5">
          <h1 className="text-2xl font-roboto tracking-wide">
            <EditIcon /> Update Details
          </h1>
        </div>

        <div className="bottom">
          <div className="right">
            <div className="container w-full">
              <form onSubmit={handleSubmit} className="ml-5 mt-8  p-10 rounded">
                <div className="flex flex-wrap gap-0 w-full">
                  <div className=" lg:w-1/2 flex flex-col">
                    <label className="mb-2 text-lg" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      onChange={handleChange}
                      id="customerName"
                      name="customerName"
                      value={customerName}
                      className="w-90 rounded formInput mr-10"
                      type="text"
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="lg:w-1/2 flex flex-col">
                    <label className="mb-2 text-lg" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="w-90 rounded formInput mr-10"
                      type="email"
                      placeholder="Email  "
                      onChange={handleChange}
                      id="customerEmail"
                      name="customerEmail"
                      value={customerEmail}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-0 w-full mt-3">
                  <div className=" lg:w-1/2 flex flex-col">
                    <label className="mb-2 text-lg" htmlFor="Phone">
                      Phone
                    </label>
                    <input
                      required
                      className="w-90 rounded formInput mr-10"
                      type="Number"
                      placeholder="Mobile Number"
                      onChange={handleChange}
                      id="customerPhone"
                      name="customerPhone"
                      value={customerPhone}
                    />
                  </div>
                  <div className="lg:w-1/2 flex flex-col">
                    <label className="mb-2 text-lg" htmlFor="email">
                      Address
                    </label>
                    <input
                      required
                      className="w-90 rounded formInput mr-10"
                      type="address"
                      placeholder="Address"
                      onChange={handleChange}
                      id="customerAddress"
                      name="customerAddress"
                      value={customerAddress}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-10 ">
                  <button
                    type="submit"
                    className="w-40 mr-8 bg-black   hover:bg-logoClr text-white   font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                  >
                    Update Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex justify-center  pb-2 mr-10 absolute bottom-0 right-10">
          <Dashcopy />
        </div>
      </div>
    </div>
  );
}
