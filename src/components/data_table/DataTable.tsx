import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getTableData, sortByCoverage, sortById, sortByName } from '../GoLens.actions'
import { dataSelector, isCoverageSortAscSelector, isIdSortAscSelector, isNameSortAscSelector } from '../GoLens.selector'
import './DataTable.css'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { useSelector } from 'react-redux'

export const DataTable: React.FC = () => {
  const dispatch = useAppDispatch()
  const tableData = useAppSelector(dataSelector)
  const isIdSortAsc = useSelector(isIdSortAscSelector)
  const isNameSortAsc = useSelector(isNameSortAscSelector)
  const isCoverageSortAsc = useSelector(isCoverageSortAscSelector)
  const [idClicked, setIdClick] = useState(true)
  const [nameClicked, setNameClick] = useState(false)
  const [coverageClicked, setCoverageClick] = useState(false)

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

    return ''
  }

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

  return (
    <>
      <table className="table-container">
        <tr>
          <th className="table-header-row" onClick={clickId}>
            <div className="table-header-content">
              <div>ID</div>
              {isIdSortAsc ? (
                <ArrowUpward style={{ visibility: idClicked ? 'visible' : 'hidden' }} />
              ) : (
                <ArrowDownward style={{ visibility: idClicked ? 'visible' : 'hidden' }} />
              )}
            </div>
          </th>
          <th className="table-header-row" onClick={clickName}>
            <div className="table-header-content">
              <div>Name</div>
              {isNameSortAsc ? (
                <ArrowUpward style={{ visibility: nameClicked ? 'visible' : 'hidden' }} />
              ) : (
                <ArrowDownward style={{ visibility: nameClicked ? 'visible' : 'hidden' }} />
              )}
            </div>
          </th>
          <th className="table-header-row" onClick={clickCoverage}>
            <div className="table-header-content">
              <div>Coverage</div>

              {isCoverageSortAsc ? (
                <ArrowUpward style={{ visibility: coverageClicked ? 'visible' : 'hidden' }} />
              ) : (
                <ArrowDownward style={{ visibility: coverageClicked ? 'visible' : 'hidden' }} />
              )}
            </div>
          </th>
          <th>Delete</th>
        </tr>
        {tableData.map((data) => {
          return (
            <tr>
              <td>{data.item}</td>
              <td className="row-hover" onClick={() => console.log(data.id)}>
                {data.coverageName}
              </td>
              <td className="table-row-container">
                {data.coverage}
                <div
                  className="filler"
                  style={{ width: `${data.coverage}%`, backgroundColor: getBarColor(data.coverage) }}
                ></div>
              </td>
              <td>
                <IconButton style={{ color: 'white' }} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          )
        })}
      </table>
    </>
  )
}
