import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import {
  deleteDirectory,
  getTableData,
  sortByCoverage,
  sortById,
  sortByName,
} from '../GoLens.actions'
import {
  dataSelector,
  isCoverageSortAscSelector,
  isIdSortAscSelector,
  isLoadingSelector,
  isNameSortAscSelector,
} from '../GoLens.selector'
import './DataTable.css'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { getBarColor } from '../../../utils/utils'
import ReactLoading from 'react-loading'

export const DataTable: React.FC = () => {
  const dispatch = useAppDispatch()
  const tableData = useAppSelector(dataSelector)
  const isIdSortAsc = useAppSelector(isIdSortAscSelector)
  const isNameSortAsc = useAppSelector(isNameSortAscSelector)
  const isCoverageSortAsc = useAppSelector(isCoverageSortAscSelector)
  const isLoading = useAppSelector(isLoadingSelector)

  const [idClicked, setIdClick] = useState(true)
  const [nameClicked, setNameClick] = useState(false)
  const [coverageClicked, setCoverageClick] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getTableData())
  }, [])

  const clickId = () => {
    dispatch(sortById())
    setIdClick(true)
    setNameClick(false)
    setCoverageClick(false)
  }

  const clickName = () => {
    dispatch(sortByName())
    setIdClick(false)
    setNameClick(true)
    setCoverageClick(false)
  }

  const clickCoverage = () => {
    dispatch(sortByCoverage())
    setIdClick(false)
    setNameClick(false)
    setCoverageClick(true)
  }

  const deleteRepo = (id: string) => {
    dispatch(deleteDirectory(id))
  }

  return (
    <>
      <table className="table-container">
        <tr>
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
        </tr>
        {tableData &&
          tableData.map((data: any) => {
            return (
              <tr>
                <td
                  className="row-hover"
                  onClick={() => navigate(`/repo-details/${data.id}`)}
                >
                  {data.coverageName}
                </td>
                <td className="table-row-container">
                  {data.coverage}
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
                    onClick={() => deleteRepo(data.id)}
                  >
                    <DeleteIcon />
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
