import { Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from './components/navbar/Navbar'
import { AppRoot } from './App.style'
import { routes } from './routes'

function App() {
  const location = useLocation()
  return (
    <AppRoot>
      <Navbar />
      <Routes location={location}>
        <Route path="/">
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                index={route.index}
                path={route.path}
                element={route.element}
              />
            )
          })}
        </Route>
      </Routes>
    </AppRoot>
  )
}

export default App
