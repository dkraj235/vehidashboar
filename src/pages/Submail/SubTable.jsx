import React, { useContext } from "react";
import Sidebar from "../Sidebar/Sidebar";
import DashNav from "../DashNav/Dashnavbar";
import { DataGrid } from "@mui/x-data-grid";
import { subColumns } from "../../submailsTable";
import { CustomerContext } from "../../context/customrContext";
import Dashcopy from "../Dashcopy/Dashcopy";
import Switcher from "./switch";
import loadingGIf from "../../images/loading.gif";

export default function SubTable() {
  const { customerData, setCustomerData } = useContext(CustomerContext);

  const baseUrl =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_BACKEND_LOCALAPI
      : process.env.REACT_APP_BACKEND_LIVEAPI;

  async function deleteCustomer(id) {
    try {
      const response = await fetch(
        `${baseUrl}/customer/delete-customer/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to delete customer with ID ${id}`);
      }
      console.log(`Customer with ID ${id} deleted successfully`);
    } catch (error) {
      console.error("Error deleting customer:", error);
    }

    // Assuming setCustomerData is set properly in the context
    const filterData = customerData.filter((item) => item._id !== id);
    setCustomerData(filterData);
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Switcher />
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable font-serif text-sm">
      <div className="datatableTitle">
        <h2 className="text-2xl font-serif font-extraligh tracking-wider leading-10 text-main">
          Subscribed Mails
        </h2>
      </div>

      {!customerData || customerData.length === 0 ? (
        <div className="flex justify-center items-center">
          <img className="w-32 h-32" src={loadingGIf} alt="loading_gif" />
        </div>
      ) : (
        <div className="p-5">
          <DataGrid
            rows={customerData.map((customer, index) => ({
              id: index + 1,
              ...customer,
            }))}
            className="datagrid"
            columns={subColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
          />
        </div>
      )}
    </div>
  );
}
