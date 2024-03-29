import { useState } from 'react'
import { TableBar } from './tablebar/TableBar'
import { TotalCoverage } from './totalcoverage/TotalCoverage'
import { BarContainer, GoLensContainer, TitleContainer } from './GoLens.style'
import { useAppSelector } from '../../store/store'
import { getDataSelector, isLoadingSelector } from './GoLens.selector'
import { GoLensTable } from './golenstable/GoLensTable'
import { PageTitle } from '../page-title/PageTitle'
import ReactLoading from 'react-loading'

export const GoLens = () => {
  const data = useAppSelector(getDataSelector)
  const isLoading = useAppSelector(isLoadingSelector)
  const totalLines = data?.map((d) => d.totalLines)
  const coveredLines = data?.map((d) => d.coveredLines)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  return (
    <GoLensContainer>
      <TitleContainer>
        <PageTitle title="Golens" />
        {isLoading && <ReactLoading type="bars" color="#fff" />}
      </TitleContainer>
      <BarContainer>
        <TableBar selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
        <TotalCoverage totalLines={totalLines} coveredLines={coveredLines} />
      </BarContainer>
      <GoLensTable selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
    </GoLensContainer>
  )
}
