import * as React from 'react'
import TrianglifyRenderer from '../renderers/trianglify'
import HorizontalBar from '../horizontalBar'
import GestureInteractionManager from '../interactionManager'

const Explorer = () => {
  return (
    <GestureInteractionManager>
      <HorizontalBar/>
      <TrianglifyRenderer/>
    </GestureInteractionManager>
  )
}

export default Explorer
