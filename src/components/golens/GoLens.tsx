import { DataTable } from './data_table/DataTable'
import { TableBar } from './table_bar/TableBar'
import './GoLens.css'

export const GoLens = () => {
  return (
    <>
      <div className="root-content">
        <h1>GoLens</h1>
        <TableBar />
        <DataTable />
      </div>
    </>
  )
}
