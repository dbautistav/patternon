import React from 'react'
import { TrianglifyRenderer } from './renderers/trianglify'
import { Explorer } from '../modules/explorer'

const App = () => {
  const windowPadding = 10
  const backgroundHeight = window.innerHeight - windowPadding
  const backgroundWidth = window.innerWidth - windowPadding

  const config = { // FIXME: add its own type!!
    backgroundHeight,
    backgroundWidth
  }

  return (
    <Explorer config={config}>
      <TrianglifyRenderer config={config} />
    </Explorer>
  )
}

export default App
