import  React, { useState }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { editItem, deleteItem } from "../../../actions/actions";
import Modal from "../../presentationals/Modal/Modal";
import { useFirebase, useFirebaseConnect } from 'react-redux-firebase';

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const ItemBuy = props => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  useFirebaseConnect(['items']);
  const inFridgeIngredients = useSelector(state => state.firebase.ordered.items);
  const [modal, setModal] = useState(false);
  const [check, setCheck] = useState({
    checkedA: props.saved
  });
  const statusFridge = props.fridge

  const conditionalButton = () => {
    if (props.fridge === true ) {
      return <p>The item is already in the fridge!</p>
    } else {
      return <Button variant="contained"  color="secondary" onClick={e => handleClick(e, "addToFridge", props.id)}>
      Add to Fridge
    </Button>
    }
  }
  
  const handleClickOpen = () => {
    setModal(true);
  };

  const handleClickClose = () => {
    setModal(false);
  };

  const handleClick = (e, name, key) => {
    if (name === "deleteItem" && statusFridge === true ) {
      firebase.update(`items/${key}`, {"saved": false})
      dispatch(editItem(key, "saved", false));
    }
    if (name === "deleteItem" && statusFridge === false ) {
      dispatch(deleteItem(key));
      firebase.ref(`/items/${key}`).remove()
    }
    if (name === "addToFridge") {
      firebase.update(`items/${key}`, {"infridge": true})
      dispatch(editItem(key, "infridge", true));
    } 
  };

  // const handleChange = (e,key) => {
  //   setCheck({checkedA: e.target.checked});
  //   if (e.target.name === "saveItem") {
  //     if (e.target.checked === true ) {
  //       dispatch(editItem(key, "saved", true));
  //       firebase.update(`items/${key}`, {"saved": true})
  //     } else {
  //       dispatch(editItem(key, "saved", false));
  //       firebase.update(`items/${key}`, {"saved": false})
  //   }
  // }
  // }


  return (
    <Card key={props.id} className="item_card" variant="outlined">
    <CardHeader
      title={props.name}
      action={
        <Button  size="small" onClick={handleClickOpen}>Delete
        </Button>
      }
    ></CardHeader>
    <CardContent>
    {/* <FormControlLabel
        control={
          <Switch name="saveItem" checked={check.checkedA} onChange={e => handleChange(e, props.id)} value="checkedA" />
        }
        label="Save item for later"
      />       */}
        {conditionalButton()}

      <Dialog open={modal} key={props.id}>
        <Modal
          ItemName={props.name}
          onClose={handleClickClose}
          onClick={e => handleClick(e, "deleteItem", props.id)}
        ></Modal>
      </Dialog>
    </CardContent>
  </Card>
  //   <div key={props.id}>
  //     <p>{props.name}</p>
  //     <label>
  //       <input name="saveItem" checked={props.saved} onChange={e => handleChange(e, props.id)} type="checkbox" onClick={e => handleClick(e, props.id)} />
  //       Save for later
  //     </label>
  //     {/* <button onClick={e => handleClick(e, props.id)} name="deleteItem">
  //       Delete
  //     </button> */}
  //     {conditionalButton()}

  //     <button onClick={handleClickOpen}>Delete</button>
  //     <Dialog
  //       open={modal}
  //       key={props.id}
  //     >
  //       <Modal
  //         ItemName={props.name}
  //         onClose={handleClickClose}
  //         click={e => handleClick(e, props.id)}
  //         name="deleteItem"
  //       ></Modal>

  //     </Dialog>

  //   </div>
  // );
  )};

export default ItemBuy;

