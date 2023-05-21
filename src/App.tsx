import './App.css'
import { GoLens } from './components/golens/GoLens'
import { Routes, Route, Outlet, Link } from 'react-router-dom'
import { RepoDetails } from './components/package_coverage/PackageCoverage'
import { FileCoverage } from './components/package_coverage/file_coverage/FileCoverage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<GoLens />} />
      <Route path="/repo-details/:id" element={<RepoDetails />} />
      <Route path="/repo-details/:id/:packageName" element={<FileCoverage />} />
    </Routes>
  )
}

export default App
