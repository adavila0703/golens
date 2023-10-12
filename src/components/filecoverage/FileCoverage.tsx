import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { ArrowBack } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { fileCoverageSelector } from './FileCoverage.selector'
import { getFileCoverage } from './FileCoverage.actions'
import { CoverageBar } from '../coveragebar/CoverageBar'
import { FileCoverageContainer } from './FileCoverage.style'
import { TotalCoverage } from '../golens/totalcoverage/TotalCoverage'

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
    <FileCoverageContainer>
      <Typography variant="h2">Files</Typography>
      <TotalCoverage data={fileCoverage} />
      <div className="back-button-container">
        <Button
          startIcon={<ArrowBack />}
          sx={{ color: 'white' }}
          onClick={() => navigate(`/package-coverage/${id}`)}
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
                <td
                  className="row-hover"
                  onClick={() =>
                    navigate(
                      `/package-coverage/${id}/${packageName}/${fileName}`
                    )
                  }
                >
                  {data.fileName}
                </td>
                <td>
                  <CoverageBar coverage={data.coverage} />
                </td>
              </tr>
            )
          })}
      </table>
    </FileCoverageContainer>
  )
}
