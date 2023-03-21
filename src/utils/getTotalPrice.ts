import { Item } from "../redux/slices/cartSlice";

export const getTotalPrice = (arr: Item[]) => arr.reduce((sum, item) => item.price * item.count + sum, 0)