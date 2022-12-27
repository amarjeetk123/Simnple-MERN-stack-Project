import React, { useState } from 'react'
import axios from "axios"
import {BASE_URL} from "../App"

const Form = () => {
  // console.log(BASE_URL)

  // To store the value from frontend 
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  // console.log(userName , userEmail) 

  // function to send the data to backend
  const submitData = async () => {
    console.log("submit")
    const data = {
      name: userName,
      email: userEmail,
    }
    // for sending the data from frontend to backend or viceversa we used axios
    // by using axios we send the data inside database
    // actually we write a "proxy" inside package.json otherwise instead of "/createUser" we have to write "http://localhost:4000/createUser"
   try {
    const res = await axios.post(`${BASE_URL}/createUser`, data)
    console.log(res)
   } catch (error) {
    console.log(error.message)
   }
  }

  // function which will run on submit of form
  const handleSubmit = (e) => {
    e.preventDefault()

    // to submit the data 
    submitData()
    // but EMPTY the user details
    setUserName("")
    setUserEmail("")

  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <section className="text-gray-600 body-font relative">
          <div className="container px-5 py-8 mx-auto">
            <div className="flex flex-col text-center w-full mb-6">
              <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
                Create User
              </h1>
            </div>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      value={userName}
                      onChange={(event) => setUserName(event.target.value)}
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      value={userEmail}
                      onChange={(event) => {
                        setUserEmail(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <button
                    type="submit"
                    className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  )
}

export default Form