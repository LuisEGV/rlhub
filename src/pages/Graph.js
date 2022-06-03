import React, { useState } from "react";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Graph from "react-graph-vis";

let segments = {
  Elves: "red",
  Dwarves: "blue",
  Man: "green",
  Bad: "red",
  Good: "blue",
};

function GraphPage() {
  const [graphData, setGraphData] = useState({
    nodes: [
      {
        id: 1,
        edges: [2],
        shape: "circularImage",
        borderWidth: "5",
        color: "Good",
        label: "Gandalf",
        image:
          "https://firebasestorage.googleapis.com/v0/b/rlhub-4e357.appspot.com/o/unityAI.png?alt=media&token=ae341976-b8e1-4963-a209-d4b4fcda246d",
      },
      {
        id: 2,
        edges: [1],
        shape: "circularImage",
        borderWidth: "5",
        color: "Good",
        label: "Frodo",
        image:
          "https://firebasestorage.googleapis.com/v0/b/rlhub-4e357.appspot.com/o/unityAI.png?alt=media&token=ae341976-b8e1-4963-a209-d4b4fcda246d",
      },
      {
        id: 3,
        edges: [4],
        shape: "circularImage",
        borderWidth: "5",
        color: "Bad",
        label: "Gollum",
        image:
          "https://firebasestorage.googleapis.com/v0/b/rlhub-4e357.appspot.com/o/unityAI.png?alt=media&token=ae341976-b8e1-4963-a209-d4b4fcda246d",
      },
      {
        id: 4,
        edges: [3],
        shape: "circularImage",
        borderWidth: "5",
        color: "Bad",
        label: "Sauron",
        image:
          "https://firebasestorage.googleapis.com/v0/b/rlhub-4e357.appspot.com/o/unityAI.png?alt=media&token=ae341976-b8e1-4963-a209-d4b4fcda246d",
      },
      {
        id: 5,
        edges: [1, 2],
        shape: "circularImage",
        borderWidth: "5",
        color: "Good",
        label: "Aragorn",
        image:
          "https://firebasestorage.googleapis.com/v0/b/rlhub-4e357.appspot.com/o/unityAI.png?alt=media&token=ae341976-b8e1-4963-a209-d4b4fcda246d",
      },
    ],
    edges: [
      {
        from: 1,
        to: 2,
        color: "red",
      },
      {
        from: 2,
        to: 1,
        color: "red",
      },
      {
        from: 1,
        to: 3,
        color: "red",
      },
      {
        from: 1,
        to: 4,
        color: "red",
      },
      {
        from: 5,
        to: 4,
        color: "red",
      },
    ],
  });

  // Information, Add Node, Specific Node
  const [modalOption, setModalOption] = useState("General Information");
  const [show, setShow] = useState(true);
  const [options, setOptions] = useState({
    layout: {
      hierarchical: true,
    },

    edges: {
      color: "#999",
    },
    height: "500px",
    manipulation: {
      addNode: function (nodeData, callback) {
        nodeData.label = "hello world";
        callback(nodeData);
      },
    },
  });

  const [nodeToAdd, setNodeToAdd] = useState({
    name: "Sponge Bob",
    label: "Red",
    id: "Sponge Bob",
    shape: "circularIamge",
    image:
      "https://firebasestorage.googleapis.com/v0/b/rlhub-4e357.appspot.com/o/unityAI.png?alt=media&token=ae341976-b8e1-4963-a209-d4b4fcda246d",
    color: "red",
  });

  const deconstructNodeAndEdges = (nodes) => {
    let edgesArray = [];

    for (let node = 0; node < nodes.length; node++) {
      for (let edge = 0; edge < nodes[node].edges.length; edge++) {
        edgesArray.push({
          from: nodes[node].id,
          to: nodes[node].edges[edge],
          color: segments[nodes[node].color],
        });
      }
    }

    setGraphData({ nodes: nodes, edges: edgesArray });
    return edgesArray;
  };

  return (
    <div>
      <Header />
      <div className="grid grid-cols-2  bg-gradient-to-r from-purple-200 to-blue-00">
        <div className="col-span-1">
          <button onClick={() => deconstructNodeAndEdges(graphData.nodes)}>
            {" "}
            test
          </button>
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-5">
            {modalOption === "General Information" && (
              <div>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    Lord of The Rings
                  </div>
                  <p className="text-gray-700 text-base">
                    The Lord of the Rings is a series of three epic fantasy
                    adventure films directed by Peter Jackson, based on the
                    novel written by J. R. R. Tolkien. The films are subtitled
                    The Fellowship of the Ring, The Two Towers, and The Return
                    of the King.
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <button
                    onClick={() => setModalOption("Add Node")}
                    className="hover:cursor-pointer hover:shadow-lg border-2 rounded-md shadow-md p-2 flex flex-row font-semibold hover:scale-105 text-center  duration-200 ease-out cursor-pointer justify-center items-center space-x-1 "
                  >
                    {" "}
                    Add Node
                  </button>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #books
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #movies
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #enteraintment
                  </span>
                </div>
              </div>
            )}
            {modalOption === "Add Node" && (
              <div>
                <div className="px-6 py-4">
                  <div className="flex-row flex">
                    <button
                      onClick={() => setModalOption("General Information")}
                      className="hover:cursor-pointer rounded-2xl hover:shadow-lg bg-red-600 text-white shadow-md py-1 px-3 flex flex-row font-semibold hover:scale-105 text-center  duration-200 ease-out cursor-pointer justify-center items-center space-x-1 "
                    >
                      {" "}
                      X
                    </button>
                    <div className="font-bold text-xl ml-2">Add Node</div>
                  </div>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <form className="my-1">
                    <label
                      className="block text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Name
                    </label>
                    <input
                      value={nodeToAdd.name}
                      onChange={(e) =>
                        setNodeToAdd({ ...nodeToAdd, name: e.target.value })
                      }
                      maxLength="40"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </form>
                  <form className="my-1">
                    <label
                      className="block text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Group Segment
                    </label>
                    <select
                      type="select"
                      name="select"
                      id="select icon"
                      className=" px-3 py-3 hover:cursor-pointer hover:bg-slate-100 form-select appearance-none block w-full hover:bg-gray-200 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-800 focus:outline-none"
                      onChange={(e) =>
                        setNodeToAdd({ ...nodeToAdd, color: e.target.value })
                      }
                    ></select>
                  </form>
                  <form className="my-1">
                    <label
                      className="block text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Connections To
                    </label>
                    <select
                      type="select"
                      name="select"
                      id="select icon"
                      className=" px-3 py-3 hover:cursor-pointer hover:bg-slate-100 form-select appearance-none block w-full hover:bg-gray-200 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-800 focus:outline-none"
                      onChange={(e) =>
                        setNodeToAdd({ ...nodeToAdd, color: e.target.value })
                      }
                    ></select>
                  </form>
                  <form className="my-1">
                    <label
                      className="block text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Add User Image
                    </label>
                    <input
                      className="form-control block w-full px-3 py-1 text-base font-normalbg-white bg-clip-padding text-gray-700 border border-solid border-gray-300 rounded transition  ease-in-out  m-0  focus:text-gray-700 focus:bg-white focus:border-blue-800 focus:outline-none"
                      type="file"
                      id="img"
                      name="img"
                      accept="image/*"
                    />
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-1">
          {show && (
            <Graph
              graph={graphData}
              options={options}
              getNetwork={(network) => {
                //  if you want access to vis.js network api you can set the state in a parent component using this property
              }}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default GraphPage;
