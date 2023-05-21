import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../store/store'
import { fileCoverageSelector } from '../PackageCoverage.selector'
import { getBarColor } from '../../../utils/utils'
import { ArrowBack } from '@mui/icons-material'
import { Button } from '@mui/material'
import '../PackageCoverage.css'

export const FileCoverage = () => {
  const { id, packageName } = useParams()
  const fileCoverage = useAppSelector(fileCoverageSelector)
  const navigate = useNavigate()

  let tableData
  if (packageName) {
    tableData = fileCoverage[packageName]
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
        {tableData &&
          tableData.map((data: any) => {
            return (
              <tr>
                <td
                  className="row-hover"
                  onClick={() => navigate(`/repo-details/${id}/${packageName}/${data.fileName}`)}
                >
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
