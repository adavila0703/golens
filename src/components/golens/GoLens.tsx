import { DataTable } from './datatable/DataTable'
import { TableBar } from './tablebar/TableBar'
import { TotalCoverage } from './totalcoverage/TotalCoverage'
import { BarContainer, GoLensContainer, GoLensTitle } from './GoLens.style'
import { Typography } from '@mui/material'
import { useAppSelector } from '../../store/store'
import { getDataSelector } from './GoLens.selector'

export const GoLens = () => {
  const data = useAppSelector(getDataSelector)

  return (
    <GoLensContainer>
      <GoLensTitle>
        <Typography variant="h2">GoLens</Typography>
      </GoLensTitle>
      <BarContainer>
        <TableBar />
        <TotalCoverage data={data} />
      </BarContainer>
      <DataTable />
    </GoLensContainer>
  )
}
