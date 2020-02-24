import React, { useReducer, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToList } from "../../../actions/actions";
import {
  useFirebase,
  useFirebaseConnect,
  isLoaded,
  isEmpty
} from "react-redux-firebase";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Checkbox from "@material-ui/core/Checkbox";
import { ReactComponent as IconClose } from "../../../assets/icons/icons-close.svg";
import { FormControlLabel } from "@material-ui/core";
import { spacing } from "@material-ui/system";

const AddNewItem = props => {
  useFirebaseConnect(["items"]);
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const createId = new Date().getTime();
  //const ingredients = useSelector(state => state.items);
  const categories = useSelector(state => state.itemReducer.categories);

  const [item, setItem] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      key: createId,
      name: "",
      percentage: 100,
      infridge: false,
      saved: true,
      category: ""
    }
  );

  const [error, setError] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      nameValid: false,
      categoryValid: false,
      formValid: false
    }
  );

  let isMountedRef = useRef(true);

  useEffect(() => {
    if (isMountedRef.current) {
      setError({
        nameValid: false,
        categoryValid: false,
        formValid: error.nameValid && error.categoryValid
      });
      isMountedRef.current = false;
    }
  }, [error]);

  const checkErrors = () => {
    if (item.name.length > 0) {
      setError({
        nameValid: true
      });
    }
    if (item.category) {
      setError({
        categoryValid: true
      });
    }
    if (error.nameValid && error.categoryValid) {
      setError({
        formValid: true
      });
      console.log(item.name.length);
    }
  };

  // const [errors, setErrors] = useReducer(
  //   (state, newState) => ({ ...state, ...newState }),
  //   {
  //     formErrors: { name: "", category: "" },
  //     nameValid: false,
  //     categoryValid: false,
  //     formValid: false
  //   }
  // );

  // useEffect(() => {
  //   // console.log(item)
  //   if (isMountedRef.current) {
  //     setErrors({
  //       formValid: errors.nameValid && errors.categoryValid
  //     });
  //     isMountedRef.current = false;
  //     //   console.log(isMountedRef.current);
  //   }
  // }, [errors]);

  // const validateField = (fieldName, value) => {
  //   let fieldValidationErrors = errors.formErrors;
  //   let nameValid = errors.nameValid;
  //   let categoryValid = errors.categoryValid;

  //   switch (fieldName) {
  //     case "name":
  //       nameValid = value.length > 1;
  //       fieldValidationErrors.name = nameValid ? "" : " is invalid";
  //       break;
  //     case "category":
  //       categoryValid = value.length > 0;
  //       fieldValidationErrors.category = categoryValid
  //         ? ""
  //         : " cannot be empty";
  //       break;
  //     default:
  //       break;
  //   }

  //   setErrors({
  //     formErrors: fieldValidationErrors,
  //     nameValid: nameValid,
  //     categoryValid: categoryValid,
  //     formValid: errors.nameValid && errors.categoryValid
  //   });
  // };

  // // NON FUNZIONA QUESTO

  // const mapErrors = () => {
  //   errors.formErrors.map((fieldName, i) => {
  //     if (errors.formErrors[fieldName].length > 0) {
  //       return (
  //         <p key={i}>
  //           {fieldName} {errors.formErrors[fieldName]}
  //         </p>
  //       );
  //     } else {
  //       return "";
  //     }
  //   });
  // };

  // HOW DA HELL COULD I AVOID THE CHANGE AFTER ANOTHER CLICK???

  const handleChange = e => {
    const name = e.target.name;
    const newValue = e.target.value;
    isMountedRef.current = true;
    setItem({ [name]: newValue });
    checkErrors();
  };

  const handleCheck = e => {
    const name = e.target.name;
    const newValue = e.target.checked;
    setItem({ [name]: newValue });
  };

  const handleSubmit = e => {
    e.preventDefault();
    firebase.push("items", { ...item });
    dispatch(addToList(item));
    setItem({
      key: createId,
      name: "",
      percentage: 100,
      infridge: false,
      saved: true,
      category: ""
    });
  };

  return (
    <FormControl className="addNewItem_wrapper">
      <Button
        className="icon-close"
        edge="start"
        color="inherit"
        onClick={props.onClose}
        aria-label="close"
        component={IconClose}
      ></Button>
      <div className="addNewItem_innerwrapper">
        <form onSubmit={handleSubmit}>
          <Typography variant="h1" color="textSecondary">
            Add a new Item
          </Typography>
          {/* <p>{errors.formErrors.name}</p> */}
          <FormControl variant="outlined" required={true}>
            <InputLabel htmlFor="component-outlined">Insert Name</InputLabel>
            <OutlinedInput
              name="name"
              value={item.name}
              onChange={handleChange}
              label="Insert name"
              helperText="Cannot be empty."
            />
          </FormControl>

          <FormControl>
            <label>
              <Checkbox
                name="infridge"
                type="checkbox"
                checked={item.infridge}
                onChange={handleCheck}
              />
              Is it already in the fridge?
            </label>
          </FormControl>

          {/* <p>{errors.formErrors.category}</p> */}
          <FormControl>
            <label className="chooseCategory">Choose category</label>
            <Select
              onChange={handleChange}
              name="category"
              id="category"
              value={item.category}
              variant="outlined"
              helperText="Cannot be empty."
            >
              {categories
                .map(category => (
                  <MenuItem
                    key={category.id}
                    name={category.name}
                    value={category.id}
                  >
                    {category.name}
                  </MenuItem>
                ))
                .slice(1)}
            </Select>
          </FormControl>
          <br />
          <Button
            disabled={!error.formValid}
            className="button-submit"
            type="submit"
            variant="contained"
            color="secondary"
            onClick={props.onClose}
          >
            Add the item
          </Button>
        </form>
      </div>
    </FormControl>
  );
};

export default AddNewItem;
