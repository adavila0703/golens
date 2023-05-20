import './App.css'
import { GoLens } from './components/golens/GoLens'
import { Routes, Route, Outlet, Link } from 'react-router-dom'
import { RepoDetails } from './components/repo_details/RepoDetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={<GoLens />} />
      <Route path="/repo-details/:id" element={<RepoDetails />} />
    </Routes>
  )
}

export default App
