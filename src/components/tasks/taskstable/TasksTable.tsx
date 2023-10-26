import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { getTasksSelector } from '../Tasks.selector'
import { useAppSelector } from '../../../store/store'
import { Task } from '../Tasks.reducer'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'coverageName', headerName: 'Coverage Name', width: 250 },
  { field: 'scheduleTypeName', headerName: 'Schedule Type', width: 130 },
]

export const TaskTable = () => {
  const taskData: Task[] = useAppSelector(getTasksSelector)
  console.log(taskData)

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
        // onRowSelectionModelChange={() => {}}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ borderRadius: '20px', color: 'black', fontWeight: 'lighter' }}
      />
    </div>
  )
}
