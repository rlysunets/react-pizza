import { FC } from "react"
import { Route, Routes } from "react-router-dom"

import { Home, Cart, NotFound, PizzaItem } from "./pages"
import Layout from "./layout/Layout"

const App: FC = () => {
   return (
      <Routes>
         <Route path="/" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="pizza/:id" element={<PizzaItem />} />
            <Route path="*" element={<NotFound />} />
         </Route>
      </Routes>
   )
}

export default App
