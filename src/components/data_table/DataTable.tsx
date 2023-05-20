import { useEffect } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getTableData } from '../GoLens.actions'
import { dataSelector } from '../GoLens.selector'
import './DataTable.css'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

export const DataTable: React.FC = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector(dataSelector)

  useEffect(() => {
    dispatch(getTableData())
  }, [])

  const getBarColor = (coverage: number): string => {
    if (coverage >= 0 && coverage < 79) {
      return 'red'
    } else if (coverage >= 80 && coverage < 89) {
      return 'yellow'
    } else if (coverage >= 90 && coverage <= 100) {
      return 'green'
    }

    console.log(coverage)

    return ''
  }

  return (
    <>
      <div className="table-header">
        <div>ID</div>
        <div>Name</div>
        <div>Coverage %</div>
        <div>Delete</div>
      </div>

      <table>
        <th>ID</th>
        <th>ID</th>
        <th>ID</th>
        <th>ID</th>
        <tr>hello</tr>
      </table>
      {data.map((d: any) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="table-container">
              <div>{d.item}</div>
              <div>{d.coverageName}</div>
              <div>{d.coverage}%</div>
              <div
                className="filler"
                style={{ width: `${d.coverage}%`, backgroundColor: getBarColor(d.coverage) }}
              ></div>
            </div>
            <IconButton style={{ color: 'white' }} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </div>
        )
      })}
    </>
  )

  // return (
  //   <div style={{ height: 'auto', width: 700, backgroundColor: 'white' }}>
  //     {/* {data && (
  //       <DataGrid
  //         rows={data}
  //         columns={columns}
  //         initialState={{
  //           pagination: {
  //             paginationModel: { page: 0, pageSize: 5 },
  //           },
  //         }}
  //         pageSizeOptions={[5, 10]}
  //         checkboxSelection
  //       />
  //     )} */}

  //   </div>
  // )
}
