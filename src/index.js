import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import useAbortableFetch from "use-abortable-fetch";

const URI = "http://127.0.0.1:5000/";


async function getData() {
  return await fetch(URI)
    .then(res => res.json())
    .catch(err => console.log(err));
}

getData()
  .then(
    tasks => {
      ReactDOM.render(<App tasks={tasks} />, document.getElementById("root"));
    },
    e => {
      ReactDOM.render(<h1> HATA {e} </h1>, document.getElementById("root"))
    }
  );
