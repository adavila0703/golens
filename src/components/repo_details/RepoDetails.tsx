import { useParams } from 'react-router-dom'

export const RepoDetails = () => {
  const { id } = useParams()
  return (
    <>
      <div>{id}</div>
      <div>hello</div>
    </>
  )
}
