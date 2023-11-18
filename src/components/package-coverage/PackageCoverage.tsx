import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getPackageCoverage } from './PackageCoverage.actions'
import { packageCoverageDataSelector } from './PackageCoverage.selector'
import { ArrowBack } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import {
  PackageCoverageContainer,
  PackageCoverageNavBar,
} from './PackageCoverage.style'
import { TotalCoverage } from '../golens/totalcoverage/TotalCoverage'
import {
  SimpleCoverageTable,
  TableType,
} from '../simple-coverage-table/SimpleCoverageData'

export const PackageCoverage = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const packagesCoverage = useAppSelector(packageCoverageDataSelector)
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      dispatch(getPackageCoverage(id))
    }
  }, [])

  const totalLines = packagesCoverage?.map((data) => data.totalLines)
  const coveredLines = packagesCoverage?.map((data) => data.coveredLines)

  const forwardNavigation: { [keyof: string]: string } = {}
  packagesCoverage?.forEach((data) => {
    forwardNavigation[
      data.packageName
    ] = `/package-coverage/${id}/${data.packageName}`
  })

  return (
    <PackageCoverageContainer>
      <Typography variant="h2">Packages</Typography>
      <PackageCoverageNavBar>
        <Button
          startIcon={<ArrowBack />}
          sx={{ color: 'white' }}
          onClick={() => navigate('/')}
        >
          Back
        </Button>
        <TotalCoverage totalLines={totalLines} coveredLines={coveredLines} />
      </PackageCoverageNavBar>
      {packagesCoverage ? (
        <SimpleCoverageTable
          tableType={TableType.PACKAGES}
          tableData={packagesCoverage}
          forwardNavigation={forwardNavigation}
        />
      ) : (
        <Typography>No package coverage found.</Typography>
      )}
    </PackageCoverageContainer>
  )
}
