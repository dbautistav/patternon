import React from 'react'
import GestureInteractionManager from '../interactionManager/GestureInteractionManager'
import HorizontalBar from '../horizontalBar/HorizontalBar'

const Explorer = ({ config, children }) => {
  return (
    <GestureInteractionManager
      config={config}
    >
      <HorizontalBar
        config={config}
      />
      {children}
    </GestureInteractionManager>
  )
}

export default Explorer
