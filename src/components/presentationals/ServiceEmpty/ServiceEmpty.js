import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from "react-router-dom";
import { ReactComponent as IconEmpty } from '../../../assets/icons/icons-empty.svg';

const ServiceEmpty = () => {
    return (
    <div className="service_wrapper">
    <IconEmpty id="icon-empty"></IconEmpty>
    <h3>Oh no, there's no food in here!</h3>
    <Button
        component={Link}
        color="primary"
        aria-label="add"
        label="New Item"
        to="/newitem"
      >
        {" "}
        add item
      </Button>
  </div>
    )
};

export default ServiceEmpty; 