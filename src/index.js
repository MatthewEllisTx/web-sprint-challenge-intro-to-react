// This is for the fake API. Do not delete!
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { worker } from "./mocks/browser";
import axios from "axios";
//import { response } from "msw/lib/types";

worker.start();

ReactDOM.render(<App />, document.getElementById("root"));

fetch('http://swapi.dev/api/people/?page=1')
    .then( response => response.json())
    .then( response => console.log(response.results))

// fetch('http://swapi.dev/api/people/?page=2')
//     .then( response => console.log(response.json()))

// fetch('http://swapi.dev/api/planets/1/')
// .then( response => console.log(response.json()))

axios.get('http://swapi.dev/api/people/?page=1')
    .then(response => console.log(response))