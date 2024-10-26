import React, { useEffect, useState } from "react";
import { BranchAllRowProps } from "@/utils/branch";
import { ListAllBranchProps } from "@/utils/branch";
// import rows from "./table-data";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePaginationActions from "@/app/components/common/table-pagination";
import { TableHead } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchFilter from "@/app/components/common/search-filter";
import CommonRegisterBtn from "@/app/components/common/registerButton";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { GET_ALL_INSTITUTES_URL } from "@/constants/config";
import ModalInfo from "@/app/components/branch/modal-info-branch";
import { Spin } from "antd";
import ModalConfirm from "@/app/components/common/modal-confirm";

const BranchListAll = ({
  setActiveHeading,
  clickedRow,
  setClickedRow,
}: ListAllBranchProps) => {
  const { isAuthenticated, storedAuthData } = useAuth();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState<BranchAllRowProps[]>([]);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const createData = (
    id: string,
    clinicId: string,
    name: string,
    location: string,
    phone?: string,
    email?: string,
    action?: string
  ): BranchAllRowProps => {
    return { id, clinicId, name, location, phone, email, action };
  };

  const fetchAllBranches = async () => {
    setIsLoading(true);
    await axios
      .get(GET_ALL_INSTITUTES_URL, {
        headers: {
          Authorization: `Bearer ${storedAuthData.accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const row = response.data.map(
          (branch: {
            _id: string; // Ensure this is the correct key for the ID
            clinicId: string;
            name: string;
            location: string;
            phone: string;
            email: string;
          }) =>
            createData(
              branch._id, // Ensure that branch.id exists in the API response
              branch.clinicId,
              branch.name,
              branch.location,
              branch.phone,
              branch.email
            )
        );

        setRows(row);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error in retrieving data", err.response.data);
      });
  };

  useEffect(() => {
    if (isAuthenticated && storedAuthData) {
      fetchAllBranches();
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

  const handleEdit = (row: BranchAllRowProps) => {
    console.log("Edit clicked", row);
    setIsInfoModalOpen(false);
    setActiveHeading && setActiveHeading(2);
  };

  const handleDelete = (row: BranchAllRowProps) => {
    console.log("Delete clicked", row);
    setIsInfoModalOpen(false);
    setIsConfirmModalOpen(true);
  };

  const handleAddNew = () => {
    setActiveHeading && setActiveHeading(2);
    setClickedRow(null);
  };

  const handleDeleteInstiute = async () => {
    console.log("Delete confirmed");
    setIsConfirmModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between mb-[25px] items-center ">
        <div className="text-darkText font-bold text-4xl lg:text-[40px] ">
          List of all Branches
        </div>
        <div className="flex h-[42px]">
          <CommonRegisterBtn
            label="Register new Branch"
            onClick={handleAddNew}
          />
        </div>
      </div>

      {/* Filter */}
      <SearchFilter
        labelSearch="Search for an Branch"
        labelSelectOne="Status"
        labelSelectTwo="Location"
        placeholderSearch="Search Branch by name"
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
                <TableCell className="font-bold">Branch ID</TableCell>
                <TableCell className="font-bold">Name</TableCell>
                <TableCell className="font-bold">Location</TableCell>
                <TableCell className="font-bold">Contact Number</TableCell>
                <TableCell className="font-bold">Email</TableCell>
                {/* <TableCell className="font-bold">Action</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <>
                  <TableRow className="h-[20vw]">
                    <TableCell
                      colSpan={6}
                      align="center"
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <Spin size="large" />
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <>
                  {" "}
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
                        {row.clinicId}
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.location}</TableCell>
                      <TableCell>{row.phone}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      {/* <TableCell>
                        <div>
                          <MoreVertIcon />
                        </div>
                      </TableCell> */}
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow className="h-[20vw]">
                      <TableCell
                        colSpan={6}
                        align="center"
                        style={{ textAlign: "center", verticalAlign: "middle" }}
                      >
                        <p className="text-xl text-gray-600 font-semibold">
                          {" "}
                          No Insititues Found
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
                  colSpan={6}
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
      <ModalInfo
        updateLabel="Update"
        deleteLabel="Delete"
        isOpen={isInfoModalOpen}
        clickedRow={clickedRow}
        onClose={() => setIsInfoModalOpen(false)}
        onEdit={() => clickedRow && handleEdit(clickedRow)}
        onDelete={() => clickedRow && handleDelete(clickedRow)}
      />

      {/* Delete confirm modal */}
      <ModalConfirm
        title="Confirm Intitute Deletion"
        message="Are you sure you want to permenantly delete this branch?"
        confirmLabel="Delete"
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleDeleteInstiute}
      />
    </div>
  );
};

export default BranchListAll;
