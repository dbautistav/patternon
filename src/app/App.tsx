import React, { ReactElement } from 'react'
import Renderer from './renderers/Renderer'
import {
  Explorer,
  ExplorerConfig
} from '../modules/explorer'

const App = (): ReactElement => {
  const windowPadding = 10
  const backgroundHeight = window.innerHeight - windowPadding
  const backgroundWidth = window.innerWidth - windowPadding

  const config: ExplorerConfig = {
    backgroundHeight,
    backgroundWidth
  }

  return (
    <Explorer config={config}>
      <Renderer config={config}/>
    </Explorer>
  )
}

export default App
