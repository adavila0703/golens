import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'
import './App.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
