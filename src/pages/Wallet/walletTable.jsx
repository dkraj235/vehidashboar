import React, { useState, useContext, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { CustomerContext } from "../../context/customrContext";
import { TransactionContext } from "../../context/transactonContext";
import loadingGIf from "../../images/loading.gif";
const WalletTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { customerData } = useContext(CustomerContext);
  const [isLoading, setIsLoading] = useState(true);
  const { transactionData } = useContext(TransactionContext);

  useEffect(() => {
    setIsLoading(false);
  }, [transactionData, customerData]);

  if (
    !transactionData ||
    transactionData.length === 0 ||
    !customerData ||
    customerData.length === 0
  ) {
    return (
      <div className="flex justify-center items-center">
        <img className="w-32 h-32" src={loadingGIf} alt="" />
      </div>
    );
  }

  // Filter customer data based on transactions
  const filterCustomer = customerData.filter((customerDetails) =>
    transactionData.some((item) => item.customer === customerDetails._id)
  );

  // Map customer data
  const customerMap = new Map();
  filterCustomer.forEach((customer) => {
    customerMap.set(customer._id, {
      customerName: customer.customerName,
      customerPhone: customer.customerPhone,
    });
  });

  // Create rows with transaction data
  const rows = transactionData
    .filter((transaction) => customerMap.has(transaction.customer))
    .map((transaction) => ({
      id: transaction._id,
      amount: transaction.amount,
      date: transaction.date,
      paymentType: transaction.paymentType,
      customerName: customerMap.get(transaction.customer)?.customerName || null,
      customerPhone:
        customerMap.get(transaction.customer)?.customerPhone || null,
    }));

  const columns = [
    { id: "customerName", label: "Customer Name", align: "left" },
    { id: "customerPhone", label: "Customer Phone", align: "left" },
    { id: "paymentType", label: "Payment Type", align: "left" },
    { id: "amount", label: "Amount", align: "right" },
    { id: "date", label: "Date", align: "left" },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="wallet px-10">
      <Paper sx={{ width: "100%" }}>
        <TextField
          label="Search"
          variant="outlined"
          style={{ margin: 10, width: "30%" }}
        />

        <Link
          to="/dashboard/customers/wallet/add-wallet"
          className="link flex justify-end"
        >
          <Button
            style={{ marginRight: "100px", backgroundColor: "#ff5722" }}
            variant="contained"
          >
            Add Wallet
          </Button>
        </Link>
        {customerData.length === 0 ? (
          <p className="p-4 text-black font-bold text-xs tracking-wide">
            Oops! there is no any transactions
          </p>
        ) : (
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.id}>
                      {columns.map((column) => (
                        <TableCell key={column.id} align={column.align}>
                          {row[column.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default WalletTable;
