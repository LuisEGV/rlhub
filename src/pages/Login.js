import React, { useEffect, useState } from "react";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import app from "../utils/firebase.js";
import firebase from "../utils/firebase";

const db = app.firestore();
const storage = app.storage();

function Login() {
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [user, setUser] = useState();
  const [description, setDescription] = useState("Write here...");
  const [model, setModel] = useState();
  const [environment, setEnvironment] = useState("Unity");
  const [gameEnv, setGameEnv] = useState("Crawler");
  const [submit, setSubmitted] = useState();

  useEffect(() => {}, [user]);

  let sendModel = async (model, description, environment, gameEnv) => {
    let modelCount = 1;
    let modelList = [
      {
        description: description,
        environment: environment,
        gameEnv: gameEnv,
        author: user.email,
      },
    ];
    await storage
      .ref(`userModels/${user.email}/${model.name}`)
      .put(model)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("added Logo");
          modelList["model"] = downloadURL;
        });
      });

    if (user["modelCount"] !== undefined) {
      modelCount = user["modelCount"] + modelCount;
    }

    if (user["modelList"] !== undefined) {
      user["modelList"] = user["modelList"].concat(modelList);
    }

    if (user["profilePicture"] !== undefined) {
      user["profilePicture"] =
        "https://firebasestorage.googleapis.com/v0/b/rlhub-4e357.appspot.com/o/userImages%2F960x0.jpg?alt=media&token=ee21a5a6-63d5-42e3-8321-d38b78cfbb70";
    }

    await db
      .collection("users")
      .doc(user.email)
      .set({
        email: user.email,
        profilePicture: user["profilePicture"],
        modelCount: modelCount,
        modelList: modelList,
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

    console.log(
      description,
      environment,
      gameEnv,
      user.email,
      modelList["model"]
    );
    await db
      .collection("env")
      .doc(environment)
      .collection("environments")
      .doc(gameEnv)
      .set({
        description: description,
        environment: environment,
        gameEnv: gameEnv,
        author: user.email,
        model: modelList["model"],
        status: "Under Review",
        uploadedDate: new Date(),
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    alert(
      "Your Model Was Submitted. It will be under review, we will let you know when it becomes available."
    );
    setUser();
  };

  function modelFilter(event) {
    let file = event.target.files[0];
    // Check

    if (file.length === 0) {
      return;
    }
    setModel(file);
    setSubmitted(true);
  }

  let SignIn = async (email, password) => {
    let problem = false;
    let authexists = true;
    let user = {};
    /// Check
    if (email === "" || !email.includes("@")) {
      alert("Make Sure You Are Writting a Proper Email");
      problem = true;
    }
    if (password === "") {
      alert(
        "ES:Asegúrese de agregar una contraseña/EN:Make Sure You Add a Password"
      );
      problem = true;
    }
    /// Check

    if (!problem) {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((value) => {
          authexists = true;
        })
        .catch((error) => {
          if (error.code === "auth/wrong-password") {
            console.log("Wrong Email or Password");
            alert("EN:Wrong Email Or Password");
          } else if (error.code === "auth/invalid-email") {
            alert("EN:Invalid-email");
          } else if (error.code === "auth/user-not-found") {
            alert("EN:No User Found With Such Email");
          }
          console.log("Err", error.code);
        });

      if (authexists) {
        await db
          .collection("users")
          .where("email", "==", email)
          .get()
          .then(function (querySnapshot) {
            if (querySnapshot.empty) {
              console.log("User doesn't exist");
            }
            querySnapshot.forEach(function (doc) {
              // doc.data() is never undefined for query doc snapshots
              user = doc.data();
              user["id"] = doc.id;
              setUser(user);
            });
          })
          .catch(function (error) {
            console.log("Error getting documents: ", error);
          });
      }
    }
    console.log(user);
  };

  return (
    <div>
      <Header />

      {user === undefined ? (
        <div class="mt-5 md:mt-0 md:col-span-2 ">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <body>
              <div class="font-sans min-h-screen antialiased bg-indigo-600 pt-24 pb-5">
                <div class="flex flex-col justify-center sm:w-96 sm:m-auto mx-5 mb-5 space-y-8 m-15vh">
                  <h1 class="font-bold text-center text-4xl text-white">
                    Sign in to your account
                  </h1>
                  <form action="#">
                    <div class="flex flex-col bg-white p-10 rounded-lg shadow space-y-6">
                      <div class="flex flex-col space-y-1">
                        <input
                          type="text"
                          name="username"
                          id="username"
                          class="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow"
                          placeholder="Username"
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </div>

                      <div class="flex flex-col space-y-1">
                        <input
                          type="password"
                          name="password"
                          id="password"
                          class="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow"
                          placeholder="Password"
                          onChange={(event) => setPassword(event.target.value)}
                        />
                      </div>

                      <div class="flex flex-col-reverse sm:flex-row sm:justify-between items-center">
                        <a
                          href="/register"
                          class="inline-block text-blue-500 hover:text-blue-800 hover:underline"
                        >
                          {" "}
                          Make an account{" "}
                        </a>
                        <div
                          type="submit"
                          class="bg-blue-500 text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors"
                          onClick={() => SignIn(email, password)}
                        >
                          Log In
                        </div>
                      </div>
                    </div>
                  </form>
                  <div class="flex justify-center text-gray-500 text-sm">
                    <p>&copy;2021. All right reserved.</p>
                  </div>
                </div>
              </div>
            </body>
          </div>
        </div>
      ) : (
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <body>
              <div class="font-sans min-h-screen antialiased bg-indigo-600 pt-24 pb-5">
                <div class="flex flex-col justify-center sm:w-96 sm:m-auto mx-5 mb-5 space-y-8">
                  <h1 class="font-bold text-center text-4xl text-white">
                    You Are Logged In {user && user.email ? user.email : ""}{" "}
                  </h1>
                  <form action="#">
                    <div class="flex flex-col bg-white p-10 rounded-lg shadow space-y-6">
                      <div> Submit New Model </div>
                      <input
                        type="file"
                        id="myFile"
                        onChange={(event) => modelFilter(event)}
                      ></input>

                      <label>Description</label>
                      <div>
                        <textarea
                          style={{}}
                          value={description}
                          onChange={(event) =>
                            setDescription(event.target.value)
                          }
                        />
                      </div>

                      <label>What Enviroment Is you Model For?</label>
                      <select
                        environment={environment}
                        onChange={(event) => setEnvironment(event.target.value)}
                      >
                        <option value="Unity">Unity</option>
                        <option value="gym">Gym</option>
                        <option value="mujoco">Mujoco</option>
                        <option value="other">Other</option>
                      </select>

                      <label>What Game Enviroment Is you Model For?</label>
                      <select
                        game={gameEnv}
                        onChange={(event) => setGameEnv(event.target.value)}
                      >
                        <option game="Crawler">Crawler</option>
                        <option game="3DBall">3DBall</option>
                        <option game="Cart-PoleV1">Cart-PoleV1</option>
                        <option game="Worm">Worm</option>
                        <option game="Worm">Kart Microgame</option>
                        <option game="other">Other</option>
                      </select>

                      <div class="flex flex-col-reverse sm:flex-row sm:justify-between items-center">
                        {description &&
                          description.length > 15 &&
                          model &&
                          submit && (
                            <div class="px-4 py-3 bg-gray-50 sm:px-6">
                              <div
                                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={() =>
                                  sendModel(
                                    model,
                                    description,
                                    environment,
                                    gameEnv
                                  )
                                }
                              >
                                Submit
                              </div>
                            </div>
                          )}
                        <div class="flex flex-col bg-white p-10 rounded-lg shadow space-y-6">
                          <div class="flex flex-col space-y-1">
                            <div>Stats</div>
                            <div>
                              {" "}
                              Your Model has been downloaded:{" "}
                              {user && user.downloadsCount
                                ? user.downloadsCount
                                : 0}{" "}
                              times.
                            </div>
                            <div>
                              {" "}
                              You have submitted:{" "}
                              {user && user.modelCount
                                ? user.modelCount
                                : 0}{" "}
                              models.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </body>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Login;
