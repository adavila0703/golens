import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { Theme, ThemeProvider, createTheme } from '@mui/material'
import './main.css'

const theme: Theme = createTheme({
  typography: {
    fontFamily: 'sans-serif',
  },
  components: {},
  palette: {},
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
