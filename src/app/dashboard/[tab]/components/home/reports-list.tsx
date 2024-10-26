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
import SearchFilter from "@/app/components/common/search-filter";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { GET_ALL_REPORTS } from "@/constants/config";
import { ReportListAllProps } from "@/utils/interfaces";
import { Spin } from "antd";
import CommonBtn from "@/app/components/common/button";

const ReportsList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState<ReportListAllProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState<string[]>([]);
  const [filteredRows, setFilteredRows] = useState<ReportListAllProps[]>([]);

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
    status: string,
    leftEyeImageUrl: string,
    rightEyeImageUrl: string
  ): ReportListAllProps => {
    return {
      reportId,
      name,
      createdBy,
      patientId,
      status,
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
              report.status,
              report.leftEyeImageUrl,
              report.rightEyeImageUrl
            )
          );
          setRows(row);
          setFilteredRows(row);
          console.log("Rows", row);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));

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

  // const handleSearch = (searchTerm: string, status: string) => {
  //   console.log("Search Term", searchTerm);
  //   const filtered = rows.filter((row) => {
  //     const matchesSearchTerm =
  //       row.reportId.includes(searchTerm) ||
  //       row.patientId.includes(searchTerm) ||
  //       row.createdBy.includes(searchTerm);
  //     const matchesStatus = status ? row.status === status : true;
  //     return matchesSearchTerm && matchesStatus;
  //   });
  //   setFilteredRows(filtered);
  // };

  useEffect(() => {
    if (rows.length > 0) {
      setFilteredRows(rows);
    }
  }, [rows]);

  // const generateReport = async () => {
  //   const response = await fetch("http://localhost:3000/pdf");
  //   const blob = await response.blob();
  //   const url = window.URL.createObjectURL(blob);
  //   window.open(url, "_blank");
  // };

  const generateReport = async (reportId: string) => {
    setIsGeneratingReport((prev) => [...prev, reportId]);
    try {
      const response = await fetch(
        `{http://localhost:5013/api/reports/generatePdf/${reportId}}`,
        {
          headers: {
            Authorization: `Bearer ${storedAuthData.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      //const response = await fetch("http://localhost:3000/pdf");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error generating report", error);
    } finally {
      setIsGeneratingReport((prev) => prev.filter((id) => id !== reportId));
    }
  };

  return (
    <div>
      {/* Cards */}
      <div className="mt-5 h-auto grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row justify-between bg-lightBlueBg rounded-lg p-[1.563vh] gap-4 lg:gap-4">
        {/* Filter */}
        <SearchFilter
          labelSearch="Search for a Report"
          labelSelectOne="Status"
          labelSelectTwo="Location"
          placeholderSearch="Search by ReportID, PatientID, CreatedBy"
          optionsSelectOne={[
            { value: "pending", label: "Pending" },
            { value: "complete", label: "Completed" },
          ]}
          // onSearch={handleSearch}
        />
      </div>

      <div className="mt-5 mb-[45px]">
        <TableContainer component={Paper} className="rounded-lg">
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow className="bg-lightBlueBg font-bold h-[4.016vh]">
                <TableCell className="font-bold">Report ID</TableCell>
                <TableCell className="font-bold">Patient ID</TableCell>
                <TableCell className="font-bold">Created By</TableCell>
                <TableCell className="font-bold">Status</TableCell>
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
                    ? filteredRows.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : filteredRows
                  ).map((row) => (
                    <TableRow key={row.reportId}>
                      <TableCell component="th" scope="row">
                        {row.reportId}
                      </TableCell>
                      <TableCell>{row.patientId}</TableCell>
                      <TableCell>{row.createdBy}</TableCell>
                      <TableCell>
                        <span
                          className={`${
                            row.status === "completed" ||
                            row.status === "complete"
                              ? "text-green-500"
                              : row.status === "pending"
                              ? "text-yellow-600"
                              : ""
                          } font-semibold`}
                        >
                          {row.status.charAt(0).toUpperCase() +
                            row.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="text-headerText text-sm xl:text-[16px] h-[42px] w-32 font-medium">
                          <CommonBtn
                            label="View Report"
                            onClick={() => generateReport(row.reportId)}
                            isLoading={isGeneratingReport.includes(
                              row.reportId
                            )}
                            isBtnDisabled={row.status === "pending"}
                          />
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
    </div>
  );
};

export default ReportsList;
