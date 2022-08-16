import * as React from 'react'
import GestureInteractionManager from '../interactionManager'
import HorizontalBar from '../horizontalBar'
import TrianglifyRenderer from '../renderers/trianglify'

const Explorer = () => {
  return (
    <GestureInteractionManager>
      <HorizontalBar/>
      <TrianglifyRenderer/>
    </GestureInteractionManager>
  )
}

export default Explorer
