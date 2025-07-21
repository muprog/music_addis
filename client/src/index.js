import React from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@emotion/react'
import theme from '../theme'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './app/store'

const root = createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
)
