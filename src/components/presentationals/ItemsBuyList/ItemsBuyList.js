import React from "react";
import { useSelector } from "react-redux";
import ItemBuy from "../../containers/ItemBuy/ItemBuy";
import { useFirebase, useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import ServiceEmpty from '../ServiceEmpty/ServiceEmpty';
import ServiceLoading from '../ServiceLoading/ServiceLoading';
import Typography from "@material-ui/core/Typography";

const ItemBuyList = () => {
  // const firebase = useFirebase();
  useFirebaseConnect(['items']);
  const inDbIngredients = useSelector(state => state.firebase.ordered.items);  

  if (!isLoaded(inDbIngredients)) return <ServiceLoading></ServiceLoading>;
  if (isEmpty(inDbIngredients)) return <ServiceEmpty></ServiceEmpty>;

  return (
    <>
      <Typography variant="h1" color="textSecondary">
          Item to buy
        </Typography>
      {inDbIngredients.filter(mapped => {
        return ( mapped.value.saved === true)}).map(mapped => {
          return (
            <ItemBuy 
              key={mapped.value.key}
              id={mapped.key} 
              name={mapped.value.name} 
              fridge={mapped.value.infridge} 
              saved={mapped.value.saved}
              category={mapped.category}>
            </ItemBuy> ) })}
    </>
  );
};

export default ItemBuyList;
