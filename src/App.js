import React, { Fragment } from "react";
import styled from "styled-components";

import GlobalStyle from "../src/styles/global";
import Main from "./pages/Main/index";

const App = () => (
  <Fragment>
    <GlobalStyle />
    <Main />;
  </Fragment>
);

export default App;
