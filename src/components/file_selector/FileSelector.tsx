import { useState } from 'react'
import { useAppDispatch } from '../../store/store'
import { createDirectory } from '../GoLens.actions'

export const FileSelector: React.FC = () => {
  const [path, setPath] = useState<string>()
  const dispatch = useAppDispatch()

  const callCreateDirectory = () => {
    console.log('hello')
    if (path) dispatch(createDirectory(path))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>Add path</div>
      <input onChange={(e) => setPath(e.target.value)} />
      <button onClick={callCreateDirectory}>Add</button>
    </div>
  )
}
