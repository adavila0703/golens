import { TableBar } from './tablebar/TableBar'
import { TotalCoverage } from './totalcoverage/TotalCoverage'
import { BarContainer, GoLensContainer, TitleContainer } from './GoLens.style'
import { useAppSelector } from '../../store/store'
import { getDataSelector, isLoadingSelector } from './GoLens.selector'
import { GoLensTable } from './golenstable/GoLensTable'
import { PageTitle } from '../pagetitle/PageTitle'
import ReactLoading from 'react-loading'

export const GoLens = () => {
  const data = useAppSelector(getDataSelector)
  const isLoading = useAppSelector(isLoadingSelector)

  const totalLines = data?.map((d) => d.totalLines)
  const coveredLines = data?.map((d) => d.coveredLines)

  return (
    <GoLensContainer>
      <TitleContainer>
        <PageTitle title="Golens" />
        {isLoading && <ReactLoading type="bars" color="#fff" />}
      </TitleContainer>
      <BarContainer>
        <TableBar />
        <TotalCoverage totalLines={totalLines} coveredLines={coveredLines} />
      </BarContainer>
      <GoLensTable />
    </GoLensContainer>
  )
}
