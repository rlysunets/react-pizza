import { FC } from 'react'

import styles from "./Modal.module.scss"

type Props = {
   onClickOk: () => void,
   onClickClose: () => void,
   message: string
}

const Modal: FC<Props> = ({ onClickOk, onClickClose, message }) => {
   return (
      <div className={styles.modal}>
         <div className={styles.content}>
            <div className={styles.close} onClick={onClickClose}>
               <svg height="40" viewBox="0 0 48 48" width="40" xmlns="http://www.w3.org/2000/svg"><path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" /><path d="M0 0h48v48h-48z" fill="none" /></svg>
            </div>
            <div className={styles.message}>{message}</div>
            <div className={styles.buttons}>
               <button className="button" onClick={onClickOk}> Так </button>
               <button className="button" onClick={onClickClose}> Ні </button>
            </div>
         </div>
      </div>
   )
}

export default Modal