/* eslint-disable @typescript-eslint/no-explicit-any */

import { CoverageBar } from '../../coveragebar/CoverageBar'
import { TotalCoverageContainer } from './TotalCoverage.style'

interface TotalCoverageProps {
  data: any
}

export const TotalCoverage = ({ data }: TotalCoverageProps) => {
  let totalCoverage = 0

  if (data.length) {
    totalCoverage = data
      .map((data: any) => data.coverage)
      .reduce((a: number, b: number) => a + b)
  }

  const totalPercentage = totalCoverage / data.length

  if (isNaN(totalPercentage)) {
    return null
  }

  return (
    <TotalCoverageContainer>
      <div>Total Coverage</div>
      <CoverageBar coverage={totalPercentage} />
    </TotalCoverageContainer>
  )
}
