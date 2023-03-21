import { FC } from 'react'

import styles from "./Order.module.scss"

type Props = {
   onCloseOrder: () => void,
   totalPrice: number
}

const Order: FC<Props> = ({ onCloseOrder, totalPrice }) => {
   return (
      <div className={styles.order}>
         <div className={styles.content}>
            <div className={styles.message}>Ваше замовлення готується, очікуйте на дзвінок кур'єра...</div>
            <div className={styles.message}>До оплати {totalPrice} грн.</div>
            <button className="button" onClick={onCloseOrder}>Закрити</button>
         </div>
      </div>
   )
}

export default Order