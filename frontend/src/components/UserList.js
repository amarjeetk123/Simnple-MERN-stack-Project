import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {BASE_URL} from "../App"

function UserList() {

    const [userData , setUserData] = useState("");  // null or empty string "" both are same , this is default value

    const fetchUserData = async () =>{

        const respo = await axios.get(`${BASE_URL}/getUser`)
        // console.log(respo)

        // if no users is there plesae no set the value of setUserData
        if(respo.data.users.length >0){
            setUserData(respo.data.users)
        }
    }

    // here we can put all the code of fetchUserData function inside useEffect insted of  calling that funvtion but the problem is,  it is a bad practice to put asynch await inside useEffect 
    useEffect(()=>{
        fetchUserData();
    } , [userData] );


    // function for edit the details........
    const handleEdit = async (user) =>{

      const userChoice = prompt("what you want to delete name or email")
      if(userChoice === "name"){
        const newName = prompt("Please Enter Your New Name")
        if(!newName){
          alert("Please enter the name")
        }
        else{
          const editName = await axios.put(`${BASE_URL}/editUser/${user._id}` , {
            name: newName ,
          } )
        }
      }
      else if(userChoice === "email"){
        const newEmail = prompt("Please Enter Your New Email")
        
        // check user is already exist or not
        let a = false;
        userData.forEach((user) => {
          if(user.email === newEmail){
            a = true;
          }
        });
        if(a === true){
          alert(`${newEmail} is already is in use please write a differen email`)
        }


        if(!newEmail){
          alert("Please enter the name")
        }
        else{
          const editEmail = await axios.put(`/editUser/${user._id}` , {
            email: newEmail ,
          } )
        }
      }
      else{
       alert("Please Write The Correct Option")
      }

    
    }

    // function for delete the details
    const handleDelete = async (userId) => {
      let userChoic = window.confirm("Are You Sure ?")
      if(userChoic){
        const delete_ =  await axios.delete(`${BASE_URL}/deleteUser/${userId}`)
      }
    }


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
  </section>
  )
}

export default UserList