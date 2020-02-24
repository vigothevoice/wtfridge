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
