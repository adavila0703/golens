import { routes } from '../../routes'
import { useNavigate } from 'react-router-dom'
import {
  NavbarContainer,
  NavbarLink,
  NavbarLinkContainer,
} from './Navbar.style'
import { Typography } from '@mui/material'

export const Navbar = () => {
  const navigate = useNavigate()
  return (
    <NavbarContainer>
      <NavbarLinkContainer>
        {routes &&
          routes.map((route) => {
            if (route.navbar) {
              return (
                <NavbarLink
                  key={route.navbarName}
                  className="link-container"
                  onClick={() => navigate(route.path)}
                >
                  {route.navbarIcon}
                  <Typography>{route.navbarName}</Typography>
                </NavbarLink>
              )
            }
          })}
      </NavbarLinkContainer>
    </NavbarContainer>
  )
}
