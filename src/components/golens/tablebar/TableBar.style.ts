import { Box, Button } from '@mui/material'
import styled from 'styled-components'

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`

export const ModalBoxContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 350px;
  background-color: gray;
  border: 2px solid #000;
  box-shadow: 25;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`

export const ModalContent = styled.div`
  width: 90%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
