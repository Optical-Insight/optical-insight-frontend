import React, { useEffect, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import { TableHead } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TablePaginationActions from "@/app/components/common/table-pagination";
import CommonRegisterBtn from "@/app/components/common/registerButton";
import { Spin } from "antd";
import { ListAllInstituteProps } from "@/utils/institute";
import axios from "axios";
import { DELETE_USER_BY_ID_URL, GET_ALL_USERS_URL } from "@/constants/config";
import { useAuth } from "@/context/AuthContext";
import ModalConfirm from "@/app/components/common/modal-confirm";
import toast, { Toaster } from "react-hot-toast";
import ModalInfoInstituteHead from "@/app/components/institute-head/modal-info-institute-head";
import SearchComponent from "@/app/components/common/search-component";
import { optionsHeadType } from "@/constants/data";

const InstituteHeadListAll = ({
  setActiveHeading,
  clickedRow,
  setClickedRow,
}: ListAllInstituteProps) => {
  const { isAuthenticated, storedAuthData } = useAuth();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRows, setFilteredRows] = useState<any[]>([]);
  const [type, setType] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
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

  const handleEdit = (row: any) => {
    console.log("Edit clicked", row);
    setIsInfoModalOpen(false);
    setActiveHeading && setActiveHeading(2);
  };

  const handleDelete = (row: any) => {
    console.log("Delete clicked", row);
    setIsInfoModalOpen(false);
    setIsConfirmModalOpen(true);
  };

  const fetchAllHeads = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(GET_ALL_USERS_URL, {
        headers: {
          Authorization: `Bearer ${storedAuthData.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const filteredHeads = response.data.filter(
        (head: any) => head.type === "director" || head.type === "sDirector"
      );

      console.log("filteredHeads", filteredHeads);
      setRows(filteredHeads);
      setFilteredRows(filteredHeads);
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
      fetchAllHeads();
    } else {
      console.error("No authentication data found.");
    }
  }, [storedAuthData.accessToken]);

  const handleSubmitDelete = async () => {
    setIsLoading(true);
    await axios
      .delete(`${DELETE_USER_BY_ID_URL}${clickedRow?.userId}`, {
        headers: {
          Authorization: `Bearer ${storedAuthData.accessToken}`,
        },
      })
      .then((res) => {
        toast.success("Branch Head Deleted successfully");
        console.log("Branch Head Deleted successfully", res);
        setIsLoading(false);
        fetchAllHeads();
      })
      .catch((err) => {
        toast.error("Error in deleting Branch Head. Please try again.");
        console.error(
          "Error in deleting Branch Head",
          err.response?.data || err
        );
        setIsLoading(false);
      });
    setIsConfirmModalOpen(false);
  };

  const filterHeads = (term: string, selectedType: string) => {
    const lowerCaseTerm = term.toLowerCase();

    const filtered = rows.filter((row) => {
      const matchesSearchTerm =
        row.userId.toLowerCase().includes(lowerCaseTerm) ||
        row.name.toLowerCase().includes(lowerCaseTerm) ||
        row.branchId.toLowerCase().includes(lowerCaseTerm);

      const matchesType = selectedType === "" || row.type === selectedType;

      return matchesSearchTerm && matchesType;
    });

    setFilteredRows(filtered);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setType(value);
    filterHeads(searchTerm, value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterHeads(value, type);
  };

  const handleRowClick = (row: any) => {
    console.log("Row clicked", row);
    setClickedRow(row);
    setIsInfoModalOpen(true);
  };

  return (
    <div>
      <div>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            success: {
              style: {
                marginRight: "20%",
                marginTop: "20px",
                background: "rgb(219, 234, 254)",
              },
            },
            error: {
              style: {
                marginRight: "20%",
                marginTop: "20px",
                background: "rgb(219, 234, 254)",
              },
            },
          }}
        />
      </div>

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
      <div className="flex bg-lightBlueBg w-full rounded-xl py-[16px] px-[20px] mb-[25px] justify-between gap-[20px] xl:gap-[50px]">
        <SearchComponent
          label="Search Doctors"
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          placeholder="Search by User ID, Name, or Branch ID"
        />

        <div className="flex flex-col flex-grow">
          <label className="text-labelText text-[16px] mb-[6px]">
            {"Filter by Status"}
          </label>
          <select
            value={type}
            onChange={handleTypeChange}
            className="px-2 h-[40px] bg-white rounded-lg text-darkText text-[16.99px] w-full"
          >
            {optionsHeadType.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-[45px]">
        <TableContainer component={Paper} className="rounded-lg">
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow className="bg-lightBlueBg font-bold h-[4.016vh]">
                <TableCell className="font-bold">User ID</TableCell>
                <TableCell className="font-bold">Name</TableCell>
                <TableCell className="font-bold">Type</TableCell>
                {/* <TableCell className="font-bold">Email</TableCell> */}
                <TableCell className="font-bold">Branch ID</TableCell>
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
                    ? filteredRows.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : filteredRows
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
                      <TableCell>
                        {row.type === "director"
                          ? "Branch Head"
                          : "Institute Head"}
                      </TableCell>
                      {/* <TableCell>{row.email}</TableCell> */}
                      <TableCell>{row.branchId}</TableCell>
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

      {/* Info Modal */}
      <ModalInfoInstituteHead
        updateLabel="Update"
        deleteLabel="Delete"
        isOpen={isInfoModalOpen}
        clickedRow={clickedRow}
        onClose={() => setIsInfoModalOpen(false)}
        onEdit={() => clickedRow && handleEdit(clickedRow)}
        onDelete={() => clickedRow && handleDelete(clickedRow)}
      />

      {/* Delete Confirm Modal */}
      <ModalConfirm
        title={`Confirm Delete Branch Head - ${clickedRow?.userId}`}
        message="Are you sure you want to delete this Branch Head?"
        confirmLabel="Delete"
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleSubmitDelete}
        isLoading={isLoading}
      />
    </div>
  );
};

export default InstituteHeadListAll;
