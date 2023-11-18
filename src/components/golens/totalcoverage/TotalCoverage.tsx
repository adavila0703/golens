/* eslint-disable @typescript-eslint/no-explicit-any */

import { getCoveragePercentage } from '../../../utils/utils'
import { CoverageBar } from '../../coverage-bar/CoverageBar'
import { TotalCoverageContainer } from './TotalCoverage.style'

interface TotalCoverageProps {
  totalLines: number[]
  coveredLines: number[]
}

export const TotalCoverage = ({
  totalLines,
  coveredLines,
}: TotalCoverageProps) => {
  if (!totalLines?.length || !coveredLines?.length) {
    return null
  }

  const total = totalLines?.reduce((a, b) => a + b)
  const covered = coveredLines?.reduce((a, b) => a + b)

  if (!total || !covered) {
    return null
  }

  return (
    <TotalCoverageContainer>
      <div>Total Coverage</div>
      <CoverageBar coverage={getCoveragePercentage(total, covered)} />
    </TotalCoverageContainer>
  )
}
