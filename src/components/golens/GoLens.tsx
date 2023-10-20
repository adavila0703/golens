import { TableBar } from './tablebar/TableBar'
import { TotalCoverage } from './totalcoverage/TotalCoverage'
import { BarContainer, GoLensContainer } from './GoLens.style'
import { useAppSelector } from '../../store/store'
import { getDataSelector } from './GoLens.selector'
import { DataTable } from './datatable/DataTable'
import { PageTitle } from '../pagetitle/PageTitle'

export const GoLens = () => {
  const data = useAppSelector(getDataSelector)

  return (
    <GoLensContainer>
      <PageTitle title="Golens" />
      <BarContainer>
        <TableBar />
        <TotalCoverage data={data} />
      </BarContainer>
      <DataTable />
    </GoLensContainer>
  )
}
