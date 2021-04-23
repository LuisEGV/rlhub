import React from "react";
import { Link } from "react-router-dom";

const Card = ({ img, creator, name, creatorImg, tags, agents }) => {
  return (
    <div
      className="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/5 mb-2 m-2"
      style={{ minHeight: "20vh" }}
    >
      <Link to={`/env/${name}`}>
        <article
          className="overflow-hidden rounded-lg shadow-lg"
          style={{ minHeight: "20vh" }}
        >
          <div style={{ position: "relative" }}>
            <img
              alt="Placeholder"
              className="block h-auto w-full"
              src={img != undefined ? img : require("../imgs/unityAI.png")}
            />

            <img
              className="block rounded-full w-12 h-12 m-2"
              style={{ position: "absolute", bottom: "0", left: "0" }}
              src={
                creatorImg != undefined
                  ? creatorImg
                  : require("../imgs/unityAI.png")
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

export default Card;
