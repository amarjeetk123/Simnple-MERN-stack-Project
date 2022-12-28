import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../App";

import lottie from "lottie-web";
import { defineElement } from "lord-icon-element";
// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

function UserList() {
  const [userData, setUserData] = useState(""); // null or empty string "" both are same , this is default value

  const fetchUserData = async () => {
    const respo = await axios.get(`${BASE_URL}/getUser`);
    // console.log(respo)

    // if no users is there plesae no set the value of setUserData
    if (respo.data.users.length > 0) {
      setUserData(respo.data.users);
    }
  };

  // here we can put all the code of fetchUserData function inside useEffect insted of  calling that funvtion but the problem is,  it is a bad practice to put asynch await inside useEffect
  useEffect(() => {
    fetchUserData();
  }, [userData]);

  // function for edit the details........
  const handleEdit = async (user) => {
    const userChoice = prompt("what you want to delete name or email");
    if (userChoice === "name") {
      const newName = prompt("Please Enter Your New Name");
      if (!newName) {
        alert("Please enter the name");
      } else {
        const editName = await axios.put(`${BASE_URL}/editUser/${user._id}`, {
          name: newName,
        });
      }
    } else if (userChoice === "email") {
      const newEmail = prompt("Please Enter Your New Email");

      // check user is already exist or not
      let a = false;
      userData.forEach((user) => {
        if (user.email === newEmail) {
          a = true;
        }
      });
      if (a === true) {
        alert(`${newEmail} is already is in use please write a differen email`);
      }

      if (!newEmail) {
        alert("Please enter the name");
      } else {
        const editEmail = await axios.put(`/editUser/${user._id}`, {
          email: newEmail,
        });
      }
    } else {
      alert("Please Write The Correct Option");
    }
  };

  // function for delete the details
  const [ deletePermission ,setDeletePermission] = useState(false)
  const handleDelete = async (userId) => {
    setDeletePermission(true)
    // let userChoic = window.confirm("Are You Sure ?");
    // if (userChoic) {
    //   const delete_ = await axios.delete(`${BASE_URL}/deleteUser/${userId}`);
    // }
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-8">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            All Users
          </h1>
        </div>
        <div className="lg:w-2/3 w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Name
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Email
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Edit
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {userData &&
                userData.map((user, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">
                      <button
                        className="hover:text-green-500"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-4 py-3 text-lg text-gray-900">
                      <button
                        className="hover:text-red-500"
                        onClick={() => handleDelete(user._id)} // we can pass yser or user._id
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {deletePermission && 
      <div className="  w-[100%] h-[100vh] custom top-0 flex justify-center items-center ">
      <div className=" w-[600px] bg-black rounded-[10px] pt-4 border-[1px]">

        <div className="text-white flex flex-col gap-4 items-center  px-6   ">
          <h1 className="text-[27px] -mb-2 ">Delete Project</h1>
          <h2 className="text-[18px] text-gray-400 ">
            This project will be deleted, along with all of its Deployments.
          </h2>
          <button className="bg-red-600 text-[12px] w-[100%] px-2 py-1 rounded-[4px] py-1 text-[18px] ">
            {" "}
            <span className="text-semibold">Warning:</span> This action is not
            reversible. Please be certain.
          </button>
        </div>

        <div className="mt-10 bg-gray-800 py-6 border-[1px]   px-6" >
          <h2 className="text-white text-[18px] mb-1 ">
            Enter the email id <span className="text-gray-400" >amarjeetk123/tic-tac-toe</span> to
            continue:
          </h2>
          <input className="w-[100%] rounded-[4px] pl-2  text-[20px] py-1 font-semibold outline-none  bg-black text-white border-white transition duration-500 ease-in-out mt-1 " />
          <h2 className="text-white text-[18px] mb-1 mt-4 ">
            To verify, type <span className="text-gray-400">delete this information</span> below:
          </h2>
          <input className="w-[100%] rounded-[4px] pl-2  text-[22px] text-white py-1 mt-1 font-semibold outline-none bg-black " />
        </div>

        <div className=" text-[19px] " >
          <button className="w-[50%] hover:text-white hover:bg-gray-800 py-6 border-[1px] " 
          onClick={() => setDeletePermission(false) }
          >Cancel</button>
          <button  className="w-[50%] text-white hover:bg-gray-800 py-6 border-[1px]">Delete</button>
        </div>
      </div>
    </div> }
    </section>
  );
}
{
  /* <lord-icon  
            src="https://cdn.lordicon.com/nhfyhmlt.json"
            trigger="hover"
            className=" icon1 "
            style={{cursor: "pointer", float:"right" , margin:"5px 5px 0px 0px" , width:"50px" , height:"50px"  }}
            > </lord-icon> */
}

export default UserList;
