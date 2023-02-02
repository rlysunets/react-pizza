import React from 'react'
import PropTypes from 'prop-types'

//! React.memo перевіряє чи змінилося посилання на пропси, якшо ні то ререндер не 
//! відбудеться навіть якщо перерендириться батьківський компонент  Home
//  аналог shouldupdateComponent
const Categories = React.memo(({ items, onClickCategory, activeCategory }) => {
   return (
      <div className="categories">
         <ul>
            <li
               onClick={() => onClickCategory(null)}
               className={activeCategory === null ? "active" : ""}
            >
               Вся
            </li>

            {items &&
               items.map((item, index) => (
                  <li
                     key={item}
                     onClick={() => onClickCategory(index)}
                     className={activeCategory === index ? "active" : ""}
                  >
                     {item}
                  </li>)
               )}
         </ul>
      </div>
   )
})

Categories.propTypes = {
   items: PropTypes.arrayOf(PropTypes.string).isRequired,
   onClickCategory: PropTypes.func.isRequired,
}

Categories.defaultProps = {
   items: [],
   activeCategory: null
}

export default Categories