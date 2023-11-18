import { useEffect } from 'react'
import {
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { Delete } from '@mui/icons-material'
import { ignoredSelector } from './Ignored.selector'
import { deleteIgnored, getIgnored } from './Ignored.actions'
import { PageTitle } from '../page-title/PageTitle'
import { IgnoreType } from '../../utils/utils'

export const Ignored = () => {
  const ignoredData = useAppSelector(ignoredSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getIgnored())
  }, [])

  const getIgnoredType = (ignoredType: number) => {
    switch (ignoredType.toString()) {
      case IgnoreType.DirectoryType:
        return 'Directory'
      case IgnoreType.FileType:
        return 'File'
      case IgnoreType.PackageType:
        return 'Package'
      case IgnoreType.PathType:
        return 'Path'
    }
  }

  return (
    <>
      <PageTitle title="Ignored" />
      <TableContainer>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>Type</Typography>
            </TableCell>
            <TableCell>
              <Typography>Directory</Typography>
            </TableCell>

            <TableCell>
              <Typography>Name</Typography>
            </TableCell>
            <TableCell>
              <Typography>Delete</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ignoredData &&
            ignoredData.map((directory, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Typography>{getIgnoredType(directory.Type)}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{directory.DirectoryName}</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography>{directory.Name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => dispatch(deleteIgnored(directory.ID))}
                    >
                      <Delete />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </TableContainer>
    </>
  )
}
