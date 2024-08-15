
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import "./Featured.css"
import loadingGIf from "../../images/loading.gif";

import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../context/OrderContext";
import {
  startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth,
  subMonths, subWeeks, isWithinInterval,
  getMonth, getYear
} from 'date-fns';

const Featured = () => {
  const { orderData } = useContext(OrderContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [orderData]);

  if (
    !orderData ||
    orderData.length === 0 ||
    orderData.length === 0
  ) {
    <div className="flex justify-center items-center">
      <img className="w-32 h-32" src={loadingGIf} alt="loading_gif" />
    </div>;
  }




  // Initialize variables
  let totalSalesToday = 0;
  let totalSalesLastWeek = 0;
  let totalSalesLastMonth = 0;
  let totalSalesCurrentMonth = 0;

  let noOfSuccessOrdersToday = 0;
  let noOfSuccessOrdersLastWeek = 0;
  let noOfSuccessOrdersLastMonth = 0;
  let noOfSuccessOrdersCurrentMonth = 0;

  const startOfToday = startOfDay(new Date());
  const endOfToday = endOfDay(new Date());

  const startOfLastWeek = startOfWeek(subWeeks(new Date(), 1));
  const endOfLastWeek = endOfWeek(subWeeks(new Date(), 1));

  const startOfLastMonth = startOfMonth(subMonths(new Date(), 1));
  const endOfLastMonth = endOfMonth(subMonths(new Date(), 1));

  const startOfCurrentMonth = startOfMonth(new Date());
  const endOfCurrentMonth = endOfMonth(new Date());

  for (let i = 0; i < orderData?.cartItems.length; i++) {
    const order = orderData.cartItems[i];
    const orderDate = new Date(order.createdAt);

    const subTotal = Number(order.subTotal);

    if (isNaN(subTotal)) {
      console.error(`Invalid subTotal value: ${order.subTotal}`);
      continue;
    }

    console.log(`Processing Order Date: ${orderDate}`);
    console.log(`Payment Status: ${order.paymentStatus}`);
    console.log(`Order Subtotal: ${subTotal}`);

    if (isWithinInterval(orderDate, { start: startOfToday, end: endOfToday }) && order.paymentStatus === 'Success') {
      totalSalesToday += subTotal;
      noOfSuccessOrdersToday++;
    }

    if (isWithinInterval(orderDate, { start: startOfLastWeek, end: endOfLastWeek }) && order.paymentStatus === 'Success') {
      totalSalesLastWeek += subTotal;
      noOfSuccessOrdersLastWeek++;
    }

    if (isWithinInterval(orderDate, { start: startOfLastMonth, end: endOfLastMonth }) && order.paymentStatus === 'Success') {
      totalSalesLastMonth += subTotal;
      noOfSuccessOrdersLastMonth++;
    }

    if (isWithinInterval(orderDate, { start: startOfCurrentMonth, end: endOfCurrentMonth }) && order.paymentStatus === 'Success') {
      totalSalesCurrentMonth += subTotal;
      noOfSuccessOrdersCurrentMonth++;
    }
  }

  console.log("Total sales made today:", totalSalesToday);
  console.log("Number of successful orders today:", noOfSuccessOrdersToday);

  console.log("Total sales made last week:", totalSalesLastWeek);
  console.log("Number of successful orders last week:", noOfSuccessOrdersLastWeek);

  console.log("Total sales made last month:", totalSalesLastMonth);
  console.log("Number of successful orders last month:", noOfSuccessOrdersLastMonth);

  console.log("Total sales made current month:", totalSalesCurrentMonth);
  console.log("Number of successful orders current month:", noOfSuccessOrdersCurrentMonth);
  const target = 49900;
  const percentage = Math.floor((totalSalesToday * 100) / target);

  return (
    <div className="featured">
      <div className="top flex items-center justify-center text-gray">
        {/* <h1 className=" text-sm text-gray">Total Revenue</h1>
        <MoreVertIcon fontSize="small" /> */}
      </div>
      <div className="bottom p-5 flex flex-col items-center justify-center gap-4">
        <div className="featuredChart">
          {/* <CircularProgressbar value={percentage} text={percentage + "%"} strokeWidth={5} /> */}
        </div>
        <p className="text-sm text-gray">Total sales made today</p>
        <p className="amount font-xl">{totalSalesToday}&nbsp;INR</p>
        <p className="desc font-normal text-sm text-center">
          Previous transactions processing. Last payments may not be included.
        </p>
        {/* <div className="item text-center">
          <div className="itemTitle text-sm">Target</div>
          <div className="itemResult  negative text-red">
            <KeyboardArrowDownIcon fontSize="small" />
            <div className="resultAmount">50k</div>
          </div>

        </div> */}
        <div className="summary w-full flex items-center justify-center">


          <div className="item pr-2">
            <div className="itemTitle">Last Week</div>
            <div className="resultAmount text-black text-sm">{totalSalesLastWeek}&nbsp;INR</div>

          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="resultAmount text-black text-sm">{totalSalesLastMonth}&nbsp;INR</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
