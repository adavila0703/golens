import { DataTable } from './data_table/DataTable'
import { FileSelector } from './file_selector/FileSelector'
import './GoLens.css'

export const GoLens = () => {
  return (
    <>
      <div className="root-content">
        <h1>GoLens</h1>
        <FileSelector />
        <DataTable />
      </div>
    </>
  )
}
