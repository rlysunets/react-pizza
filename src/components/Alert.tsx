import { FC } from "react"
import { Link } from "react-router-dom"

type Props = {
   error: string
}

const Alert: FC<Props> = ({ error }) => {
   return (
      <div className="alert center">
         <h3>Щось пішло не так ... </h3>
         <div>{error}</div>
         <Link to="/" className="button button--black">
            <span>На головну</span>
         </Link>
      </div>
   )
}

export default Alert