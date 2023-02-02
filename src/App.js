import { Route, Routes } from "react-router-dom"
import { Home, Cart, Layout } from "./pages"

function App() {
   return (
      <div className="wrapper">
         <Routes>
            <Route path="/" element={<Layout />}>
               <Route index element={<Home />} />
               <Route path="cart" element={<Cart />} />
            </Route>
         </Routes>
      </div>
   )
}

export default App;
