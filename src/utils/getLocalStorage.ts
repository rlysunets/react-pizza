import { getTotalCount } from "./getTotalCount"
import { getTotalPrice } from "./getTotalPrice"

export const getLocalStorage = () => {
   const data = localStorage.getItem("cart")
   const items = data ? JSON.parse(data) : []
   const totalPrice = getTotalPrice(items)
   const totalCount = getTotalCount(items)

   return {
      totalPrice,
      totalCount,
      items
   }
}