import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editItem, deleteItemFridge, deleteItem } from "../../../actions/actions";
import Percentage from "../Percentage/Percentage";
import Modal from "../../presentationals/Modal/Modal";
import { useFirebase } from "react-redux-firebase";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";

import { ReactComponent as IconClose } from '../../../assets/icons/icons-close.svg';

const ItemFridge = props => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const inFridgeIngredients = useSelector(
    state => state.firebase.ordered.items
  );
  const categories = useSelector(state => state.itemReducer.categories);
  const [modal, setModal] = useState(false);
  const statusSaved = props.saved

  const handleClick = (e, name, key) => {
    if (name === "deleteItemFridge" && statusSaved === true ) {
      dispatch(deleteItemFridge(key));
      firebase.update(`items/${key}`, { infridge: false });
    } if (name === "deleteItemFridge" && statusSaved === false ) {
      dispatch(deleteItem(key));
      firebase.ref(`/items/${key}`).remove()

  }};

  const handleClickOpen = () => {
    setModal(true);
  };

  const handleClickClose = () => {
    setModal(false);
  };

  useEffect(() => {
    const itemCategory = categories.find(item => item.id === [categories.id]);
  }, [inFridgeIngredients]);

  return (
    <Card key={props.id} className="item_card" variant="outlined">
      <CardHeader
        title={props.name}
        action={
          <Button  size="small" onClick={handleClickOpen}><IconClose></IconClose>Empty
          </Button>
        }
      ></CardHeader>
      <CardContent>
        <div
          className={`item_card__icon item_card__icon-${props.category}`}
        ></div>
        <Percentage id={props.id} percentage={props.percentage} />
        <Dialog open={modal} key={props.id}>
          <Modal
            ItemName={props.name}
            onClose={handleClickClose}
            onClick={e => handleClick(e, "deleteItemFridge", props.id)}
          ></Modal>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ItemFridge;
