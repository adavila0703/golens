import { getBarColor } from '../../utils/utils'
import {
  CoverageBarContainer,
  CoverageBarFiller,
  CoverageBarText,
} from './CoverageBar.style'

interface CoverageBarProps {
  coverage: number
}

export const CoverageBar = ({ coverage }: CoverageBarProps) => {
  const barColor = getBarColor(coverage)

  return (
    <CoverageBarContainer>
      <CoverageBarText color={barColor === 'yellow' ? 'black' : ''}>
        {coverage}%
      </CoverageBarText>
      <CoverageBarFiller width={coverage} backgroundColor={barColor} />
    </CoverageBarContainer>
  )
}
