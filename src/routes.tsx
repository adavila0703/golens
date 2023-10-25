import { ReactNode } from 'react'
import { GoLens } from './components/golens/GoLens'
import { Route } from 'react-router-dom'
import { PackageCoverage } from './components/packagecoverage/PackageCoverage'
import { FileCoverage } from './components/filecoverage/FileCoverage'
import { HtmlContent } from './components/htmlcontent/HtmlContent'
import { Tasks } from './components/tasks/Tasks'
import { Home, Task, StoreMallDirectory, Computer } from '@mui/icons-material'
import { IgnoredDirectories } from './components/ignoreddirectories/IgnoredDirectories'

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
    element: <IgnoredDirectories />,
    index: true,
    navbar: true,
    navbarName: 'Ignored Directories',
    navbarIcon: <Computer />,
  },
]
