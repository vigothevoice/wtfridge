const initialState = {
  selectedCategory: "",
  categories: [
    {
      id: "all",
      name: "All"
    },
    {
      id: 1,
      name: "Meat"
    },
    {
      id: 2,
      name: "Fish"
    },
    {
      id: 3,
      name: "Milky"
    },
    {
      id: 4,
      name: "Veggies"
    },
    {
      id: 5,
      name: "Fruit"
    },
    {
      id: 6,
      name: "Freezer"
    }
  ],

  items: [
    // {
    //   key: 2,
    //   name: "test",
    //   percentage: 90,
    //   infridge: true,
    //   saved: true,
    //   category: 2
    // },
    // {
    //   key: 3,
    //   name: "test 2",
    //   percentage: 90,
    //   infridge: true,
    //   saved: false,
    //   category: 1
    // }
  ]
};

const reducer = (state = initialState, action) => {
  
  switch (action.type) {
    case "ADD_TOLIST":
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case "ADD_TOLIST_ERROR":
      console.log('error!', action.err)
      return {
        ...state
      }
    case "EDIT_ITEM":
      return {
        ...state,
        items: [
          ...state.items.map(item =>
            item.key === action.id
              ? {
                  ...item,
                  [action.name]: action.status
                }
              : item
          )
        ]
      };
    case "DELETE_ITEM_FRIDGE":
      const selectedItem = state.items.find(
        item => item.key === action.payload
      );

      if (selectedItem) {
        //  selectedItem.infridge = !selectedItem.saved;
        // return {
        //   ...state,
        //   items: [
        //     ...(state.items.map(item => item.key == action.payload ?
        //     {
        //       ...item,
        //       infridge: false
        //     } : item ))
        //   ]
        // }
        console.log(selectedItem)
        return {
          ...state,
          items: [
            ...state.items.filter(item => item.key !== action.payload),
            {
              ...selectedItem,
              infridge: false
            }
          ]
        };
      } else {
        const items = state.items.filter(item => item.key === action.payload);
        return {
          ...state,
          items
        };
      }

    case "DELETE_ITEM":
      return {
        ...state,
        items: [...state.items.filter(item => item.key !== action.payload)]
      };

    case "FILTER_CATEGORY":
      //console.log(myObj)
      // const filterByCategory = state.categories.find( item => item.id === action.categoryid )
      return {
        ...state,
        selectedCategory: action.categoryid
      };

    default: {
      return {
        ...state
      };
    }
  }
};

export default reducer;
