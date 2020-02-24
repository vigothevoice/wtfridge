import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase, useFirebaseConnect } from "react-redux-firebase";
import { editItem } from "../../../actions/actions";
import FormControl from "@material-ui/core/FormControl";
import Slider from "@material-ui/core/Slider";

const Percentage = props => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const [ItemPercentage, setItemPercentage] = useState(props.percentage);

  const isMountedRef = useRef(false);

  // componenDidUpdate-like hook that runs when var percentage changes
  useEffect(() => {
    if (isMountedRef.current) {
      firebase.update(`items/${props.id}`, { percentage: ItemPercentage });
      dispatch(editItem(props.id, "percentage", ItemPercentage));
    }
    isMountedRef.current = true;
  }, [ItemPercentage]);

  return (
    <>
        <Slider
          key={props.id}
          color="secondary"
          defaultValue={props.percentage}
          step={10}
          min={10}
          max={100}
          onChange={(e, value) => {
            setItemPercentage(value);
          }}
          valueLabelDisplay="on"
          className="percentage_slider"
        ></Slider>
    </>
  );
};

export default Percentage;
