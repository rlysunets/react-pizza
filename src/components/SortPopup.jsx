import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

//! React.memo перевіряє чи змінилося посилання на пропси, якшо ні то ререндер не 
//! відбудеться навіть якщо перерендириться батьківський компонент Home
const SortPopup = React.memo(({ items, onClickSortType, activeSortType }) => {
   const [visiblePopup, setVisiblePopup] = useState(false)

   const sortRef = useRef()
   const activeLabel = items.find(item => item.type === activeSortType).name

   const handleOutSideClick = (event) => {
      const path = event.path || (event.composedPath && event.composedPath())

      if (!path.includes(sortRef.current)) {
         setVisiblePopup(false)
      }
   }

   const tooglePopup = () => {
      setVisiblePopup(!visiblePopup)
   }

   const onSelectItem = type => {
      onClickSortType(type)
      setVisiblePopup(false)
   }

   useEffect(() => {
      document.body.addEventListener("click", handleOutSideClick)
   }, [])

   return (
      <div ref={sortRef} className="sort">
         <div className="sort__label">
            <svg
               width="10"
               height="6"
               viewBox="0 0 10 6"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
               className={visiblePopup ? "rotate" : ""}
            >
               <path
                  d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                  fill="#2C2C2C"
               />
            </svg>
            <b>Сортувати по:</b>
            <span onClick={tooglePopup}>{activeLabel}</span>
         </div>
         {visiblePopup &&
            <div className="sort__popup">
               <ul>
                  {items &&
                     items.map(obj => (
                        <li
                           key={obj.name}
                           className={activeSortType === obj.type ? "active" : ""}
                           onClick={() => onSelectItem(obj)}
                        >
                           {obj.name}
                        </li>)
                     )}
               </ul>
            </div>
         }
      </div>
   )
})

SortPopup.propTypes = {
   items: PropTypes.arrayOf(PropTypes.object).isRequired,
   onClickSortType: PropTypes.func.isRequired,
   activeSortType: PropTypes.string.isRequired
}

SortPopup.defaultProps = {
   items: [],
   activeSortType: "popular"
}

export default SortPopup