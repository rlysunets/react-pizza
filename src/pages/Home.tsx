import { FC, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import qs from "qs"

import { Categories, SortPopup, PizzaBlock, LoadingBlock, Alert } from "../components"
import { popupList } from "../components/SortPopup"
import { categoryList } from "../components/Categories"
import { setFilters } from "../redux/slices/filterSlice"
import { fetchPizzas, Status } from "../redux/slices/pizzaSlice"
import { RootState, useAppDispatch } from "../redux/store"

// ! for Pagination
// import Pagination from "../components/pagination/Pagination"

const Home: FC = () => {
   // const isSearch = useRef(false)
   const isMounted = useRef(false)

   const navigate = useNavigate()

   const dispatch = useAppDispatch()
   const { searchValue, categoryId, sort } = useSelector((state: RootState) => state.filter)
   const { items, status, error } = useSelector((state: RootState) => state.pizza)

   const fetchData = async () => {
      const category = categoryId > 0 ? `category=${categoryId}` : ''
      const sortBy = sort.en
      const order = sort.en === "name" ? "asc" : "desc"
      const filter = searchValue

      dispatch(fetchPizzas({ category, sortBy, order, filter }))
   }

   // Якщо змінилися параметри і перший рендер був
   useEffect(() => {
      if (isMounted.current) {
         const queryString = qs.stringify({
            sort: sort.en,
            categoryId
         })

         navigate(`?${queryString}`)
      }
      isMounted.current = true
   }, [categoryId, sort])


   // Якщо був перший рендер, то перевіряєм URl-параметрт і зберігаєм в редакс
   useEffect(() => {
      if (window.location.search) {
         const params = qs.parse(window.location.search.substring(1))

         const sort = popupList.find(obj => obj.en === params.sort)

         dispatch(
            setFilters({
               ...params,
               sort
            }),
         )
         // isSearch.current = true
      }
   }, [])

   // Якщо був перший рендер то запрошуєм піци
   useEffect(() => {
      // if (!isSearch.current) {
      fetchData()
      // }

      // isSearch.current = false
      window.scrollTo(0, 0)
   }, [categoryId, sort, searchValue])

   if (error) {
      return <Alert error={error} />
   }

   if (searchValue.length && !items.length) {
      return (
         <div className="alert">
            <h3>😕</h3>
            <div>Такої піци не знайдено, спробуйте повторити пошук...</div>
         </div>
      )
   }

   return (
      <div className="content">
         <div className="container">
            <div className="content__top">
               <Categories />
               <SortPopup />
            </div>
            {items &&
               <>
                  <h2 className="content__title">{categoryList[categoryId]} піца</h2>
                  <div className="content__items">
                     {status === Status.LOADING ? (
                        Array(12).fill(0).map((_, index) => (<LoadingBlock key={index} />))
                     ) : (
                        items.map(item => (
                           <PizzaBlock
                              key={item.id}
                              {...item}
                           />
                        ))
                     )}
                  </div>
               </>
            }

            {/* <Pagination onChangePage={number => setPage(number)} />  // ! for Pagination*/}
         </div >
      </div >
   )
}

export default Home