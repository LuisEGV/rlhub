import React, { useEffect, useState } from "react";
import Header from "../components/Header.js";
import { BrowserRouter as Router } from "react-router-dom";
import app from "../utils/firebase.js";
const db = app.firestore();

function Environment({ match }) {
  const [envData, setenvData] = useState();

  useEffect(() => {
    getEnv();
  }, []);

  let getEnv = async () => {
    let env;
    await db
      .collection("environments")
      .doc(match.params.id)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          console.log("Document data:", doc.data());
          env = doc.data();
        }
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    setenvData(env);
  };
  return (
    <div>
      <Header />
      {envData != undefined ? (
        <div class="min-w-screen min-h-screen bg-indigo-400 flex items-center p-3 lg:p-5 overflow-hidden relative">
          <div class="w-full max-w-6xl rounded bg-white shadow-xl p-5 lg:p-10 mx-auto text-gray-800 relative md:text-left">
            <div class="md:flex items-center -mx-10">
              <div class="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                <div class="relative">
                  <img
                    src={
                      envData.img != undefined
                        ? envData.img
                        : require("../imgs/image-banner.png")
                    }
                    class="w-full relative z-10"
                    alt=""
                  />
                  <div class="border-4 bg-indigo-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
                </div>
              </div>
              <div class="w-full md:w-1/2 px-10">
                <div class="mb-10">
                  <h1 class="font-bold uppercase text-2xl mb-5">
                    {envData != undefined ? envData.name : "Loading"}
                    <br />
                    {"("}
                    {envData != undefined ? envData.creator : "Loading"}
                    {")"}
                  </h1>
                  <p class="text-sm">
                    {envData != undefined ? envData.description : "Loading"}
                  </p>
                </div>
                <div>
                  <div class="inline-block align-bottom">
                    <button class="bg-indigo-300 opacity-75 hover:opacity-100 text-coolGray-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold">
                      <i class="mdi mdi-cart -ml-2 mr-2"></i> See Agents
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Environment;
