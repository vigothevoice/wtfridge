import React from "react";
import { Switch, Route } from "react-router-dom";

import AddNewItem from "./components/containers/AddNewItem/AddNewItem";
import ItemsBuyList from "./components/presentationals/ItemsBuyList/ItemsBuyList";
import ItemsFridgeList from "./components/presentationals/ItemsFridgeList/ItemsFridgeList";
import Header from "./components/presentationals/Header/Header";
import Menu from "./components/presentationals/Menu/Menu";

import "./assets/css/style.scss";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../src/theme/muiTheme";
import { positions } from "@material-ui/system";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="md">
          <Header></Header>
          <Switch>
            <Route path="/newitem" exact component={AddNewItem} />
            <Route path="/tobuy" exact component={ItemsBuyList} />
            <Route path="/" exact component={ItemsFridgeList} />
          </Switch>
        </Container>
        <Menu></Menu>
      </ThemeProvider>
    </>
  );
};

export default App;
