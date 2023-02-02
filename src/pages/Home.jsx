import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Categories, SortPopup, PizzaBlock, LoadingBlock } from "../components"
import { setCategory, setSortBy } from "../redux/actions/filters"
import { addPizzaToCart } from "../redux/actions/cart"
import { fetchPizzas } from "../redux/actions/pizzas"

const categoryNames = ["М'ясна", "Сирна", "Гостра", "Закрита"]
const sortNames = [
   { name: "популярності", type: "popular", order: "desc" },
   { name: "ціні", type: "price", order: "desc" },
   { name: "назві", type: "name", order: "asc" }
]

const Home = () => {
   // створюєм dispatch який буде передавати екшини в стейт
   const dispatch = useDispatch()
   const { items, isLoaded } = useSelector(({ pizzas }) => pizzas)
   const { category, sortBy } = useSelector(({ filters }) => filters)
   const cartItems = useSelector(({ cart }) => cart.items)

   useEffect(() => {
      dispatch(fetchPizzas(category, sortBy))
   }, [dispatch, category, sortBy])

   const onSelectCategoty = useCallback(index => {
      dispatch(setCategory(index))
   }, [dispatch])

   const onSelectSortType = useCallback(type => {
      dispatch(setSortBy(type))
   }, [dispatch])

   const handleAddPizza = (obj) => {
      dispatch(addPizzaToCart(obj))
   }

   return (
      <div className="content">
         <div className="container">
            <div className="content__top">
               <Categories
                  onClickCategory={onSelectCategoty}
                  items={categoryNames}
                  activeCategory={category}
               />

               <SortPopup
                  onClickSortType={onSelectSortType}
                  activeSortType={sortBy.type}
                  items={sortNames}
               />
            </div>
            <h2 className="content__title">Вся піцца</h2>
            <div className="content__items">
               {isLoaded
                  ? items.map(pizza => (
                     <PizzaBlock
                        key={pizza.id}
                        onClickAddPizza={handleAddPizza}
                        addedCount={cartItems[pizza.id] && cartItems[pizza.id].items.length}
                        {...pizza}
                     />))
                  : Array(12).fill(0).map((_, index) => (<LoadingBlock key={index} />))
               }
            </div>
         </div>
      </div>
   )
}

export default Home