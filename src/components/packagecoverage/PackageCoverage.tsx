import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getPackageCoverage } from './PackageCoverage.actions'
import { packageDetailsDataSelector } from './PackageCoverage.selector'
import { ArrowBack } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { CoverageBar } from '../coveragebar/CoverageBar'
import { PackageCoverageContainer } from './PackageCoverage.style'
import { TotalCoverage } from '../golens/totalcoverage/TotalCoverage'

export const PackageCoverage = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const tableData = useAppSelector(packageDetailsDataSelector)
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      dispatch(getPackageCoverage(id))
    }
  }, [])

  if (!tableData || tableData.length <= 0) {
    return (
      <div>
        <div className="back-button-container">
          <Button
            startIcon={<ArrowBack />}
            sx={{ color: 'white' }}
            onClick={() => navigate('/')}
          >
            Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <PackageCoverageContainer>
      <Typography variant="h2">Packages</Typography>
      <TotalCoverage data={tableData} />
      <div className="back-button-container">
        <Button
          startIcon={<ArrowBack />}
          sx={{ color: 'white' }}
          onClick={() => navigate('/')}
        >
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
              <td
                className="row-hover"
                onClick={() =>
                  navigate(`/package-coverage/${id}/${data.packageName}`)
                }
              >
                {data.packageName}
              </td>
              <td>
                <CoverageBar coverage={data.coverage} />
              </td>
            </tr>
          )
        })}
      </table>
    </PackageCoverageContainer>
  )
}
