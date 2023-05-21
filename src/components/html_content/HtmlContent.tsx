import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getBarColor } from '../../utils/utils'

import { ArrowBack } from '@mui/icons-material'
import { Button } from '@mui/material'
import { htmlContentSelector } from './HtmlContent.selector'
import { getHtmlContent } from './HtmlContent.actions'

export const HtmlContent = () => {
  const { id, packageName, fileName } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const content = useAppSelector(htmlContentSelector)

  console.log(content)

  useEffect(() => {
    if (id && fileName) {
      dispatch(getHtmlContent(id, fileName))
    }
  }, [])

  return <div dangerouslySetInnerHTML={{ __html: content }} />
}
