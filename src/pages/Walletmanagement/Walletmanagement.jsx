import React, { useContext, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { CustomerContext } from "../../context/customrContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Dashnavbar from "../DashNav/Dashnavbar";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function WalletManagement() {
  const navigate = useNavigate();
  const { customerData } = useContext(CustomerContext);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [amount, setAmount] = useState("");
  const [showtext, setText] = useState(null);
  const [paymentType, setPaymentType] = useState("credit");

  let baseUrl;
  if (process.env.NODE_ENV === "development") {
    baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
  } else {
    baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
  }

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleAddMoney = async () => {
    try {
      if (!selectedCustomer || amount <= 1000 || !amount) {
        setText("Plase select Customer and Enter valid Amount");
        return navigate("/dashboard/customers/wallet/add-wallet");
      }

      await axios.post(`${baseUrl}/wallet/add-money`, {
        customerId: selectedCustomer._id,
        amount: parseFloat(amount),
        paymentType,
      });
      setText(null);
      setSelectedCustomer(null);
      setAmount("null");
      navigate("/dashboard/customers/wallet");
    } catch (error) {
      console.error("Error adding money:", error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Dashnavbar />
        <div className="mt-10 p-10">
          <div className="flex gap-20">
            <Autocomplete
              required
              value={selectedCustomer}
              onChange={(event, newValue) => {
                setSelectedCustomer(newValue);
              }}
              options={customerData}
              getOptionLabel={(option) => option.customerName}
              renderInput={(params) => (
                <TextField
                  style={{ width: 400 }}
                  {...params}
                  label="Select Customer"
                />
              )}
            />
            <TextField
              style={{ width: 240 }}
              required
              label="Amount"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              type="number"
            />

            <RadioGroup
              row
              value={paymentType}
              onChange={handlePaymentTypeChange}
            >
              <FormControlLabel
                value="credit"
                control={<Radio />}
                label="Credit"
              />
              <FormControlLabel
                value="debit"
                control={<Radio />}
                label="Debit"
              />
            </RadioGroup>
          </div>
          <div className="flex justify-end mr-10 pt-12 pr-12">
            <Button
              style={{ backgroundColor: "#ff5722" }}
              variant="contained"
              onClick={handleAddMoney}
            >
              Add Now
            </Button>
          </div>
          <p className="font-normal  " style={{ color: "#B00020" }}>
            {showtext}
          </p>
        </div>
      </div>
    </div>
  );
}

export default WalletManagement;
