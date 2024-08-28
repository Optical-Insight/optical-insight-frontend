import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import { TableHead } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import rows from "./table-data";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TablePaginationActions from "./table-pagination";
import SearchFilter from "@/app/components/common/search-filter";

const ReportsList = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      {/* Cards */}
      <div className="mt-5 h-auto grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row justify-between bg-lightBlueBg rounded-lg p-[1.563vh] gap-4 lg:gap-4">
        {/* Filter */}
        <SearchFilter
          labelSearch="Search for a Patient"
          labelSelectOne="Status"
          labelSelectTwo="Location"
          placeholderSearch="Search by Name or NIC"
          optionsSelectOne={[
            { value: "pending", label: "Pending" },
            { value: "verified", label: "Verified" },
            { value: "completed", label: "Completed" },
          ]}
          optionsSelectTwo={[
            { value: "colombo", label: "Colombo" },
            { value: "kandy", label: "Kandy" },
            { value: "gampaha", label: "Gampaha" },
          ]}
          onSearch={() => {}}
        />
      </div>

      <div className="mt-5 mb-[45px]">
        <TableContainer component={Paper} className="rounded-lg">
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow className="bg-lightBlueBg font-bold h-[4.016vh]">
                <TableCell className="font-bold">Name</TableCell>
                <TableCell className="font-bold">Status</TableCell>
                <TableCell className="font-bold">Institute</TableCell>
                <TableCell className="font-bold">Email</TableCell>
                <TableCell className="font-bold">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    <div>
                      <MoreVertIcon />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter className="bg-lightBlueBg">
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={5}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ReportsList;
