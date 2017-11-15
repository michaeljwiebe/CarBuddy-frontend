import React from "react";
import ReactDOM from "react-dom";
import AppWrapper from "./components/AppWrapper";
import registerServiceWorker from "./registerServiceWorker";

import "./css/index.css";

ReactDOM.render(<AppWrapper />, document.getElementById("root"));
registerServiceWorker();
