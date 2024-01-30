import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment/moment";
import { RotatingLines } from "react-loader-spinner";
import {
  Box,
  Button,
  Paper,
  Skeleton,
  Typography,
  styled,
} from "@mui/material";
import { CSVLink } from "react-csv";
import { TableRows } from "@mui/icons-material";
import AttendancePunch from "./AttendancePunch";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SalaryPDF from "../../Invoices/SalaryPDF";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import {getAllttendance} from "../../redux/slice/AttendanceSlice";

const AttendanceAcknowledge = () => {
  
  const companyLogin = useSelector(state=> state?.companyLogin?.user)
  const COMPANY_ID = companyLogin[0]
  const COMPANY_USERNAME = companyLogin[0]
  const COMPANY_PARENT_ID = companyLogin[0]
  const COMPANY_PARENT_USERNAME = companyLogin[0]

  const [employees, getReport] = useState();
  const [foundUsers, setFoundUsers] = useState([]);
  const [filterMethod, setFilterMethod] = useState("By Pay Period");
  const [name, setName] = useState("All");
  const [showDetail, setShowDetail] = useState(true);
  const [show, setshow] = useState(true);
  const [employeeName, setEmployeeName] = useState([]);
  const [allempData, setAllempData] = useState({});
  const [openNav, setOpenNav] = useState(false);
  const [selectDate, setSelectDate] = useState("");
  const [dateArray, setDateArray] = useState([]);
  const [resStatus, setResStatus] = useState(false);
  // const [selectDate, setSelectDate] = useState("")

  let MyDateCurrent = moment().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  const formattedMyDateCurrent = moment(MyDateCurrent)
    .utcOffset(0)
    .format("YYYY-MM-DD");

  const HandlePeriod = (e) => {
    const extractDate = e?.split(" - ");
    setSelectDate(e);
    setStartDate(moment(extractDate[0]));
    setEndDate(moment(extractDate[1]));
  };

  const generateWeekOptions = () => {
    const options = [];
    const today = moment().utcOffset(0);

    for (let i = 0; i < 5; i++) {
      // Generate options for the current week and the four previous weeks
      const weekStartDate = moment(today)
        .utcOffset(0)
        .subtract(i * 7, "days")
        .startOf("isoWeek");
      const weekEndDate = moment(weekStartDate).utcOffset(0).endOf("isoWeek");
      const startVal = `${weekStartDate.format("YYYY-MM-DD")}`;
      const endVal = `${weekEndDate.format("YYYY-MM-DD")}`;

      const weekLabel = {
        startVal: startVal,
        endVal: endVal,
      };
      // const formattedDate = weekEndDate.format('YYYY-MM-DD');

      options.push(weekLabel);
    }

    return options;
  };

  const weeklyDate = generateWeekOptions();
  var Defaultstart = weeklyDate.filter((e, index) => {
    return index == 0 && e;
  });
  const [startDate, setStartDate] = useState(
    moment(Defaultstart[0].startVal).utcOffset(0)
  ); // Replace with your start date
  const [endDate, setEndDate] = useState(
    moment(Defaultstart[0].endVal).utcOffset(0)
  );

  useEffect(() => {
    const generateDateArray = () => {
      const dates = [];
      let currentDate = startDate?.clone();

      while (currentDate.isSameOrBefore(endDate)) {
        dates.push(currentDate.format("YYYY-MM-DD"));
        currentDate.add(1, "days");
      }

      setDateArray(dates);
    };

    generateDateArray();
  }, [startDate, endDate]);

  console.log(dateArray, "dateArray");

  const mainData = allempData;
  
  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const fetchAllEmployees = async () => {
    try {
      const response = await axios.put(
        "/api/get_employee",
        {
          EMPLOYEE_MEMBER_PARENT_ID: COMPANY_PARENT_ID,
          EMPLOYEE_MEMBER_PARENT_USERNAME: COMPANY_PARENT_USERNAME,
          EMPLOYEE_PARENT_USERNAME: COMPANY_USERNAME,
          EMPLOYEE_PARENT_ID: COMPANY_ID,
        },
        { headers }
      );

      const data = response.data;

      console.log("Employee Data: =>", data);
      return data;
    } catch (err) {
      console.log("Something Went Wrong: =>", err);
      throw err;
    }
  };

  const fetchData = async () => {
    try {
      const [employeeData] = await Promise.all([getAllttendance()]);
      setAllempData(employeeData.result);
      console.log("Both requests completed", employeeData);
    } catch (err) {
      console.log("An error occurred:", err);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, [COMPANY_ID]);

  // loader
  // const Animations = () => {
  //   return (
  //     <Box sx={{ width: "100%" }}>
  //       <Skeleton animation="pulse" height={60} />
  //       <Skeleton animation="pulse" height={50} />
  //       <Skeleton animation="pulse" height={50} />
  //       <Skeleton animation="pulse" height={50} />
  //       <Skeleton animation="pulse" height={50} />
  //       <Skeleton animation="pulse" height={50} />
  //       <Skeleton animation="pulse" height={50} />
  //       <Skeleton animation="pulse" height={50} />
  //     </Box>
  //   );
  // };

  // get data
  const Reports = (ADMIN_USERNAME, EMPLOYEE_PARENT_USERNAME) => {
    let data = JSON.stringify({
      ADMIN_USERNAME,
      EMPLOYEE_PARENT_USERNAME,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: "/api/get_employee_details_for_attendence",
      headers: {
        authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data.result);
        setTimeout(() => {
          setFoundUsers(response.data.result);
          getReport(response.data.result);
          setResStatus(true)
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        setResStatus("error");
      });
  };

  //fatch data
  useEffect(() => {
    Reports(
      mainData[0]?.EMPLOYEE_MEMBER_PARENT_USERNAME,
      mainData[0]?.EMPLOYEE_PARENT_USERNAME
    );
  }, [allempData]);

  //filter by different param
  const filtered = (e, item) => {
    // topFunction()
    const word = e.target.value;

    if (word !== "" && word !== "All") {
      const results = employees?.filter((post) => {
        return post._doc[item].toLowerCase().includes(word.toLowerCase());
      });
      setFoundUsers(results);
    } else {
      setFoundUsers(employees);
    }

    setName(word);
  };

  // process data
  const processingData = (data) => {
    let processedData = data?.map((employee) => {
      console.log(employee, "additional");
      let filterByDate;
      filterByDate = employee.AttendanceData.filter((item) => {
        {
          return dateArray.includes(item.ATTENDANCE_DATE_ID);
        }
      });

      // console.log(result, "filter");

      const totalDuration = filterByDate.reduce((acc, attendance) => {
        const timeIn = moment(attendance.ATTENDANCE_IN)
          .utcOffset(0)
          .format("LT");
        const timeOut = moment(attendance.ATTENDANCE_OUT)
          .utcOffset(0)
          .format("LT");
        const attendanceIn = moment(timeIn, "hh:mm A").utcOffset(0);
        const attendanceOut = moment(timeOut, "hh:mm A").utcOffset(0);

        // Check for null or undefined values before performing calculations
        if (attendanceIn.isValid() && attendanceOut.isValid()) {
          const duration = moment.duration(attendanceOut.diff(attendanceIn));
          acc.add(duration);
        }

        return acc;
      }, moment.duration());

      const totalHours = Math.floor(totalDuration.asHours());
      const totalMinutes = totalDuration.minutes();

      // Define a threshold for regular hours (e.g., 40 hours per week)
      const regularHoursThreshold = 8;
      let overtimeHours = 0;

      if (totalHours > regularHoursThreshold) {
        overtimeHours = totalHours - regularHoursThreshold;
      }

      const modifiedEmployee = {
        ...employee._doc,
        TOTAL_HOURS: `${totalHours} hours and ${totalMinutes} minutes`,
        OVERTIME_HOURS: overtimeHours.toFixed(2),
        PUNCH: employee,

        EMPLOYEE_ATTENDANCE: filterByDate
          ?.map((attendance) => {
            const timeIn = moment(
              attendance.ATTENDANCE_IN,
              "hh:mm A"
            ).utcOffset(0);
            const timeOut = moment(
              attendance.ATTENDANCE_OUT,
              "hh:mm A"
            ).utcOffset(0);
            const attendanceIn = moment(timeIn).utcOffset(0);
            const attendanceOut = moment(timeOut).utcOffset(0);

            // Check for null or undefined values before performing calculations
            if (attendanceIn.isValid() && attendanceOut.isValid()) {
              const duration = moment.duration(
                attendanceOut.diff(attendanceIn)
              );
              const hoursWorked = Math.floor(duration.asHours());
              const minutesWorked = duration.minutes();

              return {
                ...attendance,
                HOURS: `${hoursWorked} hours and ${minutesWorked} minutes`,
                REGULAR: `${hoursWorked} hours and ${minutesWorked} minutes`, // Assuming "REGULAR" represents the regular hours worked
              };
            } else {
              return null; // or handle the case as needed
            }
          })
          .filter(Boolean), // Remove null entries
      };

      return modifiedEmployee;
    });

    return processedData;
  };

  const processedData = processingData(foundUsers);
  console.log(processedData, "processedData");


  const PunchReport = (e) => {
    console.log(e, "easy");
    setshow(false);
    setEmployeeName(e.a);
    return setShowDetail(<AttendancePunch data={e.a} attendance={e.b} />);
  };

  const csvReport = {
    data: processedData,
    filename: "Doc.csv",
  };


  const columns = [
    {
      field: "EMPLOYEE_ID",
      headerName: "Employee Id",
      width: 170,
    },
    { field: "EMPLOYEE_NAME", headerName: "Name", width: 200 },

    // {
    //   field: "ATTENDANCE_IN",
    //   headerName: "In",
    //   width: 120,
    //   renderCell: (cellValues) => {
    //     return cellValues?.row.ATTENDANCE_TYPE_IN == "automatic" &&
    //       cellValues?.row.ATTENDANCE_IN ? (
    //       <>
    //         {cellValues?.row.ATTENDANCE_IN}
    //       </>
    //     ) : (
    //       <>{"Not available"}</>
    //     );
    //   },
    //   cellClassName: (cellValues) => {
    //     return cellValues?.row.ATTENDANCE_TYPE_IN == "automatic" &&
    //       cellValues?.row.ATTENDANCE_IN
    //       ? "bg-success text-white border"
    //       : "bg-white text-dark border";
    //   },
    // },

    // {
    //   field: "ATTENDANCE_OUT",
    //   headerName: "Out",
    //   width: 150,
    //   renderCell: (cellValues) => {
    //     return cellValues?.row.ATTENDANCE_TYPE_OUT == "automatic" &&
    //       cellValues?.row.ATTENDANCE_OUT ? (
    //       <>
    //         {cellValues?.row.ATTENDANCE_OUT}
    //       </>
    //     ) : (
    //       <>{"Not available"}</>
    //     );
    //   },
    //   cellClassName: (cellValues) => {
    //     return cellValues?.row.ATTENDANCE_TYPE_OUT == "automatic" &&
    //       cellValues?.row.ATTENDANCE_OUT
    //       ? "bg-success text-white border"
    //       : "bg-white text-dark border";
    //   },
    // },

    {
      field: "TOTAL_HOURS",
      headerName: "Working hours",
      width: 200,
      renderCell: (cellValues) => {
        return (
          <>
            {cellValues.row.TOTAL_HOURS}
          </>)
      },
      cellClassName: (cellValues) => {
        return cellValues.row.ATTENDANCE_IN && cellValues.row.ATTENDANCE_OUT
          ? "bg-light text-dark border"
          : "text-white border bg-success";
      },
    },
    {
      field: "OVERTIME_HOURS",
      headerName: "Overtime",
      width: 200,
      renderCell: (cellValues) => {
        return (
          cellValues?.row.ATTENDANCE_OUT && (
            <>
              {cellValues?.row.OVERTIME_HOURS}
            </>
          )
        );
      },
    },
    {
      field: "Status",
      headerName: "Acknowledgement",
      width: 200,
      renderCell: (cellValues) => {
        return (<PDFDownloadLink
          className="btn btn-info btn-sm"
          document={
            <SalaryPDF
              name={cellValues.row.EMPLOYEE_NAME}
              date={formattedMyDateCurrent}
              startdate={startDate?._i}
              enddate={endDate?._i}
            />
          }
          fileName={`${cellValues.row.EMPLOYEE_NAME}.pdf`}
        >
          Download
        </PDFDownloadLink>)
      }
    },
    {
      type: "number",
      field: "Location",
      headerName: "Punch Detail",
      width: 200,
      renderCell: (cellValues) => {
        return (
          <button
            className="btn btn-secondary btn-sm"
            onClick={(e) =>
              PunchReport({
                a: cellValues.row.PUNCH,
                b: cellValues.row.EMPLOYEE_ATTENDANCE,
              })
            }
          >
            Punch Detail
          </button>);
      },
    },
  ];


  const newdata = processedData?.map((post) => {
    const [hours, minutes] = post?.TOTAL_HOURS.match(
      /\d+/g
    );
    const totalMinutes = parseInt(hours) * 60 + parseInt(minutes)
    const data = totalMinutes > 0 ? post : null
    return data;
  })

  const newdata2 = newdata?.filter(prev => prev !== null)

  const enployeeName = employees?.filter((e) => e._doc.EMPLOYEE_ROLE != "")
  
  // console.log(enployeeName, "enployeeName")



  return (
    <>
      <Sidebar
        COMPANY_ID={COMPANY_ID}
        COMPANY_USERNAME={COMPANY_USERNAME}
        COMPANY_PARENT_ID={COMPANY_PARENT_ID}
        COMPANY_PARENT_USERNAME={COMPANY_PARENT_USERNAME}
        active={3}
        toggle={openNav}
      />
      <div className="myscreen p-3">
        <Box className="box" style={{ background: "#277099" }}>
          <Navbar toggle={() => setOpenNav((e) => !e)} />
          {resStatus == true ? (<button
            size="small"
            // variant={show ? "outlined" : "outlined"}
            className={
              show
                ? "btn button border-bottom-0 bg-white btn-sm"
                : "btn rounded-0 border-bottom-0  rounded-0 text-light btn-sm"
            }
            onClick={() => setshow(true)}
          >
            Pay Acknowledgement
          </button>) : <button
            size="small"
            className={
              show
                ? "btn button border-bottom-0 bg-white btn-sm"
                : "btn rounded-0 border-bottom-0  rounded-0 text-light btn-sm"
            }
            onClick={() => setshow(true)}
            disabled
          >
            Pay Acknowledgement
          </button>}
          {!show && (
            <button
              size="small"
              className="btn button border-bottom-0 bg-white btn-sm"
              // variant="outlined"
            >
              Punch Detail - {employeeName._doc.EMPLOYEE_NAME}{" "}<i onClick={() => setshow(true)} className="fa fa-times" aria-hidden="true"></i>
            </button>
          )}
          {resStatus == true ? (
            <div className="myscreen p-3">
              <Box
                style={{
                  height: "100%",
                  padding: 0,
                  paddingBottom: "0",
                  border: "",
                  overflowY: "scroll",
                }}
              >
                {show ? (
                  processedData <= 0 ? (
                    <div
                      className="container"
                      style={{ postion: "position-relative" }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%,-50%)",
                        }}
                      >
                        <RotatingLines
                          strokeColor="#2D5169"
                          strokeWidth="5"
                          animationDuration="0.75"
                          width="50"
                          visible={true}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="container">
                        <div className="row sticky-top bg-white">
                          <div className="col-xl-6">
                            <div className="row justify-content-between">
                              <div className="col-xl-12">
                                <div className="row py-1">
                                  <div className="col">
                                    <label>Date filter by</label>
                                  </div>
                                  <div className="col">
                                    <select
                                      className="form-control form-control-2 border"
                                      onChange={(e) =>
                                        setFilterMethod(e.target.value)
                                      }
                                      value={filterMethod}
                                    >
                                      <option>By Pay Period</option>
                                      <option>Date wise</option>
                                    </select>
                                  </div>
                                </div>

                                {filterMethod === "By Pay Period" && (
                                  <div className="row py-1">
                                    <div className="col">
                                      <label>Date filter by</label>
                                    </div>
                                    <div className="col">
                                      <select
                                        className="form-control form-control-2 border"
                                        defaultValue={moment()
                                          .endOf("isoWeek")
                                          .format("YYYY-MM-DD")}
                                        value={selectDate}
                                        onChange={(e) =>
                                          HandlePeriod(e.target.value)
                                        }
                                      >
                                        {weeklyDate?.map((e, index) => (
                                          <option key={index}>
                                            {e.startVal} - {e.endVal}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                )}

                                {filterMethod === "Date wise" && (
                                  <div className="d-flex flex-row w-100">
                                    <div className="col">
                                      <label>Period</label>
                                    </div>
                                    <div className="col">
                                      <table className="table p-0 m-0">
                                        <tr>
                                          <th title="start date">
                                            <input
                                              className="form-control form-control-2 border"
                                              type="date"
                                              value={startDate?._i}
                                              onChange={(e) =>
                                                setStartDate(
                                                  moment(e.target.value)
                                                )
                                              }
                                            />
                                          </th>
                                          <th>
                                            <input
                                              title="end date"
                                              className="form-control form-control-2 border"
                                              type="date"
                                              value={endDate?._i}
                                              onChange={(e) =>
                                                setEndDate(moment(e.target.value))
                                              }
                                            />
                                          </th>
                                        </tr>
                                      </table>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="row py-1">
                              <div className="col">
                                <label>Employee</label>
                              </div>
                              <div className="col">
                                <select
                                  className="form-control form-control-2 border"
                                  onChange={(e) => filtered(e, "EMPLOYEE_NAME")}
                                  value={name}
                                >
                                  <option selected>All</option>
                                  {employees?.map((e) => (
                                    <option>{e._doc.EMPLOYEE_NAME}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="row py-1">
                              <div className="col">
                                <label>Department</label>
                              </div>
                              <div className="col">
                                <select
                                  className="form-control form-control-2 border"
                                  onChange={(e) => filtered(e, "EMPLOYEE_ROLE")}
                                  value={name}
                                >
                                  <option selected>All</option>
                                  {enployeeName?.map((e) => (
                                    <option>
                                      {e._doc.EMPLOYEE_ROLE}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="container">
                        <div className="row">
                          <div className="col-xl-12 col-lg-6 overflow-auto pt-2">
                            {resStatus == true ? (
                              <DataGrid
                                className="display"
                                style={{ height: "78vh" }}
                                rows={newdata2}
                                columns={columns}
                                getRowId={(row) => row.EMPLOYEE_ID}
                                initialState={{
                                  pagination: {
                                    paginationModel: {
                                      pageSize: 8,
                                    },
                                  },
                                  sorting: {
                                    sortModel: [
                                      {
                                        field: "ATTENDANCE_DATE_ID",
                                        sort: "asc",
                                      },
                                    ],
                                  },

                                  aggregation: {
                                    model: {
                                      size: "sum",
                                      updatedAt: "max",
                                    },
                                  },
                                }}
                                density="compact"
                                pageSizeOptions={[5]}
                                // checkboxSelection
                                disableRowSelectionOnClick
                                localeText={{
                                  noRowsLabel: newdata2.length == 0 && "No attendance available for this week choose different week",
                                }}
                              />
                            ) : resStatus === "error" ? (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%,-50%)",
                                }}
                              >
                                <small className="text-dark">
                                  <p>Check your connection and try again. :(</p>
                                  <center>
                                    <button
                                      onClick={Reports}
                                      className="btn btn-sm btn-secondary"
                                    >
                                      Retry
                                    </button>
                                  </center>
                                </small>
                              </div>
                            ) : (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%,-50%)",
                                }}
                              >
                                <RotatingLines
                                  strokeColor="#2D5169"
                                  strokeWidth="5"
                                  animationDuration="0.75"
                                  width="50"
                                  visible={true}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </>

                  )
                ) : (
                  showDetail
                )}
              </Box>
            </div>
          ) : resStatus === "error" ? (
            <div className="myscreen p-3">
              <Box>
                <div
                  className="p-3"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                >
                  <small className="text-dark">
                    <p>Check your connection and try again. :(</p>
                    <center>
                      <button
                        onClick={fetchData}
                        className="btn btn-sm btn-secondary"
                      >
                        Retry
                      </button>
                    </center>
                  </small>
                </div>
              </Box>
            </div>
          ) : (
            <div className="myscreen p-3">
              <Box style={{ height: "100%", padding: 0, paddingBottom: "0" }}>
                <div
                  className="p-3"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",

                  }}
                >
                  <RotatingLines
                    strokeColor="#2D5169"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="50"
                    visible={true}

                  />
                </div>
              </Box>
            </div>
          )}
        </Box>
      </div>
    </>
  );
};

export default AttendanceAcknowledge;
