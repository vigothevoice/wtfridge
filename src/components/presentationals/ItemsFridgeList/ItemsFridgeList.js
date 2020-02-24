import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ItemFridge from "../../containers/ItemFridge/ItemFridge";
import ItemsCategoryList from '../../presentationals/ItemsCategoryList/ItemsCategoryList';
import { useFirebase, useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import ServiceEmpty from '../ServiceEmpty/ServiceEmpty';
import ServiceLoading from '../ServiceLoading/ServiceLoading';
import Typography from "@material-ui/core/Typography";

import Tabs from '@material-ui/core/Tabs';
import { Button } from '@material-ui/core';
import { ReactComponent as IconEmpty } from '../../../assets/icons/icons-empty.svg';

const ItemsFridgeList = () => {

  useFirebaseConnect(['items']);
  const selectedCategory = useSelector(state => state.itemReducer.selectedCategory);
  const inDbIngredients = useSelector(state => state.firebase.ordered.items);

  if (!isLoaded(inDbIngredients)) return <ServiceLoading></ServiceLoading>;
  if (isEmpty(inDbIngredients)) return <ServiceEmpty></ServiceEmpty>;

 const filteredElements = inDbIngredients.filter( mapped => {
   return (mapped.value.category === selectedCategory && mapped.value.infridge === true)
  }).map( mapped => {
    return (    
     <ItemFridge 
      id={mapped.key} 
      name={mapped.value.name} 
      percentage={mapped.value.percentage}
      saved={mapped.value.saved}
      category={mapped.value.category}>
    </ItemFridge>)
  });


  const notFilteredElements = inDbIngredients.map( mapped => {
    if(mapped.value.infridge === true) {
      console.log('not filtered!')
     return (        
      <ItemFridge 
       id={mapped.key} 
       name={mapped.value.name} 
       percentage={mapped.value.percentage}
       saved={mapped.value.saved}
       category={mapped.value.category}>
     </ItemFridge>)
    }
   });
   
   const inFridgeIngredients = inDbIngredients.filter(mapped => { 
     return (mapped.value.infridge === true)
   })

   const itemToDisplay = () => {
     if (selectedCategory === "all" && inFridgeIngredients.length > 0) {
       return notFilteredElements
     } if (selectedCategory !== "all") {
       return filteredElements
   }}

  return (
    <>


      <Tabs component={ItemsCategoryList} orientation="vertical" centered fullWidth={true}></Tabs>
      <Typography variant="h1" color="textSecondary">
          In your fridge
        </Typography>
      {itemToDisplay()}
    
    </>
  );
};

export default ItemsFridgeList;
