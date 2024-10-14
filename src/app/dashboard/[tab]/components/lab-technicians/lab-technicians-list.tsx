import React, { useEffect, useState } from "react";
import { ListAllProps, TechniciansAllProps } from "@/utils/interfaces";

import SearchFilter from "@/app/components/common/search-filter";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePaginationActions from "./table-pagination";
import { TableHead } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import CommonRegisterBtn from "@/app/components/common/registerButton";
import { GET_ALL_USERS_URL } from "@/constants/config";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { Spin } from "antd";
import ModalInfoLabTechnician from "@/app/components/lab-technician/modal-info-lab-technician";

const TechnicianListAll = ({ setActiveHeading }: ListAllProps) => {
  const { isAuthenticated, storedAuthData } = useAuth();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = useState<TechniciansAllProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [clickedRow, setClickedRow] = useState<TechniciansAllProps | null>(
    null
  );
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const createTechnicianData = (
    id: string,
    name: string,
    email: string,
    userId: string,
    type: string
  ): TechniciansAllProps => {
    return { id, name, email, userId, type };
  };

  const fetchAllTechnicians = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(GET_ALL_USERS_URL, {
        headers: {
          Authorization: `Bearer ${storedAuthData.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      // Filter technicians based on their type
      const filteredTechnicians = response.data.filter(
        (technician: TechniciansAllProps) => technician.type === "mlt"
      );

      // Map the filtered technicians to the desired format
      const row = filteredTechnicians.map((technician: TechniciansAllProps) =>
        createTechnicianData(
          technician.id,
          technician.name,
          technician.email,
          technician.userId,
          technician.type
        )
      );

      // Set the rows with filtered data
      setRows(row);
      setIsLoading(false);
    } catch (err: any) {
      console.error(
        "Error in retrieving data",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    if (isAuthenticated && storedAuthData) {
      fetchAllTechnicians();
    } else {
      console.error("No authentication data found.");
    }
  }, [storedAuthData.accessToken]);

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

  const handleRowClick = (row: any) => {
    console.log("Row clicked", row);
    setClickedRow(row);
    setIsInfoModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between mb-[25px] items-center ">
        <div className="text-darkText font-bold text-4xl lg:text-[40px]">
          List of all Lab Technicians
        </div>
        <div className="flex h-[42px]">
          <CommonRegisterBtn
            label="Register new Lab Technician"
            onClick={() => setActiveHeading && setActiveHeading(2)}
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

      {/* Table - MUI */}
      <div className="mb-[45px]">
        <TableContainer component={Paper} className="rounded-lg">
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow className="bg-lightBlueBg font-bold h-[4.016vh]">
                <TableCell className="font-bold">Lab Technician ID</TableCell>
                <TableCell className="font-bold">Name</TableCell>
                <TableCell className="font-bold">Email</TableCell>
                <TableCell className="font-bold">None</TableCell>
                <TableCell className="font-bold">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <>
                  <TableRow className="h-[20vw]">
                    <TableCell
                      colSpan={5}
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
                    <TableRow
                      key={row.id}
                      hover
                      style={{ cursor: "pointer" }}
                      onClick={() => handleRowClick(row)}
                    >
                      <TableCell component="th" scope="row">
                        {row.userId}
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell></TableCell>
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
                        colSpan={5}
                        align="center"
                        style={{ textAlign: "center", verticalAlign: "middle" }}
                      >
                        <p className="text-xl text-gray-600 font-semibold">
                          {" "}
                          No Lab Technicians Found
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

      {/* Info Modal */}
      <ModalInfoLabTechnician
        updateLabel="Update"
        deleteLabel="Delete"
        isOpen={isInfoModalOpen}
        clickedRow={clickedRow}
        onClose={() => setIsInfoModalOpen(false)}
        onEdit={() => console.log("Edit clicked")}
        onDelete={() => console.log("Delete clicked")}
      />
    </div>
  );
};

export default TechnicianListAll;
