import React, { useState } from "react";
import { Link } from "react-router-dom";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Fab from "@material-ui/core/Fab";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import { ReactComponent as IconFridge } from '../../../assets/icons/icons-fridge-squared.svg';
import { ReactComponent as IconBuy } from '../../../assets/icons/icons-buy-squared.svg';
import { ReactComponent as IconAdd } from '../../../assets/icons/icons-add.svg';
import AddNewItem from "../../containers/AddNewItem/AddNewItem";

const Header = () => {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <BottomNavigation showLabels className="menu" elevation={24} variant="outlined">
        <BottomNavigationAction
          component={Link}
          label="Fridge"
          to="/"
          icon={<IconFridge/>}
        ></BottomNavigationAction>
        <BottomNavigationAction
          component={Link}
          label="To buy"
          to="/tobuy"
          icon={<IconBuy/>}
        ></BottomNavigationAction>
      </BottomNavigation>
      <Fab
        component={Link}
        color="primary"
        aria-label="add"
        label="New Item"
        className="addButton"
        onClick={handleClickOpen}
      >
        <IconAdd/>
      </Fab>
      <Dialog fullScreen open={open}>
        <AddNewItem  onClose={handleClose}></AddNewItem>
      </Dialog>

    </>
  );
};

export default Header;
