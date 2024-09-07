import React, { useEffect, useState } from "react";
import { ListAllProps, PatientsAllProps } from "@/utils/interfaces";
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
import { GET_ALL_USERS_BY_TYPE_URL } from "@/constants/config";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import ModalInfoPatient from "@/app/components/common/modal-info-patient";

const PatientListAll = ({ setActiveHeading }: ListAllProps) => {
  const { isAuthenticated, storedAuthData } = useAuth();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = useState<PatientsAllProps[]>([]);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [clickedRow, setClickedRow] = useState<PatientsAllProps | undefined>(
      undefined
  );

  const createPatientData = (
    id: string,
    name: string,
    address: string,
    sex: string,
    age: Number,
    phone: string,
    email: string,
    userId: string,
    type: string
  ): PatientsAllProps => {
    return { id, name, address, sex, age, phone, email, userId, type };
  };

  const fetchAllPatients = async () => {
    try {
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

      // Map the filtered patients to the desired format
      const row = filteredPatients.map((patient: PatientsAllProps) =>
        createPatientData(
          patient.id,
          patient.name,
          patient.address,
          patient.sex,
          patient.age,
          patient.phone,
          patient.email,
          patient.userId,
          patient.type
        )
      );

      // Set the rows with filtered data
      setRows(row);
      console.log("Patients data", row);
    } catch (err: any) {
      console.error(
        "Error in retrieving data",
        err.response?.data || err.message
      );
    }
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
  return (
    <div>
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
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row) => (
                <TableRow key={row.id}
                hover
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    console.log("Row clicked", row);
                    setClickedRow(row);
                    setIsInfoModalOpen(true);
                  }}>
                  <TableCell component="th" scope="row">
                    {row.userId}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.sex}</TableCell>
                  <TableCell>{String(row.age)}</TableCell>
                  <TableCell>{row.phone}</TableCell>
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

      {/* Info Modal */}
      <ModalInfoPatient
        setActiveHeading={setActiveHeading}
        id="info-modal"
        clickedRow={clickedRow}
        title={clickedRow?.name ?? ""}
        confirmLabel="Edit"
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        onEdit={() => console.log("Edit clicked")}
        onAddRecord={() => console.log("Add Record clicked")}
      />

    </div>
  );
};

export default PatientListAll;
