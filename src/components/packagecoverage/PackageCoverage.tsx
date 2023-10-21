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
import { IPackageData } from './PackageCoverage.reducer'
import { getCoveragePercentage } from '../../utils/utils'
import {
  SimpleCoverageTable,
  TableType,
} from '../simplecoveragetable/SimpleCoverageData'

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

  const totalLines = tableData?.map((data) => data.totalLines)
  const coveredLines = tableData?.map((data) => data.coveredLines)

  const forwardNavigation: { [keyof: string]: string } = {}
  tableData?.forEach((data) => {
    forwardNavigation[
      data.packageName
    ] = `/package-coverage/${id}/${data.packageName}`
  })

  return (
    <PackageCoverageContainer>
      <Typography variant="h2">Packages</Typography>
      <TotalCoverage totalLines={totalLines} coveredLines={coveredLines} />
      <div className="back-button-container">
        <Button
          startIcon={<ArrowBack />}
          sx={{ color: 'white' }}
          onClick={() => navigate('/')}
        >
          Back
        </Button>
      </div>
      {tableData ? (
        <SimpleCoverageTable
          tableType={TableType.PACKAGES}
          tableData={tableData}
          forwardNavigation={forwardNavigation}
        />
      ) : (
        <Typography>No package coverage found.</Typography>
      )}
    </PackageCoverageContainer>
  )
}
