import { useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { getTasksSelector } from '../Tasks.selector'
import { useAppSelector } from '../../../store/store'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'coverageName', headerName: 'Coverage Name', width: 250 },
  { field: 'scheduleTypeName', headerName: 'Schedule Type', width: 130 },
]

export const TaskTable = () => {
  const taskData: any[] = useAppSelector(getTasksSelector)
  const [rowsSelected, setRowsSelected] = useState<number[]>([])

  return (
    <div
      style={{
        height: 400,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '20px',
      }}
    >
      <DataGrid
        rows={taskData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        onRowSelectionModelChange={(rows) => {
          setRowsSelected(rows as number[])
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ borderRadius: '20px', color: 'black', fontWeight: 'lighter' }}
      />
    </div>
  )
}
