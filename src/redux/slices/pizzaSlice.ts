import axios from "axios"
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

type PizzaItem = {
   id: string,
   imageUrl: string,
   name: string,
   description: string,
   components: object,
   weight: number,
   types: number[],
   sizes: number[],
   price: number,
   category: number,
   rating: number
}

export enum Status {
   LOADING = "loading",
   SUCCESS = "success"
}

interface PizzaSliceState {
   items: PizzaItem[],
   status: Status,
   error: string | undefined,
}

const initialState: PizzaSliceState = {
   items: [],
   status: Status.LOADING,
   error: ""
}

//! async action
export const fetchPizzas = createAsyncThunk(
   'pizza/fetchPizzaStatus',
   // скорочений запис => обєкт ключів - string і значень - string
   async (params: Record<string, string>) => {

      const { category, sortBy, order, filter } = params

      const { data } = await axios
         .get<PizzaItem[]>(`https://63e2443e3e12b193763bd9c2.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}&name=${filter}`)

      return data
   }
)

const pizzaSlice = createSlice({
   name: 'pizza',
   initialState,
   reducers: {},
   //! async action
   extraReducers: (builder) => {
      builder
         .addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING
         })
         .addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = Status.SUCCESS
         })
         .addCase(fetchPizzas.rejected, (state, action) => {
            if (!action.payload) {
               state.error = action.error.message
            }
         })
   }
})

export default pizzaSlice.reducer