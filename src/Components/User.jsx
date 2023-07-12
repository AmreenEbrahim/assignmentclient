import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Modal,
  Button,
  Form,
  Dropdown,
  Table,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import Papaparse from "papaparse";
import { Dropdown } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "../../axios/axios";
import { useSelector } from "react-redux";

import { Doughnut } from "react-chartjs-2";
import Switch from "react-switch";
import "./user.css";
const Csvfields = ["Name", "Username", "Email", "Status"];
function UserPage() {
  const initArray = [];
  const [limit, setLimit] = useState(4);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  const handleStatusChange = (event) => {
    console.log(event);
    //console.log({e})
    //axios.post("/toggle-status",)
  };

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
        console.log(res.data);
        if (res.data.success === true) {
          setUsers(res.data.users);
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const ExpUserCsv = () => {
    setLoading(true);

    let csv = Papaparse.unparse({
      data: users,
      fields: Csvfields,
    });
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
        <button onClick={() => csvExp()}>Download User List</button>
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
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    reorder: true,
    width: "200px",
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
    reorder: true,
  },

  {
    name: "Phone No.",
    selector: (row) => row.phone,
    sortable: true,
    reorder: true,
  },

  {
    name: "View",
    selector: (row) => row.view,
    sortable: true,
    reorder: true,
    width: "70px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    sortable: true,
    reorder: true,
    width: "70px",
  },
  {
    name: "Active",
    selector: (row) => row.active,
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