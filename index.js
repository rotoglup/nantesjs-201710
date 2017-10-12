import React from "react";
import { render } from "react-dom";

import Presentation from "./presentation";

require('./index.css');

render(<Presentation/>, document.getElementById("spectacle-root"));
