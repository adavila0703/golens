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

  if (!coverage) {
    coverage = 0.0
  }

  return (
    <CoverageBarContainer>
      <CoverageBarText color={barColor === 'yellow' ? 'black' : 'white'}>
        {coverage.toFixed(2)}%
      </CoverageBarText>
      <CoverageBarFiller width={coverage} barcolor={barColor} />
    </CoverageBarContainer>
  )
}
