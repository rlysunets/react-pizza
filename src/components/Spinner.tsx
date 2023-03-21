import { FC } from "react"
import { ThreeCircles } from 'react-loader-spinner'

const Spinner: FC = () => {
   return (
      <div className='center'>
         <ThreeCircles
            height="100"
            width="100"
            color="#ffd600"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
         />
      </div>
   )
}

export default Spinner