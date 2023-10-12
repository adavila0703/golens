import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import {
  createDirectories,
  createDirectory,
  deleteSelectedIds,
  selectAllIds,
  updateDirectories,
} from '../GoLens.actions'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import './TableBar.css'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { TextField } from '@mui/material'
import {
  getSelectedIdsSelector,
  isAllSelectedSelector,
} from '../GoLens.selector'
import { Add, Refresh, SelectAll, Deselect, Delete } from '@mui/icons-material'
import { ButtonContainer } from './TableBar.style'

enum TypeSelect {
  NONE,
  SINGLE_REPO,
  MULTI_REPO,
}

export const TableBar: React.FC = () => {
  const dispatch = useAppDispatch()
  const isAllSelected = useAppSelector(isAllSelectedSelector)
  const selectedIds = useAppSelector(getSelectedIdsSelector)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [path, setPath] = useState<string>()
  const [open, setOpen] = useState(false)
  const [typeSelect, setTypeSelect] = useState<TypeSelect>(TypeSelect.NONE)
  const [inputError, setInputError] = useState(false)
  const [selectError, setSelectError] = useState(false)

  const validateSelections = () => {
    if (!path || typeSelect == TypeSelect.NONE) {
      if (!path) {
        setInputError(true)
      }

      if (typeSelect == TypeSelect.NONE) {
        setSelectError(true)
      }

      return false
    }

    return true
  }

  const saveRepo = () => {
    const validation = validateSelections()
    if (!validation) {
      return
    }

    switch (typeSelect) {
      case TypeSelect.SINGLE_REPO:
        if (path) {
          dispatch(createDirectory(path))
        }
        break

      case TypeSelect.MULTI_REPO:
        if (path) {
          dispatch(createDirectories(path))
        }
        break

      default:
        break
    }

    handleClose()
  }

  const handleChange = (event: SelectChangeEvent) => {
    const selectionType: TypeSelect = Number(event.target.value) as TypeSelect
    setTypeSelect(selectionType)
  }

  const handleSelectAll = () => {
    dispatch(selectAllIds())
  }

  const handleDeleteSelectedIds = () => {
    dispatch(deleteSelectedIds())
  }

  const handleUpdateSelectedIds = () => {
    dispatch(updateDirectories())
  }

  return (
    <>
      <ButtonContainer>
        <Button
          className="manage-repo-button"
          onClick={handleOpen}
          variant="outlined"
          style={{ color: 'white', borderColor: 'white' }}
          endIcon={<Add />}
        >
          Add Repos
        </Button>
        <Button
          className="manage-repo-button"
          onClick={() => console.log('refresh')}
          variant="outlined"
          style={{ color: 'white', borderColor: 'white' }}
          endIcon={<Refresh />}
        >
          Refresh All
        </Button>
        <Button
          className="manage-repo-button"
          onClick={handleSelectAll}
          variant="outlined"
          style={{ color: 'white', borderColor: 'white' }}
          endIcon={isAllSelected ? <Deselect /> : <SelectAll />}
        >
          {isAllSelected ? 'Deselect All' : 'Select All'}
        </Button>
        <div className="selected-buttons">
          {selectedIds.length > 0 && (
            <>
              <Button
                className="manage-repo-button"
                onClick={handleDeleteSelectedIds}
                variant="outlined"
                style={{ color: 'white', borderColor: 'white' }}
                endIcon={<Delete />}
                fullWidth
              >
                Delete Selected
              </Button>
              <Button
                className="manage-repo-button"
                onClick={handleUpdateSelectedIds}
                variant="outlined"
                style={{ color: 'white', borderColor: 'white' }}
                endIcon={<Refresh />}
                fullWidth
              >
                Refresh Selected
              </Button>
            </>
          )}
        </div>
      </ButtonContainer>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="file-selector-container">
            <div className="add-repo-title">Add Repo</div>
            <FormControl
              fullWidth
              style={{ backgroundColor: 'white', padding: 1, width: '50%' }}
            >
              <InputLabel id="directory-type-label" style={{ color: 'black' }}>
                Type
              </InputLabel>
              <Select
                labelId="directory-type-label"
                id="directory-type"
                label="Type"
                onChange={handleChange}
                style={{
                  color: 'black',
                  borderColor: 'white',
                  backgroundColor: 'white',
                }}
                error={selectError}
              >
                <MenuItem value={TypeSelect.SINGLE_REPO}>Single Repo</MenuItem>
                <MenuItem value={TypeSelect.MULTI_REPO}>Multi Repo</MenuItem>
              </Select>
            </FormControl>
            {typeSelect == TypeSelect.MULTI_REPO && (
              <div className="warning-text">
                Note: This will walk the given directory and search for any Go
                projects to add.
              </div>
            )}
            <div className="input-and-buttons">
              <TextField
                id="outlined-basic"
                label="Enter path"
                variant="outlined"
                fullWidth
                onChange={(e) => setPath(e.target.value)}
                error={inputError}
              />
              <Button
                className="manage-repo-button"
                onClick={saveRepo}
                variant="outlined"
                style={{ color: 'black', borderColor: 'black' }}
              >
                Save
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  )
}
