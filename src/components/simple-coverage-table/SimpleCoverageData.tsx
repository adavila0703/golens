import {
  Table,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  IconButton,
} from '@mui/material'
import { TableName } from './SimpleCoverageData.style'
import { IPackageData } from '../package-coverage/PackageCoverage.reducer'
import { IFileData } from '../file-coverage/FileCoverage.reducer'
import { IgnoreType, getCoveragePercentage } from '../../utils/utils'
import { CoverageBar } from '../coverage-bar/CoverageBar'
import { useNavigate, useParams } from 'react-router-dom'
import { DeleteForever } from '@mui/icons-material'
import { useAppDispatch } from '../../store/store'
import { createIgnoredDirectory } from '../golens/GoLens.actions'

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
  const dispatch = useAppDispatch()
  const params = useParams()

  const forwardNavigate = (data: DataTypes) => {
    const key =
      tableType === TableType.PACKAGES
        ? (data as IPackageData).packageName
        : (data as IFileData).fileName

    const path = forwardNavigation[key]

    navigate(path)
  }

  const handleIgnoreClick = (data: DataTypes) => {
    switch (tableType) {
      case TableType.PACKAGES: {
        const name = (data as IPackageData).packageName
        if (params.id) {
          dispatch(
            createIgnoredDirectory(params.id, name, IgnoreType.PackageType)
          )
        }
        break
      }

      case TableType.FILES: {
        const name = `${params.packageName}/${(data as IFileData).fileName}`
        if (params.id) {
          dispatch(createIgnoredDirectory(params.id, name, IgnoreType.FileType))
        }
        break
      }
    }
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
              <TableCell align="left">
                <TableName>
                  <Typography>
                    Ignore{' '}
                    {tableType === TableType.PACKAGES ? 'Package' : 'File'}
                  </Typography>
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
                  <TableCell align="left">
                    <IconButton onClick={() => handleIgnoreClick(data)}>
                      <DeleteForever sx={{ color: 'white' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
