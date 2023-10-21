import {
  Table,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from '@mui/material'
import { TableName } from './SimpleCoverageData.style'
import { IPackageData } from '../packagecoverage/PackageCoverage.reducer'
import { IFileData } from '../filecoverage/FileCoverage.reducer'
import { getCoveragePercentage } from '../../utils/utils'
import { CoverageBar } from '../coveragebar/CoverageBar'
import { useNavigate } from 'react-router-dom'

export enum TableType {
  PACKAGES,
  FILES,
}

type TableDataTypes = IPackageData[] | IFileData[]
type DataTypes = IPackageData | IFileData

export interface ISimpleCoverageTableProps {
  tableType: TableType
  tableData: TableDataTypes
  forwardNavigation: { [keyof: string]: string }
}

export const SimpleCoverageTable = ({
  tableType,
  tableData,
  forwardNavigation,
}: ISimpleCoverageTableProps) => {
  const navigate = useNavigate()

  const forwardNavigate = (data: DataTypes) => {
    const key =
      tableType === TableType.PACKAGES
        ? (data as IPackageData).packageName
        : (data as IFileData).fileName

    const path = forwardNavigation[key]

    navigate(path)
  }

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <Typography>
                  {tableType === TableType.PACKAGES
                    ? 'Package Name'
                    : 'File Name'}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <TableName>
                  <Typography>Name</Typography>
                </TableName>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData &&
              tableData.map((data: DataTypes, index: number) => (
                <TableRow key={index}>
                  <TableCell
                    align="left"
                    onClick={() => forwardNavigate(data)}
                    sx={{
                      cursor: 'pointer',
                      ':hover': { color: 'white', backgroundColor: 'gray' },
                    }}
                  >
                    <Typography>
                      {tableType === TableType.PACKAGES
                        ? (data as IPackageData).packageName
                        : (data as IFileData).fileName}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <CoverageBar
                      coverage={getCoveragePercentage(
                        data.totalLines,
                        data.coveredLines
                      )}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
