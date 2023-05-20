import { DataTable } from './data_table/DataTable'
import { FileSelector } from './file_selector/FileSelector'

export const GoLens = () => {
  return (
    <div style={{ display: 'flex', gap: 15, flexDirection: 'column', width: '70rem' }}>
      <h1>GoLens</h1>
      <FileSelector />
      <DataTable />
    </div>
  )
}
