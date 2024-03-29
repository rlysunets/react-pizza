import React from 'react'
import ReactDOM from 'react-dom/client'
// import { BrowserRouter } from "react-router-dom"
import { HashRouter } from "react-router-dom"
import { Provider } from 'react-redux'

import { store } from './redux/store'
import App from './App'

import './scss/app.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as Element)

root.render(
   <React.StrictMode>
      {/* <BrowserRouter> */}
      <HashRouter>
         <Provider store={store}>
            <App />
         </Provider>
      </HashRouter>
      {/* </BrowserRouter> */}
   </React.StrictMode>
)
