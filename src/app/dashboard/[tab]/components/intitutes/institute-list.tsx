import React, { useEffect, useState } from "react";
import { ListAllProps, InstituteAllRowProps } from "@/utils/interfaces";

// import rows from "./table-data";
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
import SearchFilter from "@/app/components/common/search-filter";
import CommonRegisterBtn from "@/app/components/common/registerButton";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { GET_ALL_INSTITUTES_URL } from "@/constants/config";
import ModalInfo from "@/app/components/common/modal-info";

const InstituteListAll = ({ setActiveHeading }: ListAllProps) => {
  const { isAuthenticated, storedAuthData } = useAuth();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState<InstituteAllRowProps[]>([]);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [clickedRow, setClickedRow] = useState<InstituteAllRowProps | null>(
    null
  );

  const createData = (
    id: string,
    clinicId: string,
    name: string,
    location: string,
    phone?: string,
    email?: string,
    action?: string
  ): InstituteAllRowProps => {
    return { id, clinicId, name, location, phone, email, action };
  };

  const fetchAllInstitutes = async () => {
    axios
      .get(GET_ALL_INSTITUTES_URL, {
        headers: {
          Authorization: `Bearer ${storedAuthData.accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const row = response.data.map(
          (institute: {
            _id: string; // Ensure this is the correct key for the ID
            clinicId: string;
            name: string;
            location: string;
            phone: string;
            email: string;
          }) =>
            createData(
              institute._id, // Ensure that institute.id exists in the API response
              institute.clinicId,
              institute.name,
              institute.location,
              institute.phone,
              institute.email
            )
        );
        setRows(row);
      })
      .catch((err) => {
        console.error("Error in retrieving data", err.response.data);
      });
  };

  useEffect(() => {
    if (isAuthenticated && storedAuthData) {
      fetchAllInstitutes();
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
        <div className="text-darkText font-bold text-4xl lg:text-[40px] ">
          List of all Institutes
        </div>
        <div className="flex h-[42px]">
          <CommonRegisterBtn
            label="Register new Institute"
            onClick={() => setActiveHeading && setActiveHeading(2)}
          />
        </div>
      </div>

      {/* Filter */}
      <SearchFilter
        labelSearch="Search for an Institute"
        labelSelectOne="Status"
        labelSelectTwo="Location"
        placeholderSearch="Search Institute by name"
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
                <TableCell className="font-bold">Institute ID</TableCell>
                <TableCell className="font-bold">Name</TableCell>
                <TableCell className="font-bold">Location</TableCell>
                <TableCell className="font-bold">Contact Number</TableCell>
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
                <TableRow
                  key={row.id}
                  hover
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    console.log("Row clicked", row);
                    setClickedRow(row);
                    setIsInfoModalOpen(true);
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.clinicId}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.phone}</TableCell>
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

      {/* Info Modal */}
      <ModalInfo
        id={clickedRow?.clinicId ?? ""}
        title="Test Info Modal"
        confirmLabel="Edit"
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        onEdit={() => console.log("Edit clicked")}
        onDelete={() => console.log("Delete clicked")}
      />
    </div>
  );
};

export default InstituteListAll;
