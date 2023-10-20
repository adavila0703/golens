import {
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { ignoredDirectoriesSelector } from '../Settings.selector'
import { Delete } from '@mui/icons-material'
import { deleteIgnoredDirectory } from '../Settings.actions'

export const IgnoredDirectories = () => {
  const ignoredDirectories = useAppSelector(ignoredDirectoriesSelector)
  const dispatch = useAppDispatch()

  return (
    <>
      <Typography variant="h3">Ignored Directories</Typography>
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
