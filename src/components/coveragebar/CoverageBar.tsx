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
        {coverage.toFixed(2)}%
      </CoverageBarText>
      <CoverageBarFiller width={coverage} barColor={barColor} />
    </CoverageBarContainer>
  )
}
