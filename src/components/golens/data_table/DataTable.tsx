import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import {
  deleteDirectory,
  getTableData,
  setSelectedIds,
  sortByCoverage,
  sortByName,
  updateDirectory,
} from '../GoLens.actions'
import {
  getDataSelector,
  getSelectedIdsSelector,
  isCoverageSortAscSelector,
  isLoadingSelector,
  isNameSortAscSelector,
} from '../GoLens.selector'
import './DataTable.css'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { ArrowDownward, ArrowUpward, Refresh } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { getBarColor } from '../../../utils/utils'
import ReactLoading from 'react-loading'
import Checkbox from '@mui/material/Checkbox'

export const DataTable: React.FC = () => {
  const dispatch = useAppDispatch()
  const tableData = useAppSelector(getDataSelector)
  const isNameSortAsc = useAppSelector(isNameSortAscSelector)
  const isCoverageSortAsc = useAppSelector(isCoverageSortAscSelector)
  const isLoading = useAppSelector(isLoadingSelector)
  const selectedIds = useAppSelector(getSelectedIdsSelector)

  const [nameClicked, setNameClick] = useState(false)
  const [coverageClicked, setCoverageClick] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getTableData())
  }, [])

  const clickName = () => {
    dispatch(sortByName())
    setNameClick(true)
    setCoverageClick(false)
  }

  const clickCoverage = () => {
    dispatch(sortByCoverage())
    setNameClick(false)
    setCoverageClick(true)
  }

  const handleDeleteDirectory = (id: string) => {
    dispatch(deleteDirectory(id))
  }

  const onSelect = (id: string, checked: boolean) => {
    let newRepoIds: string[] = []
    if (checked) {
      newRepoIds = [...selectedIds, id]
    } else {
      newRepoIds = selectedIds.filter((repoId) => repoId != id)
    }
    dispatch(setSelectedIds(newRepoIds))
  }

  const handleUpdateDirectory = (id: string) => {
    dispatch(updateDirectory(id))
  }

  return (
    <>
      <table className="table-container">
        <tr>
          <th>Select</th>
          <th className="table-header-row" onClick={clickName}>
            <div className="table-header-content">
              <div>Name</div>
              {isNameSortAsc ? (
                <ArrowUpward
                  style={{ visibility: nameClicked ? 'visible' : 'hidden' }}
                />
              ) : (
                <ArrowDownward
                  style={{ visibility: nameClicked ? 'visible' : 'hidden' }}
                />
              )}
            </div>
          </th>
          <th className="table-header-row" onClick={clickCoverage}>
            <div className="table-header-content">
              <div>Coverage</div>
              {isCoverageSortAsc ? (
                <ArrowUpward
                  style={{ visibility: coverageClicked ? 'visible' : 'hidden' }}
                />
              ) : (
                <ArrowDownward
                  style={{ visibility: coverageClicked ? 'visible' : 'hidden' }}
                />
              )}
            </div>
          </th>
          <th>Delete</th>
          <th>Refresh</th>
        </tr>
        {tableData &&
          tableData.map((data: any) => {
            return (
              <tr>
                <td>
                  <Checkbox
                    sx={{ color: 'white' }}
                    color="default"
                    onChange={(_, checked) => onSelect(data.id, checked)}
                    checked={selectedIds.includes(data.id)}
                  />
                </td>
                <td
                  className="row-hover"
                  onClick={() => navigate(`/repo-details/${data.id}`)}
                >
                  {data.coverageName}
                </td>
                <td className="table-row-container">
                  <div
                    style={{
                      color:
                        getBarColor(data.coverage) === 'yellow' ? 'black' : '',
                    }}
                  >
                    {data.coverage}%
                  </div>
                  <div
                    className="filler"
                    style={{
                      width: `${data.coverage}%`,
                      backgroundColor: getBarColor(data.coverage),
                    }}
                  ></div>
                </td>
                <td>
                  <IconButton
                    style={{ color: 'white' }}
                    aria-label="delete"
                    onClick={() => handleDeleteDirectory(data.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
                <td>
                  <IconButton
                    style={{ color: 'white' }}
                    aria-label="delete"
                    onClick={() => handleUpdateDirectory(data.id)}
                  >
                    <Refresh />
                  </IconButton>
                </td>
              </tr>
            )
          })}
      </table>
      <div className="loading-bar">
        {isLoading && (
          <ReactLoading
            type="bubbles"
            color="#fff"
            width={'10%'}
            height={'10%'}
          />
        )}
      </div>
    </>
  )
}
