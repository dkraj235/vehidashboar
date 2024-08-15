export const packageColumns = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "packageName",
    headerName: "Packages Name",
    width: 200,
  },
  {
    field: "packageTitle",
    headerName: "Title",
    width: 150,
  }, {
    field: "packageDescription",
    headerName: "Description",
    width: 120,
  }, {
    field: "packagePrice",
    headerName: "Price",
    width: 120,
  }, {
    field: "packageDiscount",
    headerName: "Discount",
    width: 80,
  }, {
    field: "packageImg",
    headerName: "Packages Image",
    width: 150,
    renderCell: (params) => (
      <img src={params.value} alt="Package Image" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
    ),
  },
];

