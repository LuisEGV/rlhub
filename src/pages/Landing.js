import React, { useEffect, useState } from "react";
import Header from "../components/Header.js";
import app from "../utils/firebase.js";
import Card from "../components/Card.js";
const db = app.firestore();

function Landing() {
  const [envList, setenvList] = useState([{}]);

  useEffect(() => {
    // Update the document title using the browser API
    GetEnv();
  });

  useEffect(() => {
    // Update the document title using the browser API
  }, [envList]);

  let GetEnv = async () => {
    let env_List = [];
    const env_list = db.collection("env");
    const snapshot = await env_list.get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      env_List.push(doc.data());
    });
    setenvList(env_List);
    console.log(envList);
  };
  return (
    <div>
      <Header />
      <div className="z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
        <main className="mt-10 mx-auto px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">It's time to bring AI to</span>
            <span className="block text-indigo-600 xl:inline p-2">
              Everyone
            </span>
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg  sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Imagine being able to help opensource your trained AI models and be
            able to earn passive income from them. Here at AI-hub, that is our
            mission.
          </p>
          <div className="mt-5 sm:mt-8 sm:flex justify-center ">
            <div className="rounded-md shadow">
              <a
                href="/register"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Get started
              </a>
            </div>
          </div>
        </main>
      </div>
      <div class="container mx-auto">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-2xl md:text-3xl">
          <span className="block text-indigo-600 xl:inline p-2">
            Browse Some Environments
          </span>
        </h1>
        <div class="flex flex-wrap">
          {Object.values(envList).map((env, keys) => (
            <Card
              key={keys}
              img={env.img}
              creatorImg={env.creatorImg}
              name={env.name}
              creator={env.creator}
              description={env.description}
              tags={env.tags}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Landing;
