import styled from 'styled-components'

export const CoverageBarContainer = styled.div`
  position: relative;
  background-color: black;
  z-index: 0;
  border-color: lightgray;
  border-radius: 25px;
  width: 250px;
`

export const CoverageBarText = styled.div<{ color: string }>`
  color: white;
  text-align: center;
`

export const CoverageBarFiller = styled.div<{
  width: number
  barColor: string
}>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  z-index: -1;
  animation: fillAnimation 0.25s ease-in-out forwards;
  border-radius: 25px;
  width: ${({ width }) => width}%;
  background-color: ${({ barColor }) => barColor};

  @keyframes fillAnimation {
    0% {
      width: 0;
    }
  }
`
