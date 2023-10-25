import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { getTableData } from '../GoLens.actions'
import { getDataSelector } from '../GoLens.selector'
import { useNavigate } from 'react-router-dom'
import { CoverageBar } from '../../coveragebar/CoverageBar'
import {
  Table,
  Checkbox,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from '@mui/material'
import { TableCoverage, TableName } from './GoLensTable.style'
import { ActionMenu } from './actionmenu/ActionMenu'
import { getCoveragePercentage } from '../../../utils/utils'

interface GoLensTableProps {
  selectedIds: string[]
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>
}

export const GoLensTable = ({
  selectedIds,
  setSelectedIds,
}: GoLensTableProps) => {
  const dispatch = useAppDispatch()
  const tableData = useAppSelector(getDataSelector)
  // const selectedIds = useAppSelector(getSelectedIdsSelector)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getTableData())
  }, [])

  const onSelect = (id: string, checked: boolean) => {
    // let newRepoIds: string[] = []
    if (checked) {
      setSelectedIds([...selectedIds, id])
    } else {
      const newSelectedIds = selectedIds.filter((repoId) => repoId != id)
      setSelectedIds(newSelectedIds)
    }
    // dispatch(setSelectedIds(newRepoIds))
  }

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <Typography>Select</Typography>
              </TableCell>
              <TableCell align="left">
                <TableName>
                  <Typography>Name</Typography>
                </TableName>
              </TableCell>
              <TableCell align="left">
                <TableCoverage>
                  <Typography>Coverage</Typography>
                </TableCoverage>
              </TableCell>
              <TableCell align="left">
                <Typography>Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData &&
              tableData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell align="left">
                    <Checkbox
                      sx={{ color: 'white' }}
                      color="default"
                      onChange={(_, checked) => onSelect(data.id, checked)}
                      checked={selectedIds.includes(data.id)}
                    />
                  </TableCell>
                  <TableCell
                    align="left"
                    onClick={() => navigate(`/package-coverage/${data.id}`)}
                    sx={{
                      cursor: 'pointer',
                      ':hover': { color: 'white', backgroundColor: 'gray' },
                    }}
                  >
                    <Typography>{data.coverageName}</Typography>
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
                    <ActionMenu
                      id={data.id}
                      directoryName={data.coverageName}
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
