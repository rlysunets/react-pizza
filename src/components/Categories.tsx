import React, { FC } from "react"
import { useDispatch, useSelector } from 'react-redux'

import { setCategoryId } from "../redux/slices/filterSlice"
import { RootState } from "../redux/store"

export const categoryList = ["Вся", "М'ясна", "Сирна", "Гостра", "Закрита"]

const Categories: FC = React.memo(() => {
   const dispatch = useDispatch()
   const categoryId = useSelector((state: RootState) => state.filter.categoryId)

   return (
      <div className="categories">
         <ul>
            {categoryList.map((item, index) => (
               <li
                  key={item}
                  onClick={() => dispatch(setCategoryId(index))}
                  className={categoryId === index ? "active" : ""}
               >
                  {item}
               </li>)
            )}
         </ul>
      </div>
   )
})

export default Categories