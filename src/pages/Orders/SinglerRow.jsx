import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { PackageContext } from "../../context/packageContext";
import { CustomerContext } from "../../context/customrContext";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { format } from 'date-fns';

import axios from "axios";
const SingleRow = () => {
  const [uidInputVisible, setUidInputVisible] = useState(false);
  const [uid, setUid] = useState("");

  const { packageData, setPackageData } = useContext(PackageContext);
  const { customerData, setCustomerData } = useContext(CustomerContext);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [success, setSuccess] = useState(false);
  const location = useLocation();
  const rowData = location.state.rowData;
  const order_id = rowData.orderId;

  let baseUrl;
  if (process.env.NODE_ENV === "development") {
    baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
  } else {
    baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
  }

  // const handleChaneUid = (e) => {
  //   const uid = e.target.value;
  //   setUid(uid);
  // };

  // console.log(rowData.cartItems[0].uid)
  const handleStatusChange = async (e) => {
    const clickedStatus = e.target.value;
    setSelectedStatus(clickedStatus);
    console.log("value", clickedStatus)
    if (clickedStatus === "Order Dispatched") {
      setUidInputVisible(true);
    } else {
      setUidInputVisible(false);
    }

    try {
      const response = await axios.put(
        `${baseUrl}/orders/update-status/${order_id}`,
        {
          status: clickedStatus,
          uid: uid,
        }
      );
      if (response.status === 200) {
        const updatedStatus = response.data.updatedOrder.status;
        const updateUid = response.data.updatedOrder.cartItems[0].uid;
        console.log(updateUid);
        setSelectedStatus(updatedStatus);
        setUid(updateUid);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const subTotal = rowData.subTotal;
  const totalDiscount = rowData.cartItems[0].totalDiscount;
  const totalPrice = parseFloat(totalDiscount + subTotal / 1.18);

  const toalTax = ((totalPrice - totalDiscount) * 18) / 100;

  if (!customerData || customerData.length === 0) {
    return <p>Loading...</p>;
  }

  if (!packageData || packageData.length === 0) {
    return <p>Loading...</p>;
  }
  const date = new Date(rowData.createdAt);
  const formattedDate = format(date, 'dd-MM-yyyy');
  return (
    <div
    
      className="container mx-auto p-8 ">
      <div className="max-w-4xl mx-auto p-6 shadow-lg rounded-lg border  ">
        <h1 className="text-3xl font-bold mb-6 text-black">Order Details</h1>

        <div className="mb-6 p-4  rounded-lg border ">
          <p className="text-lg font-medium text-black">
            <span className="font-bold">Order ID:</span> {rowData.orderId} &nbsp;
            <span className="font-bold">Product UID:</span> {rowData.cartItems[0].uid} &nbsp; &nbsp;
            <span className="font-bold">Vehicle Number:</span> {rowData.cartItems[0].car_No} &nbsp; &nbsp;
            <span className="font-bold">Date:</span> {formattedDate}
          </p>
        </div>

        <div className="mb-6 p-4 rounded-lg border ">
          <h2 className="text-2xl font-semibold mb-4 text-black">Customer Details</h2>
          {customerData.map((customer) => {
            if (customer.userId === rowData.userId) {
              return (
                <div className="" key={customer.userId}>
                  <p className="text-lg font-medium text-black">
                    <span className="font-bold">Phone:</span> {customer.customerPhone}
                  </p>
                </div>
              );
            }
            return null;
          })}
          <p className="text-lg font-medium text-black">
            <span className="font-bold">Name:</span> {rowData.cartItems[0].fullName}
          </p>
          <p className="text-lg font-medium text-black">
            <span className="font-bold">Email:</span> {rowData.cartItems[0].email}
          </p>
          <h4 className="text-lg font-medium text-black mt-4">
            <span className="font-bold">Address:</span> 
            <span className="block">Street Address: {rowData.cartItems[0].stAdress}</span> 
            <span className="block">City: {rowData.cartItems[0].city}</span> 
            <span className="block">PinCode: {rowData.cartItems[0].pinCode}</span>
          </h4>
        </div>
      </div>



      {/* <h4 className="text-2xl font-bold text-black underline mb-4">Product Details</h4>
        <div className="flex flex-col gap-4">
          {rowData.cartItems.map((item, index) => (
            <div key={index} className="product-card flex gap-6 items-center border border-gray-300 p-4 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
              {packageData.map((product) => {
                if (product._id === item.product_id) {
                  return (
                    <div className="flex gap-6 w-full items-center">
                      <div className="flex-1">
                        <p className="text-lg font-semibold mb-2">Product Price: <span className="font-normal">${product.packagePrice}</span></p>
                        <p className="text-lg font-semibold mb-2">Product Name: <span className="font-normal">{product.packageName}</span></p>
                        <p className="text-lg font-semibold mb-2">Product Title: <span className="font-normal">{product.packageTitle}</span></p>
                        <p className="text-lg font-semibold mb-2">Product Description: <span className="font-normal">{product.packageDescription}</span></p>
                        <p className="text-lg font-bold text-green-600">Qty: <span className="font-normal">{item.quantity}</span></p>
                      </div>
                      <div className="flex-shrink-0">
                        <img
                          className="w-24 h-24 object-cover rounded-md border border-gray-300"
                          src={product.packageImg}
                          alt={product.packageName}
                        />
                      </div>
                    </div>
                  );
                }
                return null; // Ensure to return null if no match is found
              })}
            </div>
          ))}
        </div> */}

      <div className="ltr flex gap-6 items-end justify-between my-2">
        {/* <div className="flex flex-col border-black  border-s-4 p-3">
            <p className="font-semibold ">
              Order Confirmed Date: {rowData.createdAt}
            </p>
            <p className="text-sm font-bold">
              Toatal Price : ₹ {totalPrice.toFixed(2)}
            </p>
            <p className="text-sm font-bold ">
              Total Discount: ₹ -{totalDiscount.toFixed(2)}
            </p>
            <p>Tax: ₹ + {toalTax.toFixed(2)}</p>
            <p className="text-xl  font-bold ">SubTotal: ₹ {subTotal}</p>
          </div> */}
        <div className="mx-2 absolute top-10 right-10 ">
          {uidInputVisible && (
            <div className="mb-4">
              <TextField
                label="UID of QR Code"
                // defaultValue={rowData.cartItems[0].uid}
                value={uid}
                onChange={(e) => setUid(e.target.value)}
              />
              {success && (
                <p className="text-green text-xl tracking-wide">
                  Uid Updated Successfully
                </p>
              )}
              <button
                className="text-xl bg-black p-2 m-1 text-black"
                value="Order Dispatched"
                onClick={handleStatusChange}
              >
                save
              </button>
            </div>
          )}
          <Box sx={{ minWidth: 250 }}>
            <FormControl fullWidth>
              <InputLabel id="status-select-label">status</InputLabel>
              <Select
                labelId="status-select-label"
                id="status-select"
                value={selectedStatus || rowData.status}
                onChange={handleStatusChange}
                label="Status"
              >
                <MenuItem value="Order Received">Order Received</MenuItem>
                <MenuItem value="Order Dispatched">Order Dispatched</MenuItem>
                <MenuItem value="Order Delivered">Order Delivered</MenuItem>
                <MenuItem value="Activated">Activated</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
    </div >
  );
};

export default SingleRow;
