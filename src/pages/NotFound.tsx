import { FC } from 'react'
import { Link } from "react-router-dom"

const NotFound: FC = () => {
   return (
      <div className="content">
         <div className="container container--not-found">
            <h2>4  😕  4</h2>
            <div className="not-found__desc">Схоже тут пусто, як і у твоєму холодильнику...
               Повертайся, щоб не залишитися голодним;) </div>
            <Link to="/" className="button button--black">
               <span>На головну</span>
            </Link>
         </div>
      </div>
   )
}

export default NotFound