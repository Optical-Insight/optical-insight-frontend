import React from "react";
import { InstituteListAllProps } from "@/utils/interfaces";
import CommonBtn from "@/app/components/common/button";
import rows from "./table-data";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableFooter from "@mui/material/TableFooter";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import TablePaginationActions from "./table-pagination";
// import { TableHead } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";

const InstituteListAll = ({ setActiveHeading }: InstituteListAllProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // const handleChangePage = (
  //   event: React.MouseEvent<HTMLButtonElement> | null,
  //   newPage: number
  // ) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event: any) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  return (
    <div>
      <div className="flex justify-between mb-[25px] items-center ">
        <div className="text-darkText font-bold text-4xl lg:text-[40px] ">
          List of all Institutes
        </div>
        <div className="flex h-[42px] w-[221px] ">
          <CommonBtn
            label="Register new Institute"
            onClick={() => setActiveHeading && setActiveHeading(2)}
          />
        </div>
      </div>

      {/* Filter */}
      <div className="flex bg-lightBlueBg w-full rounded-xl py-[16px] px-[20px] mb-[25px] justify-between ">
        {/* Search for an Institute */}
        <div className="flex flex-col">
          <label className="text-labelText text-[16px] mb-[6px]">
            Search for an Institute
          </label>
          <input
            type="search"
            placeholder="Search Institute by name"
            className="flex-grow h-[40px] bg-white rounded-lg text-inputText text-[16.99px]"
          />
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <label className="text-labelText text-[16px] mb-[6px]">Status</label>
          <select
            name="status"
            className="h-[40px] bg-white rounded-lg text-inputText text-[16.99px]"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label className="text-labelText text-[16px] mb-[6px]">
            Location
          </label>
          <select
            name="location"
            className="h-[40px] bg-white rounded-lg text-inputText text-[16.99px]"
          >
            <option value="colombo">Colombo</option>
            <option value="kandy">Kandy</option>
            <option value="gampaha">Gampaha</option>
          </select>
        </div>
      </div>

      {/* Table - MUI */}
      {/* <div className="mb-[45px]">
        <TableContainer component={Paper} className="rounded-lg">
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow className="bg-lightBlueBg font-bold h-[4.016vh]">
                <TableCell className="font-bold">Name</TableCell>
                <TableCell className="font-bold">Status</TableCell>
                <TableCell className="font-bold">Location</TableCell>
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
      </div> */}
    </div>
  );
};

export default InstituteListAll;
