import React from "react";
import { Link } from "react-router-dom";

const AgentCard = ({ img, creator, name, creatorImg, tags, agents }) => {
  let downloadAgentData = async () => {
    // Create a reference to the file we want to download
    var starsRef = storageRef.child("images/stars.jpg");

    // Get the download URL
    starsRef
      .getDownloadURL()
      .then((url) => {
        // Insert url into an <img> tag to "download"
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            break;
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect the server response
            break;
        }
      });
  };
  return (
    <div className="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/5 mb-2 m-2">
      <Link to={`/env/${name}`}>
        <article className="overflow-hidden rounded-lg shadow-lg">
          <div style={{ position: "relative" }}>
            <img
              alt="Placeholder"
              className="block h-auto w-full"
              src={img != undefined ? img : require("../imgs/image-banner.png")}
            />

            <img
              className="block rounded-full w-12 h-12 m-2"
              style={{ position: "absolute", bottom: "0", left: "0" }}
              src={
                creatorImg != undefined
                  ? creatorImg
                  : "https://picsum.photos/32/32/?random"
              }
            />
          </div>

          <header className="flex items-center justify-between leading-tight p-2 md:p-4">
            <div class="font-bold text-xl mb-2">
              {name != undefined ? name : "undefined"}
              <p className="text-sm">{creator}</p>
            </div>
          </header>

          <footer className="flex items-center justify-between leading-none p-2 md:p-4">
            {tags != undefined
              ? tags.map((tag, key) => (
                  <span
                    class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    key={key}
                  >
                    {" "}
                    {tag}
                  </span>
                ))
              : null}
          </footer>
        </article>
      </Link>
    </div>
  );
};

export default AgentCard;
