export const addToList = item => ({
  type: "ADD_TOLIST",
  payload: item
});

export const addToFridge = id => ({
  type: "ADD_TOFRIDGE",
  payload: id
});

export const editItem = (id, name, status) => ({
  type: "EDIT_ITEM",
  id,
  name,
  status
});

export const deleteItemFridge = id => ({
  type: "DELETE_ITEM_FRIDGE",
  payload: id
});

export const deleteItem = id => ({
  type: "DELETE_ITEM",
  payload: id
});

export const filterCategory = id => ({
  type: "FILTER_CATEGORY",
  categoryid: id
});
