import CommonBtn from "@/app/components/common/button";
import CommonRegisterBtn from "@/app/components/common/registerButton";
import {
  ListAllPatientProps,
  PatientProfileCardTextProps,
  PatientProfileIconTextProps,
} from "@/utils/interfaces";
import Image from "next/image";
import SearchFilterReport from "@/app/components/common/search-filter-report";
import React, { useEffect, useState } from "react";
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
import { Spin } from "antd";
import { PatientRecordAllRowProps } from "@/utils/patient";
import axios from "axios";
import { GET_ALL_REPORTS } from "@/constants/config";
import { useAuth } from "@/context/AuthContext";

const PatientProfile = ({
  setActiveHeading,
  clickedRow,
}: ListAllPatientProps) => {
  const handleSubmitLogin = () => {
    console.log("Login clicked");
  };

  const { isAuthenticated, storedAuthData } = useAuth();
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState<PatientRecordAllRowProps[]>([]);

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleRowClick = (row: any) => {
    console.log("Row clicked", row);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const createData = (
    reportId: string,
    createdBy: string,
    status: string,
    createdAt: string,
    updatedAt: string
  ): PatientRecordAllRowProps => {
    return { reportId, createdBy, status, createdAt, updatedAt };
  };

  // Fetch all patient records -- This should be by the clicked user --
  const fetchAllPatientRecords = async () => {
    setIsLoading(true);
    await axios
      .get(GET_ALL_REPORTS, {
        headers: {
          Authorization: `Bearer ${storedAuthData.accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const row = response.data.map(
          (institute: {
            reportId: string;
            createdBy: string;
            status: string;
            createdAt: string;
            updatedAt: string;
          }) =>
            createData(
              institute.reportId,
              institute.createdBy,
              institute.status,
              institute.createdAt,
              institute.updatedAt
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
      fetchAllPatientRecords();
    } else {
      console.error("No authentication data found.");
    }
  }, [storedAuthData.accessToken]);

  const PatientProfileIcons = ({
    src,
    alt,
    text,
  }: PatientProfileIconTextProps) => {
    return (
      <div className="flex flex-row gap-1 items-center text-black">
        <div className="relative h-[12px] w-[12px]">
          <Image
            src={src}
            alt={alt}
            layout="fill"
            objectFit="contain"
            objectPosition="center"
          />
        </div>
        <div className="text-[10px] lg:text-[14px] text-black">{text}</div>
      </div>
    );
  };

  const PatientProfileIconCard = ({
    src,
    alt,
    text,
    value,
  }: PatientProfileCardTextProps) => {
    return (
      <div className="flex flex-col p-[6px] min-w-[100px] flex-grow h-[56px] lg:h-[70px] bg-lightBlueBg rounded-md">
        <div className="flex flex-row items-center gap-[4px]">
          <div className="relative flex justify-center items-center h-[18px] w-[18px] rounded-md bg-lightBlueBgThree">
            <div className="relative h-[12px] w-[12px] rounded bg-lightBlueBgThree">
              <Image
                src={src}
                alt={alt}
                layout="fill"
                objectFit="contain"
                objectPosition="center"
              />
            </div>
          </div>
          <div className="text-[10px] lg:text-[14px] text-black">{text}</div>
        </div>
        <div className="flex justify-end mt-[4px] text-[16px] lg:text-[22px] font-semibold text-black">
          {value}
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Patient name card */}
      <div className="bg-lightBlueBgTwo p-[14px] lg:p-[14px] xl:p-[14px] rounded-lg">
        <div className="flex space-x-3 w-full">
          <div className="relative h-[167px] lg:h-[210px] flex flex-grow flex-col justify-between rounded-md bg-white py-[4px] px-[8px] lg:py-[8px] lg:px-[14px]">
            {/* Details */}
            {clickedRow && (
              <div className="flex w-full ">
                <div className="flex flex-col flex-grow mr-[30px] h-[72px] lg:h-[80px] justify-between">
                  <h3 className="font-bold lg:text-[24px] text-black">
                    {clickedRow.sex === "Male" ? "Mr. " : "Ms. "}{" "}
                    {clickedRow.name}
                  </h3>
                  <div className="">
                    <div className="flex gap-5 xl:gap-8">
                      <PatientProfileIcons
                        src="/assets/icons/gender.svg"
                        alt="gender icon"
                        text={clickedRow.sex}
                      />
                      <PatientProfileIcons
                        src="/assets/icons/profession.svg"
                        alt="profession icon"
                        text={"Software Engineer"}
                      />
                      <PatientProfileIcons
                        src="/assets/icons/phone.svg"
                        alt="phone icon"
                        text={clickedRow.phone}
                      />
                    </div>
                    <div className="flex mt-[6px] gap-5 xl:gap-8">
                      <PatientProfileIcons
                        src="/assets/icons/email.svg"
                        alt="email icon"
                        text={clickedRow.email}
                      />
                      <PatientProfileIcons
                        src="/assets/icons/location.svg"
                        alt="address icon"
                        text={clickedRow.address}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col h-[72px] lg:h-[80px] items-center justify-end space-y-2">
                  <div className="w-24 h-8 xl:h-9 xl:w-32 flex flex-col">
                    <CommonBtn label="Edit" onClick={handleSubmitLogin} />
                  </div>
                  <div className="w-24 h-8 xl:h-9 xl:w-32 flex flex-col">
                    <CommonBtn
                      label="Delete"
                      onClick={handleSubmitLogin}
                      type={"Delete"}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Cards */}
            <div className="flex flex-row space-x-3 w-full pb-[4px]">
              <PatientProfileIconCard
                src="/assets/icons/weight.svg"
                alt="Weight icon"
                text="Weight"
                value="65kg"
              />
              <PatientProfileIconCard
                src="/assets/icons/height.svg"
                alt="Height icon"
                text="Height"
                value="170cm"
              />
              <PatientProfileIconCard
                src="/assets/icons/bmi.svg"
                alt="Age"
                text="Age"
                value={String(clickedRow?.age)}
              />
              <PatientProfileIconCard
                src="/assets/icons/pressure.svg"
                alt="Pressure icon"
                text="B. Pressure"
                value="124/80"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add new  */}
      <div className="flex justify-end h-[42px] my-5">
        <CommonRegisterBtn
          label="Add New Test Record"
          onClick={() => setActiveHeading && setActiveHeading(4)}
        />
      </div>

      {/* Filter */}
      <SearchFilterReport
        labelSearch="Search for an Institute"
        labelSelectOne="Status"
        placeholderSearch="Search Institute by name"
        optionsSelectOne={[
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
          { value: "pending", label: "Pending" },
        ]}
        onSearch={() => {}}
      />

      {/* Test Records */}
      <div className="mb-[45px]">
        <TableContainer component={Paper} className="rounded-lg">
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow className="bg-lightBlueBg font-bold h-[4.016vh]">
                <TableCell className="font-bold">Report ID</TableCell>
                <TableCell className="font-bold">Lab Tech. ID</TableCell>
                <TableCell className="font-bold">Status</TableCell>
                <TableCell className="font-bold">Created Date</TableCell>
                <TableCell className="font-bold">Updated Date</TableCell>
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
                      key={row.reportId}
                      hover
                      style={{ cursor: "pointer" }}
                      onClick={() => handleRowClick(row)}
                    >
                      <TableCell component="th" scope="row">
                        {row.reportId}
                      </TableCell>
                      <TableCell>{row.createdBy}</TableCell>
                      <TableCell>
                        {row.status.charAt(0).toUpperCase() +
                          row.status.slice(1)}
                      </TableCell>
                      <TableCell>
                        {new Date(row.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(row.updatedAt).toLocaleDateString()}
                      </TableCell>
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
    </div>
  );
};

export default PatientProfile;
