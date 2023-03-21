import { FC } from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

import { Alert, Spinner } from '../components'

interface IItem {
   name: string,
   imageUrl: string,
   description: string,
   components: {
      proteins: number,
      fats: number,
      carbohydrates: number,
      caloric: number,
   },
   weight: number,
   sizes: number[],
   price: number,
}

const PizzaItem: FC = () => {
   const [item, setItem] = useState<IItem>()
   const [error, setError] = useState<string>("")

   const { id } = useParams()

   useEffect(() => {
      (async function fetchPizza() {
         try {
            return await axios.get(`https://63e2443e3e12b193763bd9c2.mockapi.io/items/${id}`).then(res => setItem(res.data))
         } catch (error: any) {
            setError(error.message)
         }
      })()
   }, [id])

   if (error) {
      return <Alert error={error} />
   }

   if (!item) {
      return <Spinner />
   }

   return (
      <div className="content">
         <div className="container">
            <div className="pizza-item">
               <div className="pizza-item__image">
                  <img
                     src={item.imageUrl}
                     alt={item.name}
                  />
               </div>
               <div className="pizza-item__info">
                  <h2>{item.name}</h2>
                  <div className="description">
                     <i>{item.description}</i>
                  </div>
                  <div className="components">
                     <div className="component">
                        <div>Білки</div>
                        <div>{item.components.proteins}</div>
                     </div>
                     <div className="component">
                        <div>Жири</div>
                        <div>{item.components.fats}</div>
                     </div>
                     <div className="component">
                        <div>Вугливоди</div>
                        <div>{item.components.carbohydrates}</div>
                     </div>
                     <div className="component">
                        <div>Калорійність</div>
                        <div>{item.components.caloric}</div>
                     </div>
                  </div>
                  <div className="weight">Вага: {item.weight}г</div>
                  <div className="size">Доступні розміри: {
                     item.sizes.map((el, i, arr) => {
                        if (i !== arr.length - 1) {
                           return <span key={el}>{el}см, </span>
                        } else {
                           return <span key={el}>{el}см </span>
                        }
                     })
                  }
                  </div>
                  <div className="price">Ціна: <span>{item.price} грн</span></div>
               </div>
            </div>

            <div className="pizza-item__button">
               <Link to="/" className="button button--black">
                  <svg enableBackground="new 0 0 30 30" height="16px" id="Слой_1" version="1.1" viewBox="0 0 32 32" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M31.866,29.046c0.05-0.336,1.109-8.41-3.639-13.966  c-2.917-3.414-7.418-5.283-13.23-5.468l-0.031-5.613c0-0.386-0.223-0.737-0.571-0.903c-0.349-0.163-0.762-0.116-1.061,0.128  L0.367,13.866C0.135,14.056,0,14.34-0.001,14.64c-0.001,0.3,0.133,0.584,0.365,0.774l12.968,10.743  c0.298,0.247,0.715,0.298,1.061,0.132c0.351-0.165,0.573-0.518,0.573-0.904l0.031-5.739c14.009-0.01,15.005,8.966,15.039,9.337  c0.043,0.504,0.362,0.897,0.868,0.913c0.012,0.001,0.023,0.001,0.034,0.001C31.433,29.897,31.792,29.536,31.866,29.046z   M13.261,17.922c-0.188,0.188-0.294,0.442-0.294,0.708v4.638L2.578,14.646l10.389-8.542v4.493c0,0.553,0.447,1,1,1  c5.69,0,10.037,1.648,12.735,4.776c2.029,2.354,2.962,5.235,3.281,7.626c-2.184-2.984-6.008-6.363-16.015-6.369c0,0-0.001,0-0.002,0  C13.702,17.63,13.448,17.735,13.261,17.922z" fill="#fff" id="Arrow_Left_1_" /></svg>
                  <span>
                     Повернутися на головну
                  </span>
               </Link>
            </div>
         </div>
      </div>
   )
}

export default PizzaItem