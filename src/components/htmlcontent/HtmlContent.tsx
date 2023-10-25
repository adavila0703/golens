import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { ArrowBack } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { htmlContentSelector } from './HtmlContent.selector'
import { getHtmlContent } from './HtmlContent.actions'
import { HtmlContentContainer } from './HtmlContent.style'
import { PageTitle } from '../pagetitle/PageTitle'

export const HtmlContent = () => {
  const { id, packageName, fileName } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const content = useAppSelector(htmlContentSelector)

  useEffect(() => {
    if (id && fileName && packageName) {
      dispatch(getHtmlContent(id, fileName))
    }
  }, [])

  return (
    <>
      <PageTitle title="Code Details" />
      <div className="back-button-container">
        <Button
          startIcon={<ArrowBack />}
          sx={{ color: 'white' }}
          onClick={() => navigate(`/package-coverage/${id}/${packageName}`)}
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
      <Typography sx={{ color: 'black' }}>
        <HtmlContentContainer dangerouslySetInnerHTML={{ __html: content }} />
      </Typography>
    </>
  )
}
