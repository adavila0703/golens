import './App.css'
import { GoLens } from './components/golens/GoLens'
import { Routes, Route, Outlet, Link } from 'react-router-dom'
import { RepoDetails } from './components/package_coverage/PackageCoverage'
import { FileCoverage } from './components/package_coverage/file_coverage/FileCoverage'
import { HtmlContent } from './components/html_content/HtmlContent'

function App() {
  return (
    <Routes>
      <Route path="/" element={<GoLens />} />
      <Route path="/repo-details/:id" element={<RepoDetails />} />
      <Route path="/repo-details/:id/:packageName" element={<FileCoverage />} />
      <Route path="/repo-details/:id/:packageName/:fileName" element={<HtmlContent />} />
    </Routes>
  )
}

export default App
