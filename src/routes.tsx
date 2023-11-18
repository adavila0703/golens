import { ReactNode } from 'react'
import { GoLens } from './components/golens/GoLens'
import { Route } from 'react-router-dom'
import { PackageCoverage } from './components/package-coverage/PackageCoverage'
import { FileCoverage } from './components/file-coverage/FileCoverage'
import { HtmlContent } from './components/html-content/HtmlContent'
import { Tasks } from './components/tasks/Tasks'
import { Home, Task, Computer } from '@mui/icons-material'
import { Ignored } from './components/ignored/Ignored'

export interface Route {
  path: string
  element: any
  index: boolean
  navbar?: boolean
  navbarName?: string
  navbarIcon?: ReactNode
}

export const routes: Route[] = [
  {
    path: '/',
    element: <GoLens />,
    index: true,
    navbar: true,
    navbarName: 'Home',
    navbarIcon: <Home />,
  },
  {
    path: '/package-coverage/:id',
    element: <PackageCoverage />,
    index: true,
    navbar: false,
  },
  {
    path: '/package-coverage/:id/:packageName',
    element: <FileCoverage />,
    index: true,
    navbar: false,
  },
  {
    path: '/package-coverage/:id/:packageName/:fileName',
    element: <HtmlContent />,
    index: true,
    navbar: false,
  },
  {
    path: '/tasks',
    element: <Tasks />,
    index: true,
    navbar: true,
    navbarName: 'Tasks',
    navbarIcon: <Task />,
  },
  {
    path: '/ignore_directory',
    element: <Ignored />,
    index: true,
    navbar: true,
    navbarName: 'Ignored',
    navbarIcon: <Computer />,
  },
]
