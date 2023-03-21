import { Item } from "../redux/slices/cartSlice";

export const getTotalCount = (arr: Item[]) => arr.reduce((sum, item) => item.count + sum, 0)