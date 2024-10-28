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
import CommonRegisterBtn from "@/app/components/common/registerButton";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import {
  DELETE_INSTITUTE_BY_ID_URL,
  GET_ALL_INSTITUTES_URL,
} from "@/constants/config";
import ModalInfo from "@/app/components/branch/modal-info-branch";
import { Spin } from "antd";
import ModalConfirm from "@/app/components/common/modal-confirm";
import SearchComponent from "@/app/components/common/search-component";
import { optionsInstituteLocations } from "@/constants/data";
import toast, { Toaster } from "react-hot-toast";

const BranchListAll = ({
  setActiveHeading,
  clickedRow,
  setClickedRow,
}: ListAllBranchProps) => {
  const { isAuthenticated, storedAuthData } = useAuth();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState<BranchAllRowProps[]>([]);
  const [originalRows, setOriginalRows] = useState<BranchAllRowProps[]>([]);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");

  const fetchAllBranches = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(GET_ALL_INSTITUTES_URL, {
        headers: {
          Authorization: `Bearer ${storedAuthData.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      // Extract branches from the response
      const institutes = response.data;
      const allBranches = institutes.flatMap((institute: any) =>
        institute.branches.map((branch: any) => ({
          branchId: branch.branchId,
          clinicId: institute.clinicId,
          location: branch.location,
          phone: branch.phone,
          numberOfPatients: branch.numberOfPatients,
          numberOfLabTechnicians: branch.numberOfLabTechnicians,
          specialServices: branch.specialServices,
          comments: branch.comments,
        }))
      );

      console.log("All branches", allBranches);
      // Set the flattened branches to the state
      setRows(allBranches);
      setOriginalRows(allBranches);
    } catch (err: any) {
      console.error(
        "Error in retrieving data",
        err.response?.data || err.message
      );
    } finally {
      setIsLoading(false);
    }
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
    setIsLoading(true);
    console.log("Delete confirmed");

    await axios
      .delete(
        `${DELETE_INSTITUTE_BY_ID_URL}${clickedRow.clinicId}/branches/${clickedRow.branchId}`,
        {
          headers: {
            Authorization: `Bearer ${storedAuthData.accessToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("Institue Deleted successfully");
        console.log("Institue Deleted successfully", res);
        setIsLoading(false);
        fetchAllBranches();
      })
      .catch((err) => {
        toast.error("Error in Institue patient. Please try again.");
        console.error("Error in Institue patient", err.response?.data || err);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
        setIsConfirmModalOpen(false);
      });
  };

  const filterInstiutes = (term: string, selectedLocation: string) => {
    const lowerCaseTerm = term.toLowerCase();

    // If search term is cleared, reset rows to original data
    const filtered =
      term || selectedLocation
        ? originalRows.filter((row) => {
            const matchesSearchTerm =
              row.clinicId.toLowerCase().includes(lowerCaseTerm) ||
              row.branchId.toLowerCase().includes(lowerCaseTerm);

            const matchesLocation =
              selectedLocation === "" ||
              row.location
                .toLowerCase()
                .includes(selectedLocation.toLowerCase());

            return matchesSearchTerm && matchesLocation;
          })
        : originalRows;

    setRows(filtered);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLocation(value);
    filterInstiutes(searchTerm, value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterInstiutes(value, location);
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
      <div className="flex bg-lightBlueBg w-full rounded-xl py-[16px] px-[20px] mb-[25px] justify-between gap-[20px] xl:gap-[50px]">
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
      </div>

      {/* Table - MUI */}
      <div className="mb-[45px]">
        <TableContainer component={Paper} className="rounded-lg">
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow className="bg-lightBlueBg font-bold h-[4.016vh]">
                <TableCell className="font-bold">Institute ID</TableCell>
                <TableCell className="font-bold">Branch ID</TableCell>
                <TableCell className="font-bold">Location</TableCell>
                <TableCell className="font-bold">Contact Number</TableCell>
                <TableCell className="font-bold">Lab Tech. Count</TableCell>
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
                      <TableCell>{row.branchId}</TableCell>
                      <TableCell>{row.location}</TableCell>
                      <TableCell>{row.phone}</TableCell>
                      <TableCell>{row.numberOfLabTechnicians}</TableCell>
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
