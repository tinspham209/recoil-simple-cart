import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
	<React.Fragment>
		<RecoilRoot>
			<App />
		</RecoilRoot>
	</React.Fragment>,
	document.getElementById("root")
);

serviceWorker.unregister();
