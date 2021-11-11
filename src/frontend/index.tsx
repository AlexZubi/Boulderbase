import React from "react";
import ReactDom from "react-dom"

import Main from "./views/Main/Main"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

library.add(faCheckSquare, faCoffee)

ReactDom.render(<Main />, document.getElementById("app"))