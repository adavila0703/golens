import './NavBar.css'
import { Home, Analytics, Settings } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export const NavBar = () => {
  const navigate = useNavigate()
  return (
    <div className="sticky-component">
      <div className="link-containers">
        <div className="link-container" onClick={() => navigate('/')}>
          <Home />
          <div>Home</div>
        </div>
        {/* <hr style={{ width: '100%' }} />
        <div className="link-container" onClick={() => navigate('/')}>
          <Analytics />
          <div>Analytics</div>
        </div> */}
        <hr style={{ width: '100%' }} />
        <div className="link-container" onClick={() => navigate('/settings')}>
          <Settings />
          <div>Settings</div>
        </div>
      </div>
    </div>
  )
}
