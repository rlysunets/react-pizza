import { FC } from 'react'

const Footer: FC = () => {
   return (
      <div className="footer">
         <div className="container">
            <div className="footer__content">
               <div>
                  powered by <a href="https://www.linkedin.com/in/roman-lysunets-21b166225/" target="_blank" rel="noreferrer">Roman Lysunets.</a>
               </div>
               <div>
                  Ідеї та контент взяті <a href="https://la.ua/" target="_blank" rel="noreferrer">тут.</a>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Footer