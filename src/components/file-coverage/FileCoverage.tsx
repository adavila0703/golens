import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { ArrowBack } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { fileCoverageSelector } from './FileCoverage.selector'
import { getFileCoverage } from './FileCoverage.actions'
import { FileCoverageNavBar, FileCoverageContainer } from './FileCoverage.style'
import { TotalCoverage } from '../golens/totalcoverage/TotalCoverage'
import {
  SimpleCoverageTable,
  TableType,
} from '../simple-coverage-table/SimpleCoverageData'

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

  const totalLines = fileCoverage?.map((data) => data.totalLines)
  const coveredLines = fileCoverage?.map((data) => data.coveredLines)

  const forwardNavigation: { [keyof: string]: string } = {}
  fileCoverage?.forEach((data) => {
    const fileName = data.fileName.split('.')[0]
    forwardNavigation[data.fileName] =
      `/package-coverage/${id}/${packageName}/${fileName}`
  })

  return (
    <FileCoverageContainer>
      <Typography variant="h2">Files</Typography>
      <FileCoverageNavBar>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(`/package-coverage/${id}`)}
        >
          Back
        </Button>
        <TotalCoverage totalLines={totalLines} coveredLines={coveredLines} />
      </FileCoverageNavBar>
      {fileCoverage ? (
        <SimpleCoverageTable
          tableType={TableType.FILES}
          tableData={fileCoverage}
          forwardNavigation={forwardNavigation}
        />
      ) : (
        <Typography>No file coverage found</Typography>
      )}
    </FileCoverageContainer>
  )
}
