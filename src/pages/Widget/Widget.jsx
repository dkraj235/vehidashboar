
import { OrderContext } from "../../context/OrderContext";
import { CustomerContext } from "../../context/customrContext";
import loadingGIf from "../../images/loading.gif";
import { useContext, useEffect, useState } from "react";

const Widget = ({ type }) => {
  const { orderData } = useContext(OrderContext);
  const { customerData } = useContext(CustomerContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [orderData, customerData]);

  if (
    !orderData ||
    !customerData ||
    orderData.length === 0 ||
    orderData.length === 0
  ) {
    <div className="flex justify-center items-center">
      <img className="w-32 h-32" src={loadingGIf} alt="loading_gif" />
    </div>;
  }
  console.log("object,", orderData)
  let noOfSuccessOrders = 0;
  for (let i = 0; i < orderData?.cartItems.length; i++) {
    if (orderData.cartItems[i].paymentStatus === 'Success') {
      noOfSuccessOrders++;
    }
  }

  let noOfCustomers = customerData?.length;
  let noOfOrders = noOfSuccessOrders;
  console.log("no of orders:", noOfCustomers);
  console.log("no of customers:", noOfCustomers);

  let data;
  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        // title: "USERS",
        link: "Customers ",
        total: noOfCustomers,
      };
      break;
    case "order":
      data = {
        // title: "ORDERS",
        link: "Orders ",
        total: noOfOrders,
      };
      break;
    case "earning":
      data = {
        // title: "EARNINGS",
        link: "Earnings (INR) ",
        total: noOfOrders * 499,
      };
      break;
    case "balance":
      data = {
        // title: noOfOrders,
        link: "QR-Codes ",
        total: noOfOrders,
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title text-lg">{data.title}</span>

        <span className="text-logoClr text-4xl">{data.link}</span>
        <span className="text-logoClr text-4xl">{data.total} </span>
      </div>
    </div>
  );
};

export default Widget;
