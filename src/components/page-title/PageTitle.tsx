import { Typography } from '@mui/material'
import { PageTitleContainer } from './PageTitle.style'

export const PageTitle = ({ title }: { title: string }) => {
  return (
    <PageTitleContainer>
      <Typography variant="h2">{title}</Typography>
    </PageTitleContainer>
  )
}
