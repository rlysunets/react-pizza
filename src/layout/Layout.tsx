import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { Header, Footer } from '../components'

const Layout: FC = () => {
   return (
      <div className="wrapper">
         <Header />
         <Outlet />
         <Footer />
      </div>
   )
}

export default Layout