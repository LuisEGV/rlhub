import React, { useEffect, useState } from "react";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import firebase from "../utils/firebase";
import app from "../utils/firebase.js";
import { Redirect } from "react-router-dom";
const db = app.firestore();
const storage = app.storage();

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [profilePicture, setprofilePicture] = useState(
    "https://firebasestorage.googleapis.com/v0/b/rlhub-4e357.appspot.com/o/unityAI.png?alt=media&token=ae341976-b8e1-4963-a209-d4b4fcda246d"
  );
  const [redirect, setRedirect] = useState();

  useEffect(() => {}, []);

  let createUser = async (email, password, profilePicture) => {
    let newUser = true;
    await db
      .collection("users")
      .doc(email)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("New User");
        } else {
          newUser = false;
          alert("Email is already registerd to an account.");
          console.log("User already has account");
          return;
        }
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

    if (newUser) {
      await db
        .collection("users")
        .doc(email)
        .set({ email: email, profilePicture: profilePicture })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(function (error) {
          // Handle Errors here.
          console.log("err", error);
          // ...
        });
      alert("You have been registered");
      setRedirect(`/login`);
    }
  };

  function pictureFilter(event) {
    let problem = false;

    let file = event.target.files[0];

    // Check
    if (
      !(
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg"
      )
    ) {
      problem = true;
      alert(
        "Please Submit a PNG, JPG or JPEG image. Else your image won't be saved."
      );
      return;
    }
    // Check

    if (file.length === 0) {
      return;
    }
    if (!problem) {
      storage
        .ref(`userImages/${file.name}`)
        .put(file)
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("added Logo");
            setprofilePicture(downloadURL);
          });
        });
    }
  }

  return (
    <div>
      <Header />

      <div class="md:grid bg-indigo-600 m-2 p-2 ">
        <div class="mt-5 md:mt-0 md:col-span-2 bg-indigo-600  ">
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
                  <input
                    type="file"
                    id="myFile"
                    name={profilePicture ? profilePicture.filename : ""}
                    onChange={(event) => pictureFilter(event)}
                  ></input>
                </div>
              </div>
              {password === password2 &&
                password2 !== "" &&
                email.indexOf("@") > -1 && (
                  <div class="px-4 py-3 bg-gray-50 sm:px-6">
                    <div
                      class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() =>
                        createUser(email, password, profilePicture)
                      }
                    >
                      Submit
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {redirect && <Redirect to={redirect} />}
    </div>
  );
}

export default Register;
