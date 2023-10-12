import styled from 'styled-components'

export const CoverageBarContainer = styled.div`
  position: relative;
  background-color: black;
  z-index: 0;
  border-color: lightgray;
  border-radius: 25px;
`

export const CoverageBarText = styled.div<{ color: string }>`
  color: ${({ color }) => color};
`

export const CoverageBarFiller = styled.div<{
  width: number
  backgroundColor: string
}>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  z-index: -1;
  animation: fillAnimation 1s ease-in-out forwards;
  border-radius: 25px;
  width: ${({ width }) => width}%;
  background-color: ${({ backgroundColor }) => backgroundColor};
`
