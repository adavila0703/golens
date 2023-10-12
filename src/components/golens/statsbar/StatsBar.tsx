import { useAppSelector } from '../../../store/store'
import { getBarColor } from '../../../utils/utils'
import { CoverageBar } from '../../coveragebar/CoverageBar'
import { getDataSelector } from '../GoLens.selector'
import { StatsBarContainer } from './StatsBar.style'

export const StatsBar = () => {
  const tableData = useAppSelector(getDataSelector)
  const totalCoverage = tableData.map((data) => data.coverage)
  console.log(totalCoverage)

  return (
    <StatsBarContainer>
      <div>Total Coverage</div>
      <CoverageBar coverage={10} />
    </StatsBarContainer>
  )
}
