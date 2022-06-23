import React, { useState, useEffect } from "react";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import ForceGraph3D from "react-force-graph-3d";
import { Sprite, CanvasTexture, SpriteMaterial } from "three";
import ImageTest from "../imgs/download.png";
import Frodo from "../imgs/frodo.jpg";
import Aragorn from "../imgs/aragorn.jpg";
import Gandalf from "../imgs/gandalf.jpg";
import Gollum from "../imgs/gollum.jpg";
import Sauron from "../imgs/sauron.jpg";

let segments = {
  Elves: "red",
  Dwarves: "blue",
  Man: "green",
  Bad: "red",
  Good: "blue",
};

let colors = ["blue", "white"];

let test = {
  nodes: [
    {
      id: 1,
      edges: [2],

      borderWidth: "5",
      color: "Good",
      label: "Gandalf",
      image:
        "https://firebasestorage.googleapis.com/v0/b/rlhub-4e357.appspot.com/o/unityAI.png?alt=media&token=ae341976-b8e1-4963-a209-d4b4fcda246d",
    },
    {
      id: 2,
      edges: [1],

      borderWidth: "5",
      color: "Good",
      label: "Frodo",
      image:
        "https://firebasestorage.googleapis.com/v0/b/rlhub-4e357.appspot.com/o/unityAI.png?alt=media&token=ae341976-b8e1-4963-a209-d4b4fcda246d",
    },
    {
      id: 3,
      edges: [4, 1],

      borderWidth: "5",
      color: "Bad",
      label: "Gollum",
      image:
        "https://firebasestorage.googleapis.com/v0/b/rlhub-4e357.appspot.com/o/unityAI.png?alt=media&token=ae341976-b8e1-4963-a209-d4b4fcda246d",
    },
    {
      id: 4,
      edges: [3],

      borderWidth: "5",
      color: "Bad",
      label: "Sauron",
      image:
        "https://firebasestorage.googleapis.com/v0/b/rlhub-4e357.appspot.com/o/unityAI.png?alt=media&token=ae341976-b8e1-4963-a209-d4b4fcda246d",
    },
    {
      id: 5,
      edges: [1, 2],

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
      color: "blue",
      id: "00",
    },
    {
      from: 2,
      to: 1,
      color: "blue",
      id: "10",
    },
    {
      from: 1,
      to: 3,
      color: "red",
      id: "20",
    },
    {
      from: 1,
      to: 4,
      color: "red",
      id: "21",
    },
    {
      from: 5,
      to: 3,
      color: "red",
      id: "30",
    },
    {
      from: 5,
      to: 1,
      color: "blue",
      id: "40",
    },
    {
      from: 5,
      to: 2,
      color: "blue",
      id: "41",
    },
  ],
};

