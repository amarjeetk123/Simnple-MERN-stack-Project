import React, { useEffect, useState } from 'react'
import axios from 'axios'

function UserList() {

    const [userData , setUserData] = useState("");  // null or empty string "" both are same , this is default value

    const fetchUserData = async () =>{

        const respo = await axios.get("/getUser")
        // console.log(respo)

        // if no users is there plesae no set the value of setUserData
        if(respo.data.users.length >0){
            setUserData(respo.data.users)
        }
    }

    // here we can put all the code of fetchUserData function inside useEffect insted of  calling that funvtion but the problem is,  it is a bad practice to put asynch await inside useEffect 
    useEffect(()=>{
        fetchUserData();
    })
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
              userData.map((user) => (
                <tr>
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                    <button
                      className="hover:text-green-500"
                    //   onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-4 py-3 text-lg text-gray-900">
                    <button
                      className="hover:text-red-500"
                    //   onClick={() => handleDelete(user._id)}
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