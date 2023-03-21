import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getLocalStorage } from './../../utils/getLocalStorage'
import { getTotalCount } from '../../utils/getTotalCount'
import { getTotalPrice } from '../../utils/getTotalPrice'

export type Item = {
   id: string,
   name: string,
   imageUrl: string,
   price: number,
   type: string,
   size: number,
   count: number
}

interface CartSliseState {
   totalPrice: number,
   totalCount: number,
   items: Item[]
}

const { totalPrice, totalCount, items } = getLocalStorage()

const initialState: CartSliseState = {
   totalPrice,
   totalCount,
   items,
}

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addItem: (state, action: PayloadAction<Item>) => {
         const findItem = state.items.find(item => item.id === action.payload.id)

         if (findItem) {
            findItem.count++
         } else {
            state.items.push({
               ...action.payload,
               count: 1
            })
         }

         state.totalCount = getTotalCount(state.items)
         state.totalPrice = getTotalPrice(state.items)
      },
      removeItem: (state, action: PayloadAction<string>) => {
         state.items = state.items.filter(el => el.id !== action.payload)
         state.totalCount = getTotalCount(state.items)
         state.totalPrice = getTotalPrice(state.items)
      },
      onPlus: (state, action: PayloadAction<string>) => {
         const findItem = state.items.find(item => item.id === action.payload)

         if (findItem) {
            findItem.count++
         }

         state.totalCount = getTotalCount(state.items)
         state.totalPrice = getTotalPrice(state.items)
      },
      onMinus: (state, action) => {
         const findItem = state.items.find(item => item.id === action.payload)

         if (findItem && findItem.count > 1) {
            findItem.count--
         }

         state.totalCount = getTotalCount(state.items)
         state.totalPrice = getTotalPrice(state.items)
      },
      clearItems: (state) => {
         state.items = []
         state.totalPrice = 0
         state.totalCount = 0
      },
   }
})

export const { addItem, removeItem, clearItems, onPlus, onMinus } = cartSlice.actions

export default cartSlice.reducer