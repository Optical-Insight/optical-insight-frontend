import React, { useState } from "react";
import { ListAllProps } from "@/utils/interfaces";
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
import TablePaginationActions from "@/app/components/common/table-pagination";
import CommonRegisterBtn from "@/app/components/common/registerButton";
import { Spin } from "antd";
// import SearchComponent from "@/app/components/common/search-component";
import SearchFilter from "@/app/components/common/search-filter";

const InstituteHeadListAll = ({ setActiveHeading }: ListAllProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isLoading, setIsLoading] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [filteredRows, setFilteredRows] = useState<InstituteHeadsAllProps[]>([]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    setIsLoading(false); // need to remove
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const filterDoctors = (term: string, selectedSpecialization: string) => {
  //   const lowerCaseTerm = term.toLowerCase();

  //   const filtered = rows.filter((row) => {
  //     const matchesSearchTerm =
  //       row.userId.toLowerCase().includes(lowerCaseTerm) ||
  //       row.name.toLowerCase().includes(lowerCaseTerm);

  //     const matchesSpecialization =
  //       selectedSpecialization === "" ||
  //       row.specialization
  //         .toLowerCase()
  //         .includes(selectedSpecialization.toLowerCase());

  //     return matchesSearchTerm && matchesSpecialization;
  //   });

  //   setFilteredRows(filtered);
  // };

  // const handleSpecializationChange = (
  //   e: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   const value = e.target.value;
  //   setSpecialization(value);
  //   filterDoctors(searchTerm, value);
  // };

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setSearchTerm(value);
  //   filterDoctors(value, specialization);
  // };

  return (
    <div>
      <div className="flex justify-between mb-[25px] items-center ">
        <div className="text-darkText font-bold text-4xl lg:text-[40px]">
          List of all Institute Heads
        </div>
        <div className="flex h-[42px]">
          <CommonRegisterBtn
            label="Register new Institute Head"
            onClick={() => {
              setActiveHeading && setActiveHeading(2);
            }}
          />
        </div>
      </div>

      {/* Filter */}
      <SearchFilter
        labelSearch="Search for a Lab Technician"
        labelSelectOne="Status"
        labelSelectTwo="Location"
        placeholderSearch="Search by Name"
        optionsSelectOne={[
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
          { value: "pending", label: "Pending" },
        ]}
        optionsSelectTwo={[
          { value: "colombo", label: "Colombo" },
          { value: "kandy", label: "Kandy" },
          { value: "gampaha", label: "Gampaha" },
        ]}
        onSearch={() => {}}
      />

      {/* Filter */}
      {/* <div className="flex bg-lightBlueBg w-full rounded-xl py-[16px] px-[20px] mb-[25px] justify-between gap-[20px] xl:gap-[50px]">
        <SearchComponent
          label="Search Branches"
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          placeholder="Search by Institue ID, Name"
        />

        <div className="flex flex-col flex-grow">
          <label className="text-labelText text-[16px] mb-[6px]">
            {"Filter by Location"}
          </label>
          <select
            value={location}
            onChange={handleLocationChange}
            className="px-2 h-[40px] bg-white rounded-lg text-darkText text-[16.99px] w-full"
          >
            {optionsInstituteLocations.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div> */}

      <div className="mb-[45px]">
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
              {isLoading ? (
                <>
                  <TableRow className="h-[20vw]">
                    <TableCell
                      colSpan={4}
                      align="center"
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <Spin size="large" />
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <>
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
                    <TableRow className="h-[20vw]">
                      <TableCell
                        colSpan={4}
                        align="center"
                        style={{ textAlign: "center", verticalAlign: "middle" }}
                      >
                        <p className="text-xl text-gray-600 font-semibold">
                          {" "}
                          No Institute Heads Found
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </>
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

export default InstituteHeadListAll;
