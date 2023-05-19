import { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Endpoint, get } from '../api'

const columns: GridColDef[] = [
  { field: 'item', headerName: 'Item', width: 70 },
  { field: 'coverageName', headerName: 'Name', width: 130 },
  { field: 'coverage', headerName: 'Coverage %', width: 130 },
]

export const DataTable = () => {
  const [data, setData] = useState<any[]>()
  useEffect(() => {
    get(Endpoint.GetDirectories).then((resp) => setData(resp.directories))
  }, [])

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
