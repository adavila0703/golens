import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import {
  createDirectory,
  deleteSelectedIds,
  findAndCreateDirectories,
  getGoProjects,
  updateDirectories,
} from '../GoLens.actions'
import Button from '@mui/material/Button'
import { SelectChangeEvent } from '@mui/material/Select'
import { getDataSelector } from '../GoLens.selector'
import { Add, Refresh, SelectAll, Deselect, Delete } from '@mui/icons-material'
import { ButtonContainer } from './TableBar.style'
import { useSnackbar } from 'notistack'
import { AddModal } from './modals/AddModal'
import { PathListModal } from './modals/PathListModal'

export enum TypeSelect {
  NONE,
  GET_GO_PROJECTS,
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
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [typeSelect, setTypeSelect] = useState<TypeSelect>(
    TypeSelect.GET_GO_PROJECTS
  )
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

  const [pathModalOpen, setPathModalOpen] = useState(false)
  const [pathData, setPathData] = useState<
    { Path: string; DirectoryName: string }[]
  >([])

  const goProjectsCallback = (resp: {
    paths: { Path: string; DirectoryName: string }[]
  }) => {
    const existingPaths =
      data?.map((d) => {
        return d.path
      }) || []

    setPathData(resp.paths.filter((path) => !existingPaths.includes(path.Path)))
    setPathModalOpen(true)
    setAddModalOpen(false)
  }

  const saveRepo = async () => {
    const validation = validateSelections()
    if (!validation) {
      return
    }

    switch (typeSelect) {
      case TypeSelect.GET_GO_PROJECTS:
        dispatch(getGoProjects(path, enqueueSnackbar, goProjectsCallback))
        break

      case TypeSelect.SINGLE_DIRECTORY:
        dispatch(createDirectory(path, enqueueSnackbar))
        break

      case TypeSelect.MULTI_DIRECTORY:
        dispatch(findAndCreateDirectories(path, enqueueSnackbar))
        break

      default:
        break
    }

    setAddModalOpen(false)
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
      onClick: () => setAddModalOpen(true),
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

  const handleCloseAddModal = () => {
    setAddModalOpen(false)
    setTypeSelect(TypeSelect.GET_GO_PROJECTS)
  }

  const handleClosePathListModal = () => {
    setPathModalOpen(false)
    setAddModalOpen(false)
    setTypeSelect(TypeSelect.GET_GO_PROJECTS)
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
      <AddModal
        open={addModalOpen}
        selectError={selectError}
        inputError={inputError}
        typeSelect={typeSelect}
        setPath={setPath}
        saveRepo={saveRepo}
        handleCloseMenu={handleCloseAddModal}
        handleChange={handleChange}
      />

      <PathListModal
        pathData={pathData}
        pathModalOpen={pathModalOpen}
        handleClosePathListModal={handleClosePathListModal}
      />
    </>
  )
}
