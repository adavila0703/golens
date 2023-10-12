import React, { useState, useEffect } from 'react'
import { GoLens } from './components/golens/GoLens'
import {
  Routes,
  Route,
  Outlet,
  Link,
  useLocation,
  useParams,
} from 'react-router-dom'
import { RepoDetails } from './components/packagecoverage/PackageCoverage'
import { FileCoverage } from './components/filecoverage/FileCoverage'
import { HtmlContent } from './components/htmlcontent/HtmlContent'
import './App.css'
import { Transition, animated } from '@react-spring/web'
import { NavBar } from './components/navbar/NavBar'
import { Settings } from '@mui/icons-material'
import { Settings as SettingsPage } from './components/settings/Settings'

const PageTransition = () => {
  const location = useLocation()
  const [previousRouteIndex, setPreviousRouteIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showPreviousPage, setShowPreviousPage] = useState(true)

  // Set isTransitioning to true when a new route starts transitioning
  const handleTransitionStart = () => {
    setIsTransitioning(true)
    setShowPreviousPage(true)
  }

  // Set isTransitioning to false when the transition animation finishes
  const handleTransitionEnd = () => {
    setIsTransitioning(false)
    setShowPreviousPage(false)
  }

  const currentRouteIndex = routes.findIndex((route) => {
    const routeSegments = route.path.split('/')
    const locationSegments = location.pathname.split('/')

    if (routeSegments.length !== locationSegments.length) {
      return false
    }

    for (let i = 0; i < routeSegments.length; i++) {
      if (
        routeSegments[i] !== locationSegments[i] &&
        !routeSegments[i].startsWith(':')
      ) {
        return false
      }
    }

    return true
  })

  useEffect(() => {
    if (currentRouteIndex !== previousRouteIndex) {
      setPreviousRouteIndex(currentRouteIndex)
    }
  }, [location, previousRouteIndex, currentRouteIndex])

  return (
    <Transition
      items={location}
      from={{
        opacity: 0,
        transform:
          currentRouteIndex > previousRouteIndex
            ? 'translateX(100%)'
            : 'translateX(-100%)',
      }}
      enter={{ opacity: 1, transform: 'translateX(0%)' }}
      leave={{
        opacity: 0,
        transform:
          currentRouteIndex > previousRouteIndex
            ? 'translateX(-100%)'
            : 'translateX(100%)',
      }}
      config={{ duration: 100 }}
      onStart={handleTransitionStart}
      onRest={handleTransitionEnd}
    >
      {(styles) => (
        <animated.div style={styles}>
          <Outlet />
        </animated.div>
      )}
    </Transition>
  )
}

const routes = [
  {
    path: '/',
    element: <GoLens />,
    index: true,
  },
  {
    path: '/repo-details/:id',
    element: <RepoDetails />,
    index: true,
  },
  {
    path: '/repo-details/:id/:packageName',
    element: <FileCoverage />,
    index: true,
  },
  {
    path: '/repo-details/:id/:packageName/:fileName',
    element: <HtmlContent />,
    index: true,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
    index: true,
  },
]

function App() {
  const location = useLocation()
  return (
    <>
      {/* <NavBar /> */}
      <Routes location={location}>
        <Route path="/" element={<PageTransition />}>
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
    </>
  )
}

export default App
