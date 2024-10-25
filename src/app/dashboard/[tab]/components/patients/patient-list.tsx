import React, { useEffect, useState } from "react";
import { ListAllPatientProps, PatientsAllProps } from "@/utils/patient";
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
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommonRegisterBtn from "@/app/components/common/registerButton";
import {
  GET_ALL_USERS_BY_TYPE_URL,
  DELETE_USER_BY_ID_URL,
} from "@/constants/config";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { Spin } from "antd";
import ModifyBtn from "@/app/components/common/button-modify";
import ModalConfirm from "@/app/components/common/modal-confirm";
import toast, { Toaster } from "react-hot-toast";

const PatientListAll = ({
  setActiveHeading,
  setIsInfoModalOpen,
  setClickedRow,
}: ListAllPatientProps) => {
  const { isAuthenticated, storedAuthData } = useAuth();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = useState<PatientsAllProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modifyId, setModifyId] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchAllPatients = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(GET_ALL_USERS_BY_TYPE_URL, {
        headers: {
          Authorization: `Bearer ${storedAuthData.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      // Filter patients based on their type
      const filteredPatients = response.data.filter(
        (patient: PatientsAllProps) => patient.type === "patient"
      );

      // Set the rows with filtered data
      setRows(filteredPatients);
      setIsLoading(false);
    } catch (err: any) {
      console.error(
        "Error in retrieving data",
        err.response?.data || err.message
      );
    }
  };

  const handleUpdatePatient = async (patientId: string) => {
    setModifyId(patientId);
    console.log("Update patient with id: ", patientId);
  };

  const handleDeletePatient = async (patientId: string) => {
    setModifyId(patientId);
    console.log("Delete patient with id: ", patientId);
    setShowDeleteModal(true);
  };

  const handleSubmitDelete = async () => {
    console.log("Confirmed Deletion of patient with id: ", modifyId);
    setIsLoading(true);

    await axios
      .delete(`${DELETE_USER_BY_ID_URL}${modifyId}`, {
        headers: {
          Authorization: `Bearer ${storedAuthData.accessToken}`,
        },
      })
      .then((res) => {
        console.log("Patient deleted successfully", res.data);
        toast.success("Patient deleted successfully");
        setIsLoading(false);
        fetchAllPatients();
      })
      .catch((err) => {
        console.error("Error in deleting patient", err);
        toast.error("Error in deleting patient. Please try again.");
        setIsLoading(false);
      });
    setShowDeleteModal(false);
  };

  useEffect(() => {
    if (isAuthenticated && storedAuthData) {
      fetchAllPatients();
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

  // calculates age
  const calculateAge = (dateOfBirth: string) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birth date has not occurred yet this year
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
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
          List of all Patients
        </div>
        <div className="flex h-[42px]">
          <CommonRegisterBtn
            label="Register new Patient"
            onClick={() => setActiveHeading && setActiveHeading(2)}
          />
        </div>
      </div>

      {/* Filter */}
      <SearchFilter
        labelSearch="Search for a Patient"
        labelSelectOne="Status"
        labelSelectTwo="Location"
        placeholderSearch="Search by Name or Patient ID"
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
                <TableCell className="font-bold">Patient ID</TableCell>
                <TableCell className="font-bold">Name</TableCell>
                <TableCell className="font-bold">Address</TableCell>
                <TableCell className="font-bold">Sex</TableCell>
                <TableCell className="font-bold">Age</TableCell>
                <TableCell className="font-bold">Phone Number</TableCell>
                <TableCell className="font-bold">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <>
                  <TableRow className="h-[20vw] cursor-pointer">
                    <TableCell
                      colSpan={7}
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
                      key={row.userId}
                      hover
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setClickedRow && setClickedRow(row);
                        setIsInfoModalOpen && setIsInfoModalOpen(true);
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.userId}
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>{row.sex}</TableCell>
                      <TableCell>{calculateAge(row.dateOfBirth)}</TableCell>
                      <TableCell>{row.phone}</TableCell>
                      <TableCell>
                        <div className="inline-flex gap-2">
                          <div className="h-9 xl:h-11 w-9 xl:w-11">
                            <ModifyBtn
                              label="Update"
                              onClick={(
                                e: React.MouseEvent<HTMLButtonElement>
                              ) => {
                                e.stopPropagation();
                                setClickedRow && setClickedRow(row);
                                handleUpdatePatient(row.userId);
                              }}
                            />
                          </div>
                          <div className="h-9 xl:h-11 w-9 xl:w-11">
                            <ModifyBtn
                              label="Delete"
                              onClick={(
                                e: React.MouseEvent<HTMLButtonElement>
                              ) => {
                                e.stopPropagation();
                                setClickedRow && setClickedRow(row);
                                handleDeletePatient(row.userId);
                              }}
                            />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow className="h-[20vw]">
                      <TableCell
                        colSpan={7}
                        align="center"
                        style={{ textAlign: "center", verticalAlign: "middle" }}
                      >
                        <p className="text-xl text-gray-600 font-semibold">
                          {" "}
                          No Patients Found
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
                  colSpan={7}
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

      {/* Delete Confirm Modal */}
      <ModalConfirm
        title={`Confirm Delete Patient - ${modifyId}`}
        message="Are you sure you want to delete this patient?"
        confirmLabel="Delete"
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleSubmitDelete}
      />
    </div>
  );
};

export default PatientListAll;
