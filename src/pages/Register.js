import React, { useEffect, useState } from "react";
import Header from "../components/Header.js";
import app from "../utils/firebase.js";
import Card from "../components/Card.js";

function Register() {
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [password2, setPassword2] = useState(false);
  const [profilePicture, setprofilePicture] = useState(false);

  let test = () => {
    console.log(password, password2, email);
  };

  return (
    <div>
      <Header />

      <div class="bg-indigo-700" style={{ padding: "2vh" }}>
        <h2 class="justify-center text-white">Register</h2>
      </div>
      <div class="md:grid ">
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form action="#" method="POST">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
              <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div class="grid grid-cols-3 gap-6">
                  <div class="col-span-3 sm:col-span-2">
                    <label
                      for="company_website"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <div class="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="company_website"
                        id="company_website"
                        class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder="watson@ai.com"
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                  </div>
                  <div class="col-span-3 sm:col-span-2">
                    <label
                      for="company_website"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div class="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="company_website"
                        id="company_website"
                        class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder="verysecure123"
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </div>
                    <label
                      for="company_website"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <div class="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="company_website"
                        id="company_website"
                        class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder="verysecure123"
                        onChange={(event) => setPassword2(event.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">
                      Photo (Optional)
                    </label>
                    <div class="mt-1 flex items-center">
                      <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <svg
                          class="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                    </div>
                    <input type="file" id="myFile" name="filename"></input>
                  </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 sm:px-6">
                  <button
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => test()}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
