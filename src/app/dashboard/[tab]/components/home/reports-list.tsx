import React, { useEffect, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import { TableHead } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TablePaginationActions from "./table-pagination";
import SearchFilter from "@/app/components/common/search-filter";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { GET_ALL_REPORTS } from "@/constants/config";
import { ReportListAllProps } from "@/utils/interfaces";
import { Spin } from "antd";
const ReportsList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState<ReportListAllProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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

  const { isAuthenticated, storedAuthData } = useAuth();

  const createReportData = (
    reportId: string,
    name: string,
    createdBy: string,
    patientId: string,
    leftEyeImageUrl: string,
    rightEyeImageUrl: string
  ): ReportListAllProps => {
    return {
      reportId,
      name,
      createdBy,
      patientId,
      leftEyeImageUrl,
      rightEyeImageUrl,
    };
  };

  const fetchAllReports = async () => {
    try {
      setIsLoading(true);
      await axios
        .get(GET_ALL_REPORTS, {
          headers: {
            Authorization: `Bearer ${storedAuthData.accessToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res.data);
          const row = res.data.map((report: ReportListAllProps) =>
            createReportData(
              report.reportId,
              report.name,
              report.createdBy,
              report.patientId,
              report.leftEyeImageUrl,
              report.rightEyeImageUrl
            )
          );
          setRows(row);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
      // const row = response.data.map((report: ReportListAllProps) =>
      //   createReportData(
      //     report.reportId,
      //     report.name,
      //     report.createdBy,
      //     report.patientId,
      //     report.leftEyeImageUrl,
      //     report.rightEyeImageUrl
      //   )
      // );

      // Set the rows with filtered data
    } catch (err: any) {
      console.error(
        "Error in retrieving data",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    if (isAuthenticated && storedAuthData) {
      fetchAllReports();
    } else {
      console.error("No authentication data found.");
    }
  }, [storedAuthData.accessToken]);

  return (
    <div>
      {/* Cards */}
      <div className="mt-5 h-auto grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row justify-between bg-lightBlueBg rounded-lg p-[1.563vh] gap-4 lg:gap-4">
        {/* Filter */}
        <SearchFilter
          labelSearch="Search for a Patient"
          labelSelectOne="Status"
          labelSelectTwo="Location"
          placeholderSearch="Search by Name or NIC"
          optionsSelectOne={[
            { value: "pending", label: "Pending" },
            { value: "verified", label: "Verified" },
            { value: "completed", label: "Completed" },
          ]}
          optionsSelectTwo={[
            { value: "colombo", label: "Colombo" },
            { value: "kandy", label: "Kandy" },
            { value: "gampaha", label: "Gampaha" },
          ]}
          onSearch={() => {}}
        />
      </div>

      <div className="mt-5 mb-[45px]">
        <TableContainer component={Paper} className="rounded-lg">
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow className="bg-lightBlueBg font-bold h-[4.016vh]">
                <TableCell className="font-bold">Report ID</TableCell>
                <TableCell className="font-bold">Report Name</TableCell>
                <TableCell className="font-bold">Patient ID</TableCell>
                <TableCell className="font-bold">Created By</TableCell>
                <TableCell className="font-bold">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <>
                  <TableRow className="h-[10vw]">
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
                    <TableRow key={row.reportId}>
                      <TableCell component="th" scope="row">
                        {row.reportId}
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.patientId}</TableCell>
                      <TableCell>{row.createdBy}</TableCell>
                      <TableCell>
                        <div>
                          <MoreVertIcon />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow className="h-[10vw]">
                      <TableCell
                        colSpan={5}
                        align="center"
                        style={{ textAlign: "center", verticalAlign: "middle" }}
                      >
                        <p className="text-xl text-gray-600 font-semibold">
                          {" "}
                          No Doctors Found
                        </p>
                      </TableCell>
                    </TableRow>
                  )}{" "}
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

export default ReportsList;
