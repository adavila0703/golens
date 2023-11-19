import { useState } from 'react'
import { TransferModalBoxContainer } from '../TableBar.style'
import {
  Box,
  Button,
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  Typography,
} from '@mui/material'
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import { useAppDispatch } from '../../../../store/store'
import { createDirectories, tableLoading } from '../../GoLens.actions'
import { useSnackbar } from 'notistack'
import { Close } from '@mui/icons-material'

interface PathListModalProps {
  pathData: { Path: string; DirectoryName: string }[]
  pathModalOpen: boolean
  handleClosePathListModal: () => void
}

export const PathListModal = ({
  pathData,
  pathModalOpen,
  handleClosePathListModal,
}: PathListModalProps) => {
  const [selectedPaths, setSelectedPaths] = useState<string[]>([])

  const onSelect = (path: string, checked: boolean) => {
    if (checked) {
      setSelectedPaths([...selectedPaths, path])
    } else {
      const newSelectedIds = selectedPaths.filter(
        (selectedPath) => path !== selectedPath
      )
      setSelectedPaths(newSelectedIds)
    }
  }

  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const saveDirectories = () => {
    dispatch(createDirectories(selectedPaths, enqueueSnackbar))
    handleClosePathListModal()
  }

  function renderRow(props: ListChildComponentProps) {
    const { index, style, data } = props

    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <Checkbox
          sx={{ color: 'white' }}
          color="default"
          onChange={(_, checked) => onSelect(data[index]?.Path, checked)}
          checked={selectedPaths.includes(data[index]?.Path)}
        />
        <ListItemButton>
          <ListItemText primary={data[index]?.DirectoryName} />
        </ListItemButton>
      </ListItem>
    )
  }
  return (
    <Modal
      open={pathModalOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <TransferModalBoxContainer>
        <Box
          sx={{
            height: 400,
            maxWidth: 360,
          }}
        >
          <Button
            onClick={() => {
              handleClosePathListModal()
              dispatch(tableLoading(false))
            }}
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
          <Typography variant="h6">Select Go Directories</Typography>
          <FixedSizeList
            height={250}
            width={360}
            itemSize={40}
            itemCount={pathData.length}
            overscanCount={5}
            style={{ color: 'white' }}
            itemData={pathData}
          >
            {renderRow}
          </FixedSizeList>
        </Box>
        <Button
          className="manage-repo-button"
          onClick={saveDirectories}
          variant="outlined"
          sx={{ color: 'white', borderColor: 'white' }}
        >
          Save
        </Button>
      </TransferModalBoxContainer>
    </Modal>
  )
}
