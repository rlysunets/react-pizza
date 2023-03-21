import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { addItem } from '../../redux/slices/cartSlice'
import { RootState } from '../../redux/store'

const availbleTypes = ["тонке", "традиційне"]

type Props = {
   id: string,
   name: string,
   imageUrl: string,
   price: number,
   types: number[],
   sizes: number[],
}

const PizzaBlock: FC<Props> = ({ id, name, imageUrl, price, types, sizes }) => {
   const dispatch = useDispatch()
   const obj = useSelector((state: RootState) => state.cart.items.find((el) => el.id === id))

   const count = obj ? obj.count : 0
   const [activeType, setActiveType] = useState(0)
   const [activeSize, setActiveSize] = useState(0)

   const onSelectType = (index: number) => {
      setActiveType(index)
   }

   const onSelectSize = (index: number) => {
      setActiveSize(index)
   }

   const AddPizzaToCart = () => {
      const obj = {
         id,
         name,
         imageUrl,
         price,
         type: availbleTypes[activeType],
         size: sizes[activeSize],
         count: 0
      }

      dispatch(addItem(obj))
   }

   return (
      <div className="pizza-block">
         <Link to={`/pizza/${id}`}>
            <div className="pizza-block__icon">
               <img src="https://la.ua/wp-content/uploads/2021/06/menu-icon-5.svg" title="Натисни, щоб дізнатися більше..." alt="info" />
            </div>
         </Link>
         <img
            className="pizza-block__image"
            src={imageUrl}
            alt={name}
         />
         <h4 className="pizza-block__title">{name}</h4>
         <div className="pizza-block__selector">
            <ul>
               {types &&
                  types.map((type, index) => (
                     <li
                        key={type}
                        onClick={() => onSelectType(index)}
                        className={activeType === index ? "active" : ""}
                     >
                        {availbleTypes[type]}
                     </li>)
                  )}
            </ul>
            <ul>
               {sizes &&
                  sizes.map((size, index) => (
                     <li
                        key={size}
                        onClick={() => onSelectSize(index)}
                        className={activeSize === index ? "active" : ""}
                     >
                        {size} см.
                     </li>)
                  )}
            </ul>
         </div>
         <div className="pizza-block__bottom">
            <div className="pizza-block__price">від {price} грн</div>
            <button
               className="button button--outline button--add"
               onClick={AddPizzaToCart}
            >
               <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                     fill="white"
                  />
               </svg>
               <span>Додати</span>
               {count > 0 &&
                  <i>{count}</i>
               }
            </button>
         </div>
      </div>
   )
}

export default PizzaBlock