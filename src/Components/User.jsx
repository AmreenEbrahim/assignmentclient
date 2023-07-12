import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Papaparse from "papaparse";
import { setToken } from "../actions/setToken";
import axios from "../axios/axios";
import { useDispatch } from "react-redux";
import "./user.css";
const Csvfields = ["name", "gender", "email", "status"];
function UserPage() {
  let dispatch = useDispatch();
  const initArray = [];
  const [limit, setLimit] = useState(4);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  const getUsers = () => {
    let userDetails = [];
    users.map((item, i) => {
      userDetails.push({
        id: item.id,
        name: (
          <div className="management_list_name">
            <div className="man_user">
              <img src={item.profile_pic ? item.profile_pic : "Default img"} />
            </div>
            <div className="man_text">{item.name}</div>

            <div className="man_text">{item.status}</div>
            <div className="man_text">{item.email}</div>
            <div className="man_text">{item.gender}</div>
          </div>
        ),
      });
    });
    return userDetails;
  };
  const fetchUsers = async () => {
    await axios
      .get(`/`)
      .then((res) => {
        console.log("==", res.data);
        if (res.data) {
          setUsers(res.data.users);
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const expUserCsv = () => {
    console.log("users", users);
    let csv = Papaparse.unparse({
      data: users,
      fields: Csvfields,
    });
    console.log("csv", csv);
    let csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    let csvURL = null;
    csvURL = window.URL.createObjectURL(csvData);
    let tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", "USERS_LIST.csv");
    tempLink.click();
  };
  useEffect(() => {
    fetchUsers();
  }, [page]);

  // useEffect(()=>{
  //   console.log(counts.totalUsers)
  // })
  const logout = () => {
    localStorage.removeItem("AuthData");
    localStorage.removeItem("AuthToken");
    dispatch(setToken(""));
  };
  return (
    <div>
      {/* <div className='right_panel'> */}
      <div className="user_inner_partts">
        <div className="total_users_report">
          <div className="total_users_left">
            <h2>Users</h2>
          </div>
        </div>
      </div>

      <div className="user_management_list">
        <button onClick={() => expUserCsv()}>Download User List</button>
        <button onClick={logout}>Logout</button>
        <Row>
          <Col lg="8" md="12" sm="12">
            <div className="usermaageleft">
              <div className="manage_heading_search">
                <h2>User Management List</h2>
              </div>
              <div className="manage_table table-responsive">
                <DataTable
                  columns={columns}
                  //data={data45}
                  data={getUsers()}
                  pagination
                  responsive
                  customStyles={customStyles}
                  defaultSortField="id"
                  defaultSortAsc={false}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
    // </div>
  );
}
export const data = {
  labels: ["Active", "Inactive"],
  datasets: [
    {
      label: "# of Votes",
      radius: "100%",
      // cutout: 74,
      data: [60, 40],
      //data: counts?[counts.activeUsersPercent,counts.inactiveUsersPercent]:[0,0],
      backgroundColor: ["#01C1C1", "#FD9216"],
      borderColor: ["#01C1C1", "#FD9216"],
      borderWidth: 0,
    },
  ],
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: ["#fff"],
      },
      // weight:"20"
    },
  },
};

const columns = [
  {
    name: "profile pic",
    selector: (row) => row.name,
    sortable: true,
    reorder: true,
    width: "100px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    reorder: true,
    width: "300px",
  },
  {
    name: "gender",
    selector: (row) => row.gender,
    sortable: true,
    reorder: true,
    width: "100px",
  },
  {
    name: "email",
    selector: (row) => row.email,
    sortable: true,
    reorder: true,
    width: "100px",
  },

  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
    reorder: true,
    width: "70px",
  },
];

const customStyles = {
  rows: {
    style: {
      //minHeight: '72px',
      backgroundColor: "transparent",
      color: "#fff",
      paddingLeft: "10px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "10px", // override the cell padding for head cells
      paddingRight: "2px",
      backgroundColor: "transparent",
      color: "#fff",
    },
  },
  cells: {
    style: {
      paddingLeft: "4px", // override the cell padding for data cells
      paddingRight: "2px",
      paddingTop: "5px",
      paddingBottom: "5px",
      backgroundColor: "transparent",
      color: "#fff",
    },
  },
};

export default UserPage;
