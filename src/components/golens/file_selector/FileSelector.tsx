import { useState } from 'react'
import { useAppDispatch } from '../../../store/store'
import { createDirectory } from '../GoLens.actions'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import './FileSelector.css'

export const FileSelector: React.FC = () => {
  const [path, setPath] = useState<string>()
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const callCreateDirectory = () => {
    if (path) dispatch(createDirectory(path))
  }

  return (
    <>
      <div>
        <Button className="manage-repo-button" onClick={handleOpen} variant="outlined">
          Add Repos
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="file-selector-container">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
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
