import React, { useEffect, useState } from "react";
import "./user.css";
import axios from "axios";
import { Link } from "react-router-dom";
 import toast from "react-hot-toast";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.log("Error while fetching Data", error);
      }
    };
    fetchData();
  }, []);


  const deleteUser = async (userID) => {
  try {
    const response = await axios.delete(`http://localhost:8000/api/delete/user/${userID}`);

    //  Correct variable names
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userID));

    toast.success(response.data.message, { position: "top-right" });
  } catch (error) {
    console.log("Error deleting user:", error);
    toast.error("Failed to delete user", { position: "top-right" });
  }
};

  return (
    <div className="userTable">
      <Link to="/add" type="button" className="btn btn-primary">
        Add User <i className="fa-solid fa-user-plus"></i>
      </Link>

      <table className="table table-border">
        <thead>
          <tr>
            <th scope="col">Sl.No.</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td className="actionButtons">
                  <Link
                    to={`/update/${user._id}`}
                    type="button"
                    className="btn btn-info"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>

                  <button 
                  onClick={()=>deleteUser(user._id)}
                  type="button" className="btn btn-danger">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default User;
