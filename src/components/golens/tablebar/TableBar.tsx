import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import {
  createDirectories,
  createDirectory,
  deleteSelectedIds,
  updateDirectories,
} from '../GoLens.actions'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { TextField, Typography } from '@mui/material'
import { getDataSelector } from '../GoLens.selector'
import {
  Add,
  Refresh,
  SelectAll,
  Deselect,
  Delete,
  Close,
} from '@mui/icons-material'
import {
  ButtonContainer,
  ModalBoxContainer,
  ModalContent,
} from './TableBar.style'
import { useSnackbar } from 'notistack'

enum TypeSelect {
  NONE,
  SINGLE_DIRECTORY,
  MULTI_DIRECTORY,
}

interface TableBarProps {
  selectedIds: string[]
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>
}

export const TableBar = ({ selectedIds, setSelectedIds }: TableBarProps) => {
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const data = useAppSelector(getDataSelector)

  const [path, setPath] = useState<string>('')
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
      case TypeSelect.SINGLE_DIRECTORY:
        dispatch(createDirectory(path, enqueueSnackbar))
        break

      case TypeSelect.MULTI_DIRECTORY:
        dispatch(createDirectories(path, enqueueSnackbar))
        break

      default:
        break
    }

    setOpen(false)
  }

  const handleChange = (event: SelectChangeEvent) => {
    const selectionType: TypeSelect = Number(event.target.value) as TypeSelect
    setTypeSelect(selectionType)
  }

  const selectAll = () => {
    if (selectedIds.length) {
      setSelectedIds([])
      return
    }

    const ids = data.map((d) => d.id)
    setSelectedIds(ids)
  }

  const buttons = [
    {
      text: 'Add Repos',
      endIcon: <Add />,
      onClick: () => setOpen(true),
      selectedButtons: false,
    },
    {
      text: selectedIds.length ? 'Deselect All' : 'Select All',
      endIcon: selectedIds.length ? <Deselect /> : <SelectAll />,
      onClick: selectAll,
      selectedButtons: false,
    },
    {
      text: 'Delete Selected',
      endIcon: <Delete />,
      onClick: () => {
        dispatch(deleteSelectedIds(selectedIds))
        selectAll()
      },
      selectedButtons: true,
    },
    {
      text: 'Refresh Selected',
      endIcon: <Refresh />,
      onClick: () => {
        dispatch(updateDirectories(selectedIds, enqueueSnackbar))
        setSelectedIds([])
      },
      selectedButtons: true,
    },
  ]

  const handleCloseMenu = () => {
    setOpen(false)
    setTypeSelect(TypeSelect.NONE)
  }

  return (
    <>
      <ButtonContainer>
        {buttons.map((button, index) => {
          if (
            !button.selectedButtons ||
            (button.selectedButtons && selectedIds.length > 0)
          ) {
            return (
              <Button
                key={index}
                onClick={button.onClick}
                variant="outlined"
                endIcon={button.endIcon}
              >
                {button.text}
              </Button>
            )
          }
        })}
      </ButtonContainer>
      <div>
        <Modal
          open={open}
          onClose={handleCloseMenu}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ModalBoxContainer>
            <ModalContent>
              <Button
                onClick={handleCloseMenu}
                sx={{
                  color: 'white',
                  width: 10,
                  right: 10,
                  top: 10,
                  position: 'absolute',
                }}
              >
                <Close />
              </Button>
              <Typography variant="h5">Add Repo</Typography>
              <FormControl style={{ backgroundColor: 'white' }}>
                <InputLabel id="directory-type-label" sx={{ color: 'black' }}>
                  Type
                </InputLabel>
                <Select
                  labelId="directory-type-label"
                  id="directory-type"
                  label="Type"
                  onChange={handleChange}
                  value={typeSelect === TypeSelect.SINGLE_DIRECTORY ? '1' : '2'}
                  sx={{
                    color: 'black',
                    borderColor: 'white',
                    backgroundColor: 'white',
                  }}
                  error={selectError}
                >
                  <MenuItem value={TypeSelect.SINGLE_DIRECTORY}>
                    Single Directory
                  </MenuItem>
                  <MenuItem value={TypeSelect.MULTI_DIRECTORY}>
                    Multi Directory
                  </MenuItem>
                </Select>
              </FormControl>

              <TextField
                id="outlined-basic"
                label="Enter path"
                variant="outlined"
                onChange={(e) => setPath(e.target.value)}
                error={inputError}
                sx={{
                  color: 'black',
                  borderColor: 'white',
                  backgroundColor: 'white',
                }}
              />
              <Button
                className="manage-repo-button"
                onClick={saveRepo}
                variant="outlined"
                sx={{ color: 'white', borderColor: 'white' }}
              >
                Save
              </Button>
              {typeSelect == TypeSelect.MULTI_DIRECTORY && (
                <Typography
                  sx={{
                    color: 'red',
                    fontWeight: 'bold',
                    backgroundColor: 'black',
                  }}
                >
                  Note: This will walk the given directory and search for any Go
                  projects to add.
                </Typography>
              )}
            </ModalContent>
          </ModalBoxContainer>
        </Modal>
      </div>
    </>
  )
}
