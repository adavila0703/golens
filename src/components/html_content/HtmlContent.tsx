import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { ArrowBack } from '@mui/icons-material'
import { Button } from '@mui/material'
import { htmlContentSelector, lineCountSelector } from './HtmlContent.selector'
import { getHtmlContent } from './HtmlContent.actions'
import './HtmlContent.css'

export const HtmlContent = () => {
  const { id, packageName, fileName } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const content = useAppSelector(htmlContentSelector)
  const lineCount = useAppSelector(lineCountSelector)
  const lineCountArray = []

  for (let index = 1; index < lineCount + 1; index++) {
    lineCountArray.push(index)
  }

  useEffect(() => {
    if (id && fileName && packageName) {
      dispatch(getHtmlContent(id, fileName))
    }
  }, [])

  return (
    <>
      <div className="back-button-container">
        <Button
          startIcon={<ArrowBack />}
          sx={{ color: 'white' }}
          onClick={() => navigate(`/repo-details/${id}/${packageName}`)}
        >
          Back
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 25,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'rgb(20, 236, 155)',
              width: '25px',
              height: '15px',
            }}
          ></div>
          <div>Covered</div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'rgb(192, 0, 0)',
              width: '25px',
              height: '15px',
            }}
          ></div>
          <div>Not Covered</div>
        </div>
      </div>
      <div className="code-container">
        <div className="line-count">
          {lineCountArray.map((number) => {
            return (
              <>
                <div>{number}</div>
              </>
            )
          })}
        </div>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </>
  )
}
