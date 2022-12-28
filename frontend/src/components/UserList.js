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
  const [userDetails, setUserDetails] = useState("")   // this is set when we click on delete icon
  const [firstField, setFirstField] = useState("")
  const [secondField, setSecondField] = useState("")
  const [deletePermission, setDeletePermission] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleDelete = async () => {
    // console.log(userDetails)
    // console.log(firstField)
    if (!firstField || !secondField) {
      return;
    }
    if (userDetails.email !== firstField) {
      return alert("Wrong Email Id");
    }
    if (secondField !== "delete this information") {
      return alert("Second Field is Wrong");
    }

    const userId = userDetails._id
    const delete_ = await axios.delete(`${BASE_URL}/deleteUser/${userId}`);
    if (delete_) {
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false)
      }, 2000);
      setDeletePermission(false)
      setUserDetails("")
      setFirstField("")
      setSecondField("")
    }
  };



  // code for applying hover effect on lord-icon
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
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
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 text-[21px]">
                  Email
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 text-[21px]">
                  Edit
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 ">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {
                userData ?     userData.map((user, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3 text-[19px]">{user.name}</td>
                    <td className="px-4 py-3 text-[19px]">{user.email}</td>
                    <td className="px-4 py-3"   >
                      <button
                        className="hover:text-green-500  text-[19px] "
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-4 py-3 ">
                      <button>
                        <lord-icon
                          src="https://cdn.lordicon.com/jmkrnisz.json"
                          trigger="morph"
                          colors={isHovering ? "primary:#c71f16" : "blue"}
                          className="hover:bg-red-200 "
                          style={{
                            cursor: "pointer",
                            width: "40px",
                            height: "40px",
                            colors: "primary:#121331"
                          }}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                          onClick={() => {
                            setDeletePermission(true)
                            setUserDetails(user)
                          }}></lord-icon>
                      </button>
                    </td>
                  </tr>
                )) : null
             
              }
            </tbody>
          </table>
        </div>
      </div>


      {/* code for open a popup  */}
      {deletePermission && (
        <div className="  w-[100%] h-[100vh] custom top-0 flex justify-center items-center ">
          <div className=" w-[600px] bg-black rounded-[10px] pt-4 border-[1px]">
            <div className="text-white flex flex-col gap-4 items-center  px-6   ">
              <h1 className="text-[27px] -mb-2 ">Delete Project</h1>
              <h2 className="text-[18px] text-gray-400 ">
                This project will be deleted, along with all of its Deployments.
              </h2>
              <button className="bg-red-600 text-[12px] w-[100%] px-2 py-1 rounded-[4px] py-1 text-[20px] ">
                {" "}
                <span className="text-semibold">Warning:</span> This action is
                not reversible. Please be certain.
              </button>
            </div>

            <div className="mt-10 bg-gray-800 py-6 border-[1px]   px-6">
              <h2 className="text-white text-[18px] mb-1 ">
                Enter the email id
                <span className="text-gray-400 text-[22px] ">  {userDetails.email} </span>
                to continue:
              </h2>
              <input className="w-[100%] rounded-[4px] pl-2  text-[20px] py-1 font-semibold outline-none  bg-black text-white border-white transition duration-500 ease-in-out mt-1 "
                onChange={(e) => setFirstField(e.target.value)} />
              <h2 className="text-white text-[18px] mb-1 mt-4 ">
                To verify, type{" "}
                <span className="text-gray-400 text-[22px]">delete this information</span>{" "}
                below:
              </h2>
              <input className="w-[100%] rounded-[4px] pl-2  text-[22px] text-white py-1 mt-1 font-semibold outline-none bg-black "
                onChange={(e) => setSecondField(e.target.value)} />
            </div>

            <div className=" text-[19px] ">
              <button
                className="w-[50%] hover:text-white hover:bg-gray-800 py-6 border-[1px] "
                onClick={() => {
                  setDeletePermission(false)
                  setUserDetails("")
                  setFirstField("")
                  setSecondField("")
                }}
              >
                Cancel
              </button>
              <button className="w-[50%] text-white hover:bg-gray-800 py-6 border-[1px]  "
                onClick={() => handleDelete()}

                style={{

                  cursor: firstField === "" || secondField === "" ? "not-allowed" : "pointer"
                  // pointerEvents: "none"
                }} >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}


      {/* creating a animatioon which will visible at the time of deleting details  */}
      {showAnimation &&
        <div className="  w-[100%] h-[100vh] absolute custom2 top-0 flex justify-center items-center ">
          <lord-icon
            src="https://cdn.lordicon.com/jmkrnisz.json"
            trigger="loop"
            colors="primary:#c71f16"
            state="morph-erase"
            style={{
              cursor: "pointer",
              width: "400px",
              height: "400px",
            }}
          >
          </lord-icon>
        </div>}

    </section>
  );
}
{
  /*  */
}

export default UserList;