function GraphPage() {
  const [graphData, setGraphData] = useState({
    nodes: [
      { id: 0, index: 0, canvas: drawCircle() },
      { id: 1, index: 1, canvas: drawCircle() },
      { id: 3, index: 2, canvas: drawCircle() },
      { id: 4, index: 3, canvas: drawCircle() },
      { id: 2, index: 4, canvas: drawCircle() },
    ],
    links: [
      {
        source: 1,
        target: 0,
      },
      {
        source: 0,
        target: 2,
      },
      {
        source: 2,
        target: 1,
      },
      {
        source: 4,
        target: 3,
      },
      {
        source: 0,
        target: 4,
      },
    ],
  });
  const [nodeOfInterest, setNodeOfInterest] = useState();
  // Information, Add Node, Specific Node
  const [edgeOfInterest, setEdgeOfInterest] = useState();
  // Information, Add Node, Specific Node

  const [modalOption, setModalOption] = useState("General Information");
  const [keyState, setKeyState] = useState(1);

  const [nodeToAdd, setNodeToAdd] = useState({
    name: "Sponge Bob",
    label: "Red",
    id: "Sponge Bob",
    shape: "circularIamge",
    image:
      "https://firebasestorage.googleapis.com/v0/b/rlhub-4e357.appspot.com/o/unityAI.png?alt=media&token=ae341976-b8e1-4963-a209-d4b4fcda246d",
    color: "red",
  });

  const hasWindow = typeof window !== "undefined";

  const genRandomTree = (N = 1000) => {
    let data = {
      nodes: [...Array(N).keys()].map((i) => ({
        id: i,
        canvas: drawCircle(),
      })),
      links: [...Array(N).keys()]
        .filter((id) => id)
        .map((id) => ({
          source: id,
          target: Math.round(Math.random() * (id - 1)),
        })),
    };

    return data;
  };

  //draw a circle to a canvas and return
  function drawCircle() {
    let canvas = document.createElement("canvas");
    let img = document.getElementById("testImage");

    let pat;
    if (img !== null) {
      canvas.id = "canvas";
      canvas.width = 300;
      canvas.height = 300;
      let ctx = canvas.getContext("2d");
      pat = ctx.createPattern(img, "no-repeat");
      ctx.rect(0, 0, 300, 300);
      ctx.fillStyle = pat;
      ctx.fill();
    } else {
      canvas.id = "canvas";
      canvas.width = 32;
      canvas.height = 32;
      let ctx = canvas.getContext("2d");
      let PI2 = Math.PI * 2;
      ctx.arc(16, 16, 16, 0, PI2, true);
      pat = colors[Math.floor(Math.random() * colors.length)];
      ctx.fillStyle = pat;
      ctx.fill();
    }

    return canvas;
  }

  //draw a circle to a canvas and return
  function drawCircleTest(name, reduce = 1) {
    let canvas = document.createElement("canvas");
    let img = document.getElementById(name);
    let ctx = canvas.getContext("2d");
    if (img !== null) {
      canvas.height = canvas.width * (img.height / img.width) * 1;
      canvas.width = canvas.height;

      let canvasFinal = document.createElement("canvas");
      let newCanvas = canvasFinal.getContext("2d");

      canvasFinal.width = img.width * reduce;
      canvasFinal.height = img.height * reduce;

      newCanvas.drawImage(img, 0, 0, canvasFinal.width, canvasFinal.height);

      // step 2
      newCanvas.drawImage(
        canvasFinal,
        0,
        0,
        canvasFinal.width * reduce,
        canvasFinal.height * reduce
      );

      ctx.arc(100, 100, 100, 0, Math.PI * 2, false);

      ctx.clip();

      ctx.restore();

      ctx.id = "canvas";
      // step 3, resize to final size
      ctx.drawImage(
        canvasFinal,
        0,
        0,
        canvasFinal.width * reduce,
        canvasFinal.height * reduce,
        0,
        0,
        canvas.width,
        canvas.height
      );

      return canvas;
    }
  }

  const addNode = (nodes) => {
    /*
    let edgesArray = [];

    for (let node = 0; node < nodes.length; node++) {
      for (let edge = 0; edge < nodes[node].edges.length; edge++) {
        edgesArray.push({
          from: nodes[node].id,
          to: nodes[node].edges[edge],
          color: segments[nodes[node].color],
          id: node.toString() + edge.toString(),
        });
      }
    }
    setKeyState(keyState + 1);
    console.log({ nodes: nodes, edges: edgesArray });
    */

    let nodesArray = graphData["nodes"];
    nodesArray.push({
      id: nodesArray.length,
      index: nodesArray.length,
      canvas: drawCircle(),
    });

    let edgeArray = graphData["links"];

    let rand = Math.floor(Math.random() * nodesArray.length);
    edgeArray.push({
      source: nodesArray.length - 1,
      target: rand,
    });

    setGraphData({ links: edgeArray, nodes: nodesArray });
  };

  const deleteSpecificNode = (id) => {
    let remainingNodes = graphData["nodes"].filter((obj) => obj.id !== id);
    let takenEdges = graphData["links"].filter(
      (obj) => obj.source.id === id || obj.target.id === id
    );

    let linksE = graphData["links"];

    for (let edge = 0; edge < takenEdges.length; edge++) {
      linksE.splice(takenEdges.index, 1);
    }

    setGraphData({ links: linksE, nodes: remainingNodes });
    setNodeOfInterest();
    setModalOption("General Information");
  };

  const deleteSpecificEdge = (edge) => {
    let remainingEdges = graphData["links"].filter(
      (obj) => obj.index !== edge.index
    );
    setGraphData({ ...graphData, links: remainingEdges });
    setModalOption("General Information");
  };

  const addRandomEdge = (id) => {
    let linksE = graphData["links"];
    let edgeList = [];

    for (let edge = 0; edge < linksE.length; edge++) {
      if (linksE[edge].source.id === id) {
        edgeList.push(linksE[edge].target.id);
      }
    }

    let rand = Math.floor(Math.random() * graphData["nodes"].length);

    if (rand !== id && !(rand in edgeList)) {
      linksE.push({
        source: id,
        target: rand,
      });

      setGraphData({ ...graphData, links: linksE });
    }
  };

  const addSpecificNode = (name) => {
    /*
    let edgesArray = [];

    for (let node = 0; node < nodes.length; node++) {
      for (let edge = 0; edge < nodes[node].edges.length; edge++) {
        edgesArray.push({
          from: nodes[node].id,
          to: nodes[node].edges[edge],
          color: segments[nodes[node].color],
          id: node.toString() + edge.toString(),
        });
      }
    }
    setKeyState(keyState + 1);
    console.log({ nodes: nodes, edges: edgesArray });
    */

    let nodesArray = graphData["nodes"];
    nodesArray.push({
      id: nodesArray.length,
      index: nodesArray.length,
      canvas: drawCircleTest(name),
      description:
        "Gandalf the Grey, later known as Gandalf the White, and originally named Olórin (Quenya; IPA: [olorin]), was an Istar (Wizard), dispatched to Middle-earth in the Third Age to combat the threat of Sauron. He joined Thorin II Oakenshield and his company to reclaim the Lonely Mountain from Smaug, helped form the Fellowship of the Ring to destroy the One Ring, and led the Free Peoples in the final campaign of the War of the Ring.",
      name: "Gandalf",
      label: "Gandalf",
    });

    let edgeArray = graphData["links"];

    let rand = Math.floor(Math.random() * nodesArray.length);
    edgeArray.push({
      source: nodesArray.length - 1,
      target: rand,
    });

    setGraphData({ links: edgeArray, nodes: nodesArray });
  };

  const deleteNode = () => {
    let nodesArray = graphData["nodes"];

    nodesArray.splice(Math.floor(Math.random() * nodesArray.length), 1);

    setGraphData({ ...graphData, nodes: nodesArray });
  };

  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  function getWindowDimensions() {
    if (hasWindow !== undefined) {
      const width = hasWindow ? window.innerWidth : null;
      const height = hasWindow ? window.innerHeight : null;
      return {
        width,
        height,
      };
    }
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  let testData = {
    nodes: [
      { id: 0, index: 0, canvas: drawCircle() },
      { id: 1, index: 1, canvas: drawCircle() },
      { id: 3, index: 2, canvas: drawCircle() },
      { id: 4, index: 3, canvas: drawCircle() },
      { id: 2, index: 4, canvas: drawCircle() },
    ],
    links: [
      {
        source: 1,
        target: 0,
      },
      {
        source: 0,
        target: 2,
      },
      {
        source: 2,
        target: 1,
      },
      {
        source: 4,
        target: 3,
      },
      {
        source: 0,
        target: 4,
      },
    ],
  };

  return (
    <div>
      <Header />
      <div className="grid grid-cols-3   bg-black">
        <div className="col-span-1">
          <img
            onClick={() => addNode(graphData.nodes)}
            src={ImageTest}
            id="testImage"
            width="32"
            alt="mario"
            height="32"
          />
          <img
            onClick={() => addSpecificNode("sauron")}
            src={Sauron}
            id="sauron"
            width="32"
            alt="Sauron"
            height="32"
          />
          <img
            onClick={() => addSpecificNode("frodo")}
            src={Frodo}
            id="frodo"
            width="32"
            alt="Frodo"
            height="32"
          />
          <img
            onClick={() => addSpecificNode("aragorn")}
            src={Aragorn}
            id="aragorn"
            width="32"
            alt="Aragorn"
            height="32"
          />
          <img
            onClick={() => addSpecificNode("gandalf")}
            src={Gandalf}
            id="gandalf"
            width="32"
            alt="Gandalf"
            height="32"
          />
          <img
            onClick={() => addSpecificNode("gollum")}
            src={Gollum}
            id="gollum"
            width="32"
            alt="gollum"
            height="32"
          />

          <p className="text-white" onClick={() => deleteNode()}>
            {" "}
            Delete
          </p>
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-5">
            {nodeOfInterest !== undefined && modalOption === "Specific Node" && (
              <div>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    {nodeOfInterest.name}
                  </div>
                  <div className="items-center place-content-center text-center">
                    <img
                      src={Gandalf}
                      id="Gandalf-img"
                      width="100"
                      alt="Gandalf-img"
                      height="100"
                      className="inline object-cover w-32 h-32 mr-2 rounded-full shadow-lg border-1 "
                    />
                  </div>
                  <p className="text-gray-700 text-base">
                    {nodeOfInterest.description}
                  </p>
                </div>
                <div className=" flex flex-row px-6 pt-4 pb-2">
                  <button
                    onClick={() => deleteSpecificNode(nodeOfInterest.id)}
                    className="hover:cursor-pointer hover:shadow-lg border-2 rounded-md shadow-md p-2 flex flex-row font-semibold hover:scale-105 text-center  duration-200 ease-out cursor-pointer justify-center items-center space-x-1 "
                  >
                    {" "}
                    Delete
                  </button>
                  <button
                    onClick={() => addRandomEdge(nodeOfInterest.id)}
                    className="hover:cursor-pointer hover:shadow-lg border-2 rounded-md shadow-md p-2 flex flex-row font-semibold hover:scale-105 text-center  duration-200 ease-out cursor-pointer justify-center items-center space-x-1 "
                  >
                    {" "}
                    Add Edge
                  </button>
                </div>
              </div>
            )}
            {edgeOfInterest !== undefined && modalOption === "Specific Edge" && (
              <div>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    Source: {edgeOfInterest.source.id} -
                  </div>
                  <div className="font-bold text-xl mb-2">
                    Target: {edgeOfInterest.target.id} -
                  </div>

                  <p className="text-gray-700 text-base">Description</p>
                </div>
                <div className=" flex flex-row px-6 pt-4 pb-2">
                  <button
                    onClick={(e) => {
                      console.log(edgeOfInterest);
                      deleteSpecificEdge(edgeOfInterest);
                    }}
                    className="hover:cursor-pointer hover:shadow-lg border-2 rounded-md shadow-md p-2 flex flex-row font-semibold hover:scale-105 text-center  duration-200 ease-out cursor-pointer justify-center items-center space-x-1 "
                  >
                    {" "}
                    Delete
                  </button>
                </div>
              </div>
            )}

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
        <div className="col-span-2">
          <ForceGraph3D
            graphData={graphData}
            nodeLabel="id"
            width={
              windowDimensions !== undefined
                ? windowDimensions.width * 0.66
                : 10
            }
            onNodeClick={(e) => {
              setNodeOfInterest(e);
              setModalOption("Specific Node");
            }}
            onLinkClick={(e) => {
              setEdgeOfInterest(e);
              setModalOption("Specific Edge");
            }}
            nodeThreeObject={({ canvas }) => {
              const imageTexture = new CanvasTexture(canvas);
              // imageTexture.needsUpdate = true;
              const material = new SpriteMaterial({
                map: imageTexture,
                transparent: false,
              });
              const sprite = new Sprite(material);
              sprite.scale.set(16, 16);
              return sprite;
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default GraphPage;
