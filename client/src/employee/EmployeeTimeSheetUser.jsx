import React, { useEffect, useState, version } from "react";
import axios from "axios";
import moment from "moment/moment";
import { RotatingLines } from 'react-loader-spinner'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { PDFDownloadLink, PDFViewer, ReactPDF } from "@react-pdf/renderer";
import SalaryPDF from "../Invoices/SalaryPDF";
import env from "react-dotenv";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmployeeNav from "./EmployeeNav";

// current day
let MyDateCurrent = moment().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
const formattedMyDateCurrent = moment(MyDateCurrent).utcOffset(0).format('YYYY-MM-DD');

//Day before 30
let MyDateBefore = moment().subtract(30, 'days').format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
const formattedMyDateBefore = moment(MyDateBefore).utcOffset(0).format('YYYY-MM-DD');

const EmployeeTimeSheetUser = (props) => {

  const [workvalue, setWorkvalue] = useState([]);
  const [ids, setIds] = useState({ id: "", Eid: "" });
  const [dateValue, setDate] = useState({
    ATTENDANCE_START_DATE: formattedMyDateBefore,
    ATTENDANCE_END_DATE: formattedMyDateCurrent,
  });

  console.log(props, "props")
  useEffect(() => {
    // Get the current URL
    const currentURL = window.location.search;
    let params = new URLSearchParams(currentURL);
    const Id = params.get('Id');
    const eid = params.get('eid');
    setIds((prev) => ({ ...prev, id: Id, Eid: eid }));
    console.log("Current", Id, eid);
  }, []);


  console.log(props.state, "dateValue")


  const gettimesheet = async (e) => {
    try {
      const response = await axios.put(
        "/api/get_employee_all_for_attendence",
        {
          ATTENDANCE_ADMIN_USERNAME: props.state[3],
          ATTENDANCE_EMPLOYEE_USERNAME: props.state[1],
          ATTENDANCE_START_DATE: dateValue.ATTENDANCE_START_DATE,
          ATTENDANCE_END_DATE: dateValue.ATTENDANCE_END_DATE,
        },

      );
      setTimeout(() => {
        setWorkvalue(response.data.result);
      }, 1000);
    } catch (err) {
      console.log("something Went wrong: =>", err);
    }
  };



  useEffect(() => {
    gettimesheet();
  },[]);

  // useEffect(() => {
  //   gettimesheet();
  // }, [gettimesheet,ids?.id, ids?.Eid, dateValue.ATTENDANCE_START_DATE, dateValue.ATTENDANCE_END_DATE]);





  // time calculation
  const timeValueHours = (x, y) => {

    // console.log(x,"xxxxxx")
    const attendanceIn = moment(y, 'hh:mm A').utcOffset(0);
    const attendanceOut = moment(x, 'hh:mm A').utcOffset(0);
    const duration = moment.duration(attendanceOut.diff(attendanceIn));
    const totalHours = Math.floor(duration.asHours());
    const totalMinutes = duration.minutes();
    return `${totalHours} hours and ${totalMinutes} minutes`;
  };


  // overtime calculation
  const Overtime = (x, y) => {

    // console.log(x,"xxxxxx")
    const attendanceIn = moment(y, 'hh:mm A').utcOffset(0);
    const attendanceOut = moment(x, 'hh:mm A').utcOffset(0);
    const duration = moment.duration(attendanceOut.diff(attendanceIn));
    const totalHours = Math.floor(duration.asHours());

    // Define a threshold for regular hours (e.g., 40 hours per week)
    const regularHoursThreshold = 8;
    let overtimeHours = 0;

    if (totalHours > regularHoursThreshold) {
      overtimeHours = totalHours - regularHoursThreshold;
    }

    return `${overtimeHours} hours`
  };




  const attendanceIn = moment('11:50 AM', 'hh:mm A');
  const attendanceOut = moment('5:00 PM', 'hh:mm A');
  const duration = moment.duration(attendanceOut.diff(attendanceIn));
  const totalHours = Math.floor(duration.asHours());
  const totalMinutes = duration.minutes().toString().padStart(2, '0');

  console.log(`${totalHours} hours and ${totalMinutes} minutes`);




  const allHours = workvalue?.map((e) => {
    return (
      timeValueHours(moment(e.ATTENDANCE_OUT).utcOffset(0).format("LT"), moment(e.ATTENDANCE_IN).utcOffset(0).format("LT"))
    );
  });




  const convertToDuration = (timeString) => {
    const [hours, minutes] = timeString.match(/\d+/g)?.map(Number) || [0, 0];
    return moment.duration({ hours, minutes });
  };





  // read duration
  const ReadDuration = (event) => {
    const totalDuration = event.reduce((acc, timeString) => {
      const duration = convertToDuration(timeString);
      return acc.add(duration);
    }, moment.duration());
    return totalDuration
  }


  //overall time
  const overallTime = (event) => {
    // Add up all durations in the array
    const totalDuration = ReadDuration(event)

    // Get total hours and minutes from the total duration
    const totalHourss = Math.floor(totalDuration.asHours());
    const totalMinutess = totalDuration.minutes();
    return `${totalHourss} hours and ${totalMinutess} minutes`;
  }



  // calculations
  const ResultantTime = overallTime(allHours);
  const ExtractHours = convertToDuration(ResultantTime)?._data.hours;
  // const totalIncome = ExtractHours * props.mainData.EMPLOYEE_HOURLY_WAGE;

  const columns = [

    {
      field: "ATTENDANCE_PROJECT_ID",
      headerName: "Project Id",
      width: 120,
    },
    { field: "ATTENDANCE_DATE_ID", headerName: "Date", width: 150 },

    {
      field: "ATTENDANCE_IN",
      headerName: "In",
      width: 120,
      renderCell: (cellValues) => {
        return (
          <>
            {cellValues.row.ATTENDANCE_IN && moment(cellValues?.row.ATTENDANCE_IN).utcOffset(0).format("LT")}
          </>
        );

      },
      cellClassName: (cellValues) => {
        return cellValues.row.ATTENDANCE_IN ? "bg-success text-white border" : "bg-danger text-white border"
      }
    },

    {
      field: "ATTENDANCE_OUT",
      headerName: "Out",
      width: 150,
      renderCell: (cellValues) => {
        return (
          cellValues?.row.ATTENDANCE_OUT ? <>
            {cellValues?.row.ATTENDANCE_OUT && moment(cellValues?.row.ATTENDANCE_OUT).utcOffset(0).format("LT")}
          </> : <>{"absent"}</>
        );
      },
      cellClassName: (cellValues) => {
        return cellValues.row.ATTENDANCE_OUT ? "bg-success text-white border" : "bg-danger text-white border"
      }
    },

    {
      field: "Working hours",
      headerName: "Working hours",
      width: 200,
      renderCell: (cellValues) => {
        return (
          cellValues?.row.ATTENDANCE_OUT && <>
            {timeValueHours(moment(cellValues?.row.ATTENDANCE_OUT).utcOffset(0).format("LT"), moment(cellValues?.row.ATTENDANCE_IN).utcOffset(0).format("LT"))}
          </>
        );
      },
      cellClassName: (cellValues) => {
        return cellValues.row.ATTENDANCE_IN && cellValues.row.ATTENDANCE_OUT ? "bg-light text-dark border" : "text-white border"
      }
    },
    {
      field: "overtime",
      headerName: "Overtime",
      width: 170,
      renderCell: (cellValues) => {
        return (
          cellValues?.row.ATTENDANCE_OUT && <>
            {Overtime(moment(cellValues?.row.ATTENDANCE_OUT).utcOffset(0).format("LT"), moment(cellValues?.row.ATTENDANCE_IN).utcOffset(0).format("LT"))}
          </>
        );
      },
    },
    {
      field: "Status",
      headerName: "Status",
      width: 210,
      renderCell: (cellValues) => {
        return (
          cellValues?.row.ATTENDANCE_IN && cellValues?.row.ATTENDANCE_OUT ? <>
            {"present"}
          </> : <>
            {"absent"}
          </>
        );
      },
      cellClassName: (cellValues) => {
        return cellValues.row.ATTENDANCE_IN && cellValues.row.ATTENDANCE_OUT ? "bg-success text-light border" : "bg-danger text-white border"
      }
    },

  ];

  console.log(workvalue, "workvalue")


  return (
    <>
      <div className="container-fluid g-0">
        <EmployeeNav project="My Projects"  history="Attendance history" MarkAttendance="Mark Attendance"/>
        <div className="container" >
          {/* <p>
          {" "}
          <b style={{ fontWeight: "600", color: "black" }}>Employee Name : </b>
          {props.mainData.EMPLOYEE_NAME}
        </p> */}
          <div style={{ display: "flex", gap: 10, padding: "5px 0" }}>
          </div>
          <div className="col-3">
            <table className="table p-0 m-0">
              <tr>
                <th><LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <DatePicker
                      label="Date from"
                      // onChange={(newValue) => setstartDateString(newValue)}
                      onChange={(event) =>
                        setDate((prev) => ({
                          ...prev, ATTENDANCE_START_DATE: event,
                        }))
                      }
                      defaultValue={dayjs(dateValue.ATTENDANCE_START_DATE)}
                      sx={{}}
                      formatDensity="spacious"
                    />
                  </DemoContainer>
                </LocalizationProvider>
                </th>
                <th>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                      <DatePicker
                        label="Date to"
                        // onChange={(newValue) => setstartDateString(newValue)}
                        onChange={(event) =>
                          setDate((prev) => ({
                            ...prev,
                            ATTENDANCE_END_DATE: event,
                          }))
                        }
                        defaultValue={dayjs(dateValue.ATTENDANCE_END_DATE)}
                        sx={{ height: "10" }}
                        formatDensity="spacious"
                      />
                    </DemoContainer>
                  </LocalizationProvider></th>
              </tr>
            </table>
          </div>


          {/* data gird */}
          <DataGrid
            className="display"
            style={{ height: "75vh" }}
            rows={workvalue}
            columns={columns}
            getRowId={(row) => row.ATTENDANCE_ID}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 20,
                },
              },
              sorting: {
                sortModel: [
                  {
                    field: 'ATTENDANCE_DATE_ID',
                    sort: 'asc',
                  },
                ],
              },

              aggregation: {
                model: {
                  size: 'sum',
                  updatedAt: 'max',
                },
              },



            }

            }
            density="compact"
            pageSizeOptions={[5]}
            // checkboxSelection
            disableRowSelectionOnClick
          />
        </div>

      </div>
    </>
  );
};

export default EmployeeTimeSheetUser;
