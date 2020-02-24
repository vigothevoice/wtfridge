import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCategory } from "../../../actions/actions";
import { Tabs } from '@material-ui/core';
import { Tab } from '@material-ui/core';
import { Card } from "@material-ui/core";

const ItemsCategoryList = props => {
  const dispatch = useDispatch();
  const nameCategories = useSelector(state => state.itemReducer.categories);
  const [category, setCategory] = useState("all");

  const [categoryValue, setCategoryValue] = useState("all");

  const handleChange = (event, newValue) => {
    setCategoryValue(newValue);
  };

  useEffect(() => {
  dispatch(filterCategory(category));
  }, [category]);

  return (
    <Card variant="outlined" className="categoryTabs">
    <Tabs
    value={categoryValue}
    onChange={handleChange}
    variant="scrollable"
    scrollButtons="on"
    indicatorColor="primary"
    textColor="primary"
    aria-label="scrollable force tabs"
    >
      {nameCategories.map(item => {
        return (
          <Tab  key={item.id} value={item.id} onClick={() => {
            setCategory(item.id);
          }} label={item.name}>
            
          </Tab>
        );
      })}
    </Tabs>
    </Card>

  );
};

export default ItemsCategoryList;
