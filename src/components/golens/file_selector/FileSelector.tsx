import { useState } from 'react'
import { useAppDispatch } from '../../../store/store'
import { createDirectory } from '../GoLens.actions'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import './FileSelector.css'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'

export const FileSelector: React.FC = () => {
  const [path, setPath] = useState<string>()
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const callCreateDirectory = () => {
    if (path) dispatch(createDirectory(path))
  }

  const [age, setAge] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string)
  }

  return (
    <>
      <div>
        <Button
          className="manage-repo-button"
          onClick={handleOpen}
          variant="outlined"
          style={{ color: 'white', borderColor: 'white' }}
        >
          Add Repos
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="file-selector-container" width="100px">
            <Typography id="modal-modal-title" variant="h5" component="h1">
              Add Repo
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Select type
            </Typography>
            <FormControl fullWidth style={{ backgroundColor: 'white', padding: 1, width: '50%' }}>
              <InputLabel id="demo-simple-select-label" style={{ color: 'black' }}>
                Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Type"
                onChange={handleChange}
                style={{ color: 'black', borderColor: 'white', backgroundColor: 'white' }}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Modal>
      </div>
    </>
  )

  // return (
  //   <div style={{ display: 'flex', flexDirection: 'column' }}>
  //     <div>Add path</div>
  //     <input onChange={(e) => setPath(e.target.value)} />
  //     <button onClick={callCreateDirectory}>Add</button>
  //   </div>
  // )
}
