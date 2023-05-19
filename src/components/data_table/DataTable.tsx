import { useEffect } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getTableData } from '../GoLens.actions'
import { dataSelector } from '../GoLens.selector'

const columns: GridColDef[] = [
  { field: 'item', headerName: 'Item', width: 70 },
  { field: 'coverageName', headerName: 'Name', width: 130 },
  { field: 'coverage', headerName: 'Coverage %', width: 130 },
]

export const DataTable: React.FC = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector(dataSelector)

  useEffect(() => {
    dispatch(getTableData())
  }, [])

  console.log(data)

  return (
    <div style={{ height: 'auto', width: 700, backgroundColor: 'white' }}>
      {data && (
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      )}
    </div>
  )
}
