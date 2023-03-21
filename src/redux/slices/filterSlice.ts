import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Sort = {
   ukr: string,
   en: "rating" | "price" | "name"
}

interface FilterSliceState {
   searchValue: string,
   categoryId: number,
   currentPage: number,
   sort: Sort
}

const initialState: FilterSliceState = {
   searchValue: "",
   categoryId: 0,
   currentPage: 1,
   sort: { ukr: "популярності", en: "rating" }
}

const filterSlice = createSlice({
   name: 'filter',
   initialState,
   reducers: {
      setSearchValue: (state, action: PayloadAction<string>) => {
         state.searchValue = action.payload
      },
      setCategoryId: (state, action: PayloadAction<number>) => {
         state.categoryId = action.payload
         state.searchValue = ""
      },
      setSortObj: (state, action: PayloadAction<Sort>) => {
         state.sort = action.payload
      },
      setCurrentPage: (state, action: PayloadAction<number>) => {
         state.currentPage = action.payload
      },
      setFilters: (state, action) => {
         state.categoryId = +action.payload.categoryId
         state.sort = action.payload.sort
      }
   },
})

// filterSlice.actions === filterSlice.reducers 
export const { setSearchValue, setCategoryId, setSortObj, setCurrentPage, setFilters } = filterSlice.actions

export default filterSlice.reducer