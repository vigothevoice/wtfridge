import React from "react";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Modal = props => {

  return (
    <>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent key={props.key}>
        <DialogContentText>
          Are you sure you want to delete {props.ItemName} from here?
        </DialogContentText>
        <DialogActions>
          <Button variant="contained" color="secondary" name={props.name} onClick={props.onClick}>
            Delete
          </Button>
          <Button name="close" onClick={props.onClose}>No, come back!</Button>
        </DialogActions>
      </DialogContent>
    </>
  );
};

export default Modal;
