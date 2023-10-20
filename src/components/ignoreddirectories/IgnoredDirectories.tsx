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
import { deleteIgnoredDirectory } from './IgnoredDirectories.actions'
import { PageTitle } from '../pagetitle/PageTitle'

export const IgnoredDirectories = () => {
  const ignoredDirectories = useAppSelector(ignoredDirectoriesSelector)
  const dispatch = useAppDispatch()

  return (
    <>
      <PageTitle title="Ignored Directories" />
      <TableContainer>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>Directory Name</Typography>
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
                    <Typography>{directory.DirectoryName}</Typography>
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
