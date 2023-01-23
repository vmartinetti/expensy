import React from 'react'
import { CircularProgress, Backdrop } from '@mui/material'

const FullPageSpinner = () => {
  
    return (
      <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
      )
}

const FullPageErrorFallback = ({error}) => {
  return (
    <div
      role="alert"
      css={{
        color: 'red',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  )
}

export {FullPageSpinner, FullPageErrorFallback}