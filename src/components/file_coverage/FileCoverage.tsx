import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getBarColor } from '../../utils/utils'
import { ArrowBack } from '@mui/icons-material'
import { Button } from '@mui/material'
import { fileCoverageSelector } from './FileCoverage.selector'
import { getFileCoverage } from './FileCoverage.actions'

export const FileCoverage = () => {
  const { id, packageName } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const fileCoverage = useAppSelector(fileCoverageSelector)

  useEffect(() => {
    if (id && packageName) {
      dispatch(getFileCoverage(id, packageName))
    }
  }, [])

  return (
    <div className="root-content">
      <h1>Files</h1>
      <div className="back-button-container">
        <Button startIcon={<ArrowBack />} sx={{ color: 'white' }} onClick={() => navigate(`/repo-details/${id}`)}>
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
              <div>File Name</div>
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
        {fileCoverage &&
          fileCoverage.map((data: any) => {
            const fileName = data.fileName.split('.')[0]
            return (
              <tr>
                <td className="row-hover" onClick={() => navigate(`/repo-details/${id}/${packageName}/${fileName}`)}>
                  {data.fileName}
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
