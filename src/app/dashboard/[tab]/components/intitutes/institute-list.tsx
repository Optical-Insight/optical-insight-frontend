import React, { useEffect, useState } from "react";
import {
  InstituteListAllProps,
  InstituteAllRowProps,
} from "@/utils/interfaces";

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
import { useRouter } from "next/navigation";

const InstituteListAll = ({ setActiveHeading }: InstituteListAllProps) => {
  const { replace } = useRouter();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [accessToken, setAccessToken] = useState("");
  const [rows, setRows] = useState<InstituteAllRowProps[]>([]);

  const adminBaseUrl = process.env.NEXT_PUBLIC_ADMIN_BASE_URL;
  const getAllInstitutesUrl = `${adminBaseUrl}/clinics/`;

  useEffect(() => {
    const storedAuthData = localStorage.getItem("authData");

    if (storedAuthData) {
      const authData = JSON.parse(storedAuthData);
      const token = authData.accessToken;
      // const refreshToken = authData.refreshToken;
      // const userType = authData.userType;
      // const userId = authData.userId;
      setAccessToken(token);
    } else {
      console.error("No authentication data found.");
      replace("/auth/login/sys-admin");
    }
  }, []);

  const createData = (
    id: string,
    name: string,
    location: string,
    status?: string,
    email?: string,
    action?: string
  ): InstituteAllRowProps => {
    return { id, name, location, status, email, action };
  };

  const fetchAllInstitutes = async () => {
    axios
      .get(getAllInstitutesUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const row = response.data.map(
          (institute: { id: string; name: string; location: string }) =>
            createData(institute.id, institute.name, institute.location)
        );
        setRows(row);
      })
      .catch((err) => {
        console.error("Error in retriving data", err.response.data);
      });
  };

  useEffect(() => {
    fetchAllInstitutes();
  }, [accessToken]);

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
                <TableCell className="font-bold">Name</TableCell>
                <TableCell className="font-bold">Location</TableCell>
                <TableCell className="font-bold">Status</TableCell>
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
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.status}</TableCell>
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

export default InstituteListAll;
