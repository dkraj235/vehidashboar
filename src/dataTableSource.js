import { height } from "@mui/system";

export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "customerName",
    headerName: "Customer Name",
    width: 150,
  },
  {
    field: "customerEmail",
    headerName: "Email",
    width: 230,
  },
  {
    field: "customerPhone",
    headerName: "Phone",
    width: 150,
  },
  {
    field: "orders",
    headerName: "Vehicle Numbers",
    width: 250, 
    renderCell: (params) => {
      const vehicleNumbers = params.row.car_No; // Access vehicle numbers from row data
      return (
        <div className="flex  flex-col justify-start ">
          {vehicleNumbers.map((number, index) => (
            <div key={index} className="text-left text-xs font-semibold text-pretty">
              {number} <br />
            </div>
          ))}
        </div>


      );
    }
  },
];
