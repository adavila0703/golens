import { DataTable } from './data_table/DataTable'
import { TableBar } from './tablebar/TableBar'
import './GoLens.css'
import { StatsBar } from './statsbar/StatsBar'
import { BarContainer } from './GoLens.style'

export const GoLens = () => {
  return (
    <div style={{ backgroundColor: 'gray' }}>
      <h1>GoLens</h1>
      <BarContainer>
        <TableBar />
        <StatsBar />
      </BarContainer>
      <DataTable />
    </div>
  )
}
