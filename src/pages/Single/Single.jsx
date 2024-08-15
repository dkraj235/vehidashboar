import "./single.css";
import Sidebar from "../Sidebar/Sidebar";
import { useContext } from "react";
import { CustomerContext } from "../../context/customrContext";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Dashnavbar from "../DashNav/Dashnavbar";
import Dashcopy from "../Dashcopy/Dashcopy";

const Single = () => {
  const customerData = useContext(CustomerContext);
  const { customerid } = useParams();
 
  if (!customerData || customerData.length === 0) {
    return <div>Loading...</div>;
  }

  function getCustomer(customerData, customerId) {
    for (let key in customerData) {
      const customersArray = customerData[key];

      if (Array.isArray(customersArray)) {
        for (let i = 0; i < customersArray.length; i++) {
          const customer = customersArray[i];

          if (customer._id === customerId) {
             return customer;
          }
        }
      }
    }
  }

  const customerDetails = customerData ? getCustomer(customerData, customerid): null

  if(!customerDetails){
    return <p>Loading</p>
  } else{
    console.log(customerDetails)
  }
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Dashnavbar />
        <div className="ml-20 p-20 justify-start">
          <Card sx={{ maxWidth: 345 }}>
            <CardContent className="">
              <Typography
                className="ml-5"
                gutterBottom
                variant="h5"
                component="div"
              >
                <Avatar src="/broken-image.jpg" />
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                Name : {customerDetails.customerName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: {customerDetails.customerEmail}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Phone: {customerDetails.customerPhone}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Address: {customerDetails.customerAddress}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>

        <div className="flex justify-center  pb-2 mr-10 absolute bottom-0 right-10">
          <Dashcopy />
        </div>
      </div>
    </div>
  );
};

export default Single;
