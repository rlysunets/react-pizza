import axios from "axios"

export const setLoaded = (val) => ({
   type: "SET_LOADED",
   payload: val
})

//! fetchPizzas => асинхронний action => виконує запит => отримує відповідь => записує в redux 
export const fetchPizzas = (category, sortBy) => (dispatch) => {
   dispatch(setLoaded(false))
   axios
      .get(`/pizzas?${category !== null ? `category=${category}` : ''}&_sort=${sortBy.type}&_order=${sortBy.order}`)
      //! записуем масив піц в стейт 
      //! 1) масив піц передаем в екшин setPizzas
      //! 2) екшин setPizzas передаем в dispatch
      .then(({ data }) => dispatch(setPizzas(data)))
}

//!  setPizzas - метод для збереження піц
export const setPizzas = (items) => ({
   type: "SET_PIZZAS",
   payload: items
})

