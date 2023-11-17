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
import { ignoredDirectoriesSelector } from './IgnoredDirectories.selector'
import {
  deleteIgnoredDirectory,
  getIgnoredDirectories,
} from './IgnoredDirectories.actions'
import { PageTitle } from '../pagetitle/PageTitle'
import { IgnoreType } from '../../utils/utils'

export const IgnoredDirectories = () => {
  const ignoredDirectories = useAppSelector(ignoredDirectoriesSelector)
  const dispatch = useAppDispatch()

  console.log(ignoredDirectories)

  useEffect(() => {
    dispatch(getIgnoredDirectories())
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
          {ignoredDirectories &&
            ignoredDirectories.map((directory, index) => {
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
                      onClick={() =>
                        dispatch(deleteIgnoredDirectory(directory.ID))
                      }
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
