const initialState = {
   items: {},
   totalPrice: 0,
   totalCount: 0
}

const getTotalPrice = arr => arr.reduce((sum, obj) => obj.price + sum, 0)
const totalCount = (obj) => {
   return Object.keys(obj).reduce((sum, key) => obj[key].items.length + sum, 0)
}
const totalPrice = (obj) => {
   return Object.keys(obj).reduce((sum, key) => obj[key].totalPrice + sum, 0)
}

const cart = (state = initialState, action) => {
   switch (action.type) {
      case "ADD_PIZZA_CART": {
         const currentPizzaItems = !state.items[action.payload.id]
            ? [action.payload]
            : [...state.items[action.payload.id].items, action.payload]

         const newItems = {
            ...state.items,
            [action.payload.id]: {
               items: currentPizzaItems,
               totalPrice: getTotalPrice(currentPizzaItems)
            }
         }

         return {
            ...state,
            items: newItems,
            totalPrice: totalPrice(newItems),
            totalCount: totalCount(newItems)
         }
      }

      case "PLUS_CART_ITEM": {
         const currentPizzaItems = [
            ...state.items[action.payload].items,
            state.items[action.payload].items[0]
         ]

         const newItems = {
            ...state.items,
            [action.payload]: {
               items: currentPizzaItems,
               totalPrice: getTotalPrice(currentPizzaItems)
            }
         }

         return {
            ...state,
            items: newItems,
            totalPrice: totalPrice(newItems),
            totalCount: totalCount(newItems)
         }
      }

      case "MINUS_CART_ITEM": {
         const oldPizzaItems = state.items[action.payload].items
         const currentItems =
            oldPizzaItems.length > 1 ? state.items[action.payload].items.slice(1) : oldPizzaItems

         const newItems = {
            ...state.items,
            [action.payload]: {
               items: currentItems,
               totalPrice: getTotalPrice(currentItems)
            }
         }

         return {
            ...state,
            items: newItems,
            totalPrice: totalPrice(newItems),
            totalCount: totalCount(newItems)
         }
      }

      case "REMOVE_CART_ITEM": {
         const newItems = {
            ...state.items
         }

         const currentTotalPrice = newItems[action.payload].totalPrice
         const currentTotalCount = newItems[action.payload].items.length
         delete newItems[action.payload]

         return {
            ...state,
            items: newItems,
            totalPrice: state.totalPrice - currentTotalPrice,
            totalCount: state.totalCount - currentTotalCount,
         }
      }

      case "CLEAR_CART": {
         return {
            ...state,
            totalPrice: 0,
            totalCount: 0,
            items: {}
         }
      }
      default:
         return state
   }
}

export default cart