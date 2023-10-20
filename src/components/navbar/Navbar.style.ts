import styled from 'styled-components'

export const NavbarContainer = styled.div`
  position: fixed;
  left: 1%;
  top: 45%;
  text-align: center;
`

export const NavbarLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`
export const NavbarLink = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  gap: 5px;
  justify-content: start;
  padding: 10px;
  align-items: center;

  &:hover {
    display: flex;
    flex-direction: row;
    cursor: pointer;
    gap: 5px;
    justify-content: start;
    background-color: white;
    color: black;
    border-radius: 5px;
  }
`

export const NavbarText = styled.div`
  display: flex;
  gap: 5px;
  text-align: left;
`
