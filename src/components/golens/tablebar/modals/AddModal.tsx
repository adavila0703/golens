import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { TextField, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import { ModalBoxContainer, ModalContent } from '../TableBar.style'
import { TypeSelect } from '../TableBar'

interface AddModelProps {
  open: boolean
  selectError: boolean
  inputError: boolean
  typeSelect: TypeSelect
  setPath: React.Dispatch<React.SetStateAction<string>>
  saveRepo: () => void
  handleCloseMenu: () => void
  handleChange: (event: SelectChangeEvent) => void
}

export const AddModal = ({
  open,
  selectError,
  inputError,
  typeSelect,
  setPath,
  saveRepo,
  handleCloseMenu,
  handleChange,
}: AddModelProps) => {
  const typeMessage = (typeSelect: TypeSelect) => {
    switch (typeSelect) {
      case TypeSelect.GET_GO_PROJECTS:
        return 'This option will find all go projects and prompt you to select which ones you want to track.'
      case TypeSelect.SINGLE_DIRECTORY:
        return 'Adds a single directory to track.'
      case TypeSelect.MULTI_DIRECTORY:
        return 'Walks your directory for all go projects and immediately adds them.'
    }
  }
  return (
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
              value={typeSelect.toString()}
              sx={{
                color: 'black',
                borderColor: 'white',
                backgroundColor: 'white',
              }}
              error={selectError}
            >
              <MenuItem value={TypeSelect.GET_GO_PROJECTS}>
                Find Go Projects
              </MenuItem>
              <MenuItem value={TypeSelect.SINGLE_DIRECTORY}>
                Single Directory
              </MenuItem>
              <MenuItem value={TypeSelect.MULTI_DIRECTORY}>
                Multi Directory
              </MenuItem>
            </Select>
          </FormControl>

          <Typography
            sx={{
              color: 'white',
            }}
          >
            {typeMessage(typeSelect)}
          </Typography>

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
            {typeSelect === TypeSelect.GET_GO_PROJECTS ? 'Find' : 'Save'}
          </Button>
        </ModalContent>
      </ModalBoxContainer>
    </Modal>
  )
}
