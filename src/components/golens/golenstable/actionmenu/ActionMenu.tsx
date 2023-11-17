import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import {
  ArrowDropDown,
  Refresh,
  Delete,
  DeleteForever,
} from '@mui/icons-material'
import { ButtonNameContainer, MenuItems } from './ActionMenu.style'
import { Tooltip } from '@mui/material'
import { useAppDispatch } from '../../../../store/store'
import {
  createIgnoredDirectory,
  deleteDirectory,
  updateDirectory,
} from '../../GoLens.actions'
import { useSnackbar } from 'notistack'
import { IgnoreType } from '../../../../utils/utils'

interface ActionMenuProps {
  id: string
  directoryName: string
}

enum ActionMenuOptions {
  REFRESH,
  DELETE,
  DELETE_FOREVER,
}

export const ActionMenu = ({ id, directoryName }: ActionMenuProps) => {
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(
    null
  )

  const open = Boolean(anchorElement)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorElement(null)
  }

  const handleButtonClick = (options: ActionMenuOptions) => {
    switch (options) {
      case ActionMenuOptions.REFRESH:
        dispatch(updateDirectory(id, enqueueSnackbar))
        enqueueSnackbar(`Refreshing ${directoryName}`)
        break

      case ActionMenuOptions.DELETE:
        dispatch(deleteDirectory(id))
        break

      case ActionMenuOptions.DELETE_FOREVER:
        dispatch(deleteDirectory(id))
        dispatch(
          createIgnoredDirectory(id, directoryName, IgnoreType.DirectoryType)
        )
        break

      default:
        break
    }

    handleClose()
  }

  return (
    <>
      <Button id="basic-button" onClick={handleClick}>
        <ArrowDropDown sx={{ fontSize: 50, color: 'white' }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorElement}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItems>
          <MenuItem
            onClick={() => handleButtonClick(ActionMenuOptions.REFRESH)}
          >
            <ButtonNameContainer>
              Refresh
              <Refresh />
            </ButtonNameContainer>
          </MenuItem>
          <MenuItem onClick={() => handleButtonClick(ActionMenuOptions.DELETE)}>
            <ButtonNameContainer>
              Delete
              <Delete />
            </ButtonNameContainer>
          </MenuItem>
          <MenuItem
            onClick={() => handleButtonClick(ActionMenuOptions.DELETE_FOREVER)}
          >
            <Tooltip title="Will ignore the directory in future pulls and refreshes">
              <ButtonNameContainer>
                Delete and Ignore
                <DeleteForever />
              </ButtonNameContainer>
            </Tooltip>
          </MenuItem>
        </MenuItems>
      </Menu>
    </>
  )
}
