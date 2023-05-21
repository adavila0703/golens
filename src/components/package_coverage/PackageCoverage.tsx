import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getRepoDetails } from './PackageCoverage.actions'
import { repoDetailsDataSelector } from './PackageCoverage.selector'
import { getBarColor } from '../../utils/utils'
import './PackageCoverage.css'
import { ArrowBack } from '@mui/icons-material'
import { Button } from '@mui/material'

export const RepoDetails = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const tableData = useAppSelector(repoDetailsDataSelector)
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      dispatch(getRepoDetails(id))
    }
  }, [])

  if (!tableData || tableData.length <= 0) {
    return (
      <div>
        <div className="back-button-container">
          <Button startIcon={<ArrowBack />} sx={{ color: 'white' }} onClick={() => navigate('/')}>
            Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', gap: 15, flexDirection: 'column', width: '70rem' }}>
      <div className="back-button-container">
        <Button startIcon={<ArrowBack />} sx={{ color: 'white' }} onClick={() => navigate('/')}>
          Back
        </Button>
      </div>
      <table className="table-container">
        <tr>
          <th
            className="table-header-row"
            // onClick={clickId}
          >
            <div className="table-header-content">
              <div>Package Name</div>
              {/* {isNameSortAsc ? (
              <ArrowUpward style={{ visibility: nameClicked ? 'visible' : 'hidden' }} />
            ) : (
              <ArrowDownward style={{ visibility: nameClicked ? 'visible' : 'hidden' }} />
            )} */}
            </div>
          </th>
          <th
            className="table-header-row"
            // onClick={clickId}
          >
            <div className="table-header-content">
              <div>Coverage</div>

              {/* {isCoverageSortAsc ? (
              <ArrowUpward style={{ visibility: coverageClicked ? 'visible' : 'hidden' }} />
            ) : (
              <ArrowDownward style={{ visibility: coverageClicked ? 'visible' : 'hidden' }} />
            )} */}
            </div>
          </th>
        </tr>
        {tableData.map((data: any) => {
          return (
            <tr>
              <td className="row-hover" onClick={() => navigate(`/repo-details/${id}/${data.packageName}`)}>
                {data.packageName}
              </td>
              <td className="table-row-container">
                {data.coverage}
                <div
                  className="filler"
                  style={{ width: `${data.coverage}%`, backgroundColor: getBarColor(data.coverage) }}
                ></div>
              </td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}
