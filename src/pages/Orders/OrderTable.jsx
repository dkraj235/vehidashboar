import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../context/OrderContext";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { PackageContext } from "../../context/packageContext";
import { CustomerContext } from "../../context/customrContext";
import TableCell from "@mui/material/TableCell";
import loadingGIf from "../../images/loading.gif";
import { format } from 'date-fns';
import { exportToExcel } from "../../utils/exportUtils";
const OrderTable = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { packageData } = useContext(PackageContext);
  const { orderData } = useContext(OrderContext);
  const { customerData } = useContext(CustomerContext);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [filterModel, setFilterModel] = useState({ items: [] });

  const handleRowClick = (params) => {
    const selectedId = params.row.id;
    setSelectedRowId(selectedId);
    navigate("/dashboard/single-row", { state: { rowData: params.row } });
  };

  useEffect(() => {
    setIsLoading(false);
  }, [orderData]);

  if (!orderData || orderData.length === 0 || !packageData) {
    return (
      <div className="flex justify-center items-center">
        <img className="w-32 h-32" src={loadingGIf} alt="loading_gif" />
      </div>
    );
  }

  if (!Array.isArray(orderData.cartItems)) {
    console.error("Order data is not in the expected format:", orderData);
    return <p>Error: Order data is not in the expected format.</p>;
  }
 

  const handleExport = () => {
    const filteredRows = orderData.cartItems
      .filter(order => {
        return filterModel.items.every(filter => {
          const { columnField, operatorValue, value } = filter;
          const fieldValue = order[columnField]?.toString().toLowerCase();

          if (!value) return true;  

          if (operatorValue === 'contains') {
            return fieldValue.includes(value.toString().toLowerCase());
          } else if (operatorValue === 'equals') {
            return fieldValue === value.toString().toLowerCase();
          }
          return true;
        });
      })
      .map((order) => {
        const customer = customerData.find((customer) => customer.userId === order.userId) || {};

        return {
          orderId: order.orderId,
          createdAt: format(new Date(order.createdAt), 'dd-MM-yyyy HH:mm:ss'),
          paymentStatus: order.paymentStatus,
          status: order.status,
          mobileNumber: customer.customerPhone || 'N/A',
          customerName: order.customerName || customer.customerName || 'N/A',
          uids: order.cartItems.map(item => item.uid).join(', '),
          vehicleNumbers: order.cartItems.map(item => item.car_No).join(', '),
          pinCodes: order.cartItems.map(item => item.pinCode).join(', '),
          deliveryAddress: `${order.cartItems[0]?.stAdress || ''} ${order.cartItems[0]?.stateAddress || ''} ${order.cartItems[0]?.city || ''} ${order.cartItems[0]?.pinCode || ''}`
        };
      });

    exportToExcel(filteredRows, 'OrderData.xlsx');
  };


  const rows = orderData.cartItems
    .map((order) => ({
      id: order._id,
      ...order,
    }))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const cartColumns = [
    {
      field: "orderId",
      headerName: "Order ID",
      width: 80,
      renderCell: (params) => (
        <div
          className="underline cursor-pointer font-normal
         text-bgnavclr hover:font-extrabold"
        >
          {params.value}
        </div>
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Order Date',
      width: 130,
      renderCell: (params) => {
        const date = new Date(params.value);
        const formattedDate = format(date, 'dd-MM-yyyy');
        const formattedTime = format(date, 'HH:mm:ss');

        return (
          <div class="flex flex-col items-center  ">
            <div class="text-xs font-semibold ">
              {`Date: ${formattedDate}`}
            </div>
            <div class="text-xs font-semibold ">
              {`Time: ${formattedTime}`}
            </div>
          </div>

        );
      }
    }, {
      field: "paymentStatus",
      headerName: "Pyament  Status",
      width: 130,
      renderCell: (params) => (

        <div
          className="cursor-pointer font-normal
         text-bgnavclr hover:font-extrabold"
        >
          {params.value}
        </div>
      ),
    }, {
      field: "status",
      headerName: "Order Status",
      width: 130,
      renderCell: (params) => (
        <div
          className="cursor-pointer font-normal
         text-black hover:font-bold"
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "orderData",
      headerName: "Mobile Number",
      width: 110,
      renderCell: (params) => {
        const { cartItems } = params.row;
        return (
          <ul className="flex">
            <li key={params.row.id}>
              {customerData.map((customer) => {
                if (customer.userId === params.row.userId) {
                  return (
                    <div className="flex" key={customer.userId}>
                      <p>{customer.customerPhone}</p>
                    </div>
                  );
                }
                return null;
              })}
            </li>
          </ul>
        );
      },
    },
    {
      field: "fullName",
      headerName: "Customer Name",
      width: 130,
      renderCell: (params) => {
        const customerName = params.row.customerName;
        const userId = params.row.userId;

        // Check if customerName is empty and if so, find it in customerData
        const resolvedName = customerName ? customerName : (
          customerData.find(customer => customer.userId === userId)?.customerName || 'N/A'
        );

        return (
          <div className="flex">
            <p>{resolvedName}</p>
          </div>
        );
      },
    }
    ,

    {
      field: "params",
      headerName: "UID",
      width: 80,
      renderCell: (params) => {
        const cartItems = params.row.cartItems;

        return (
          <>
            {cartItems.map((x) => (
              <div key={x.uid}>
                <p>{x.uid} &nbsp;&nbsp;</p>
              </div>
            ))}
          </>
        );
      },
    },
    {
      field: "car_No",
      headerName: "Vehicle number",
      width: 130,
      renderCell: (params) => {
        const cartItems = params.row.cartItems;

        return (
          <>
            {cartItems.map((x) => (
              <div key={x.car_No}>
                <p>{x.car_No} &nbsp;&nbsp;</p>
              </div>
            ))}
          </>
        );
      },
    }, {
      field: "PinCode",
      headerName: "PinCode",
      width: 80,
      renderCell: (params) => {
        const cartItems = params.row.cartItems;
        return (
          <>
            {cartItems.map((x, index) => (
              <div key={x.pinCode}>
                <p>
                  {x.pinCode}
                </p>
              </div>
            ))}
          </>
        );
      },
    },
    {
      field: "Address",
      headerName: "Delivery Address",
      width: 120,
      renderCell: (params) => {
        const cartItems = params.row.cartItems;
        return (
          <>
            {cartItems.map((x, index) => (
              <div key={x.pinCode}>
                <p>
                  {x.stAdress} &nbsp;&nbsp;{x.stateAddress}&nbsp;&nbsp;
                  {x.pinCode}
                  {x.city}
                </p>
              </div>
            ))}
          </>
        );
      },
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <TableCell>
          {/* <div className="cellAction">
            <div
              className="deleteButton" onClick={() => deleteCartItem(params.row._id)}
            >
              Delete
            </div>
          </div> */}
        </TableCell>
      ),
    },
  ];
  return (
    <div className="datatable font-serif text-sm ">
      <div className="datatableTitle">
        <h2 className="text-2xl font-serif font-extraligh tracking-wider leading-10 text-main">
          Cart Items
        </h2>
        <button
          onClick={handleExport}
          className="export-button bg-logoClr text-white p-2 px-3 rounded ml-4 font-roboto"
        >
          Download
        </button>
      </div>

      {!customerData || customerData.length === 0 ? (
        <p>NO any Order till now</p>
      ) : (
        <DataGrid
          className="datagrid"
          rows={rows}
          columns={cartColumns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onRowClick={handleRowClick}
          filterModel={filterModel}

          onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}

        />
      )}
    </div>
  );
};

export default OrderTable;
