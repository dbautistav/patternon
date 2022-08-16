import * as React from 'react'
import TrianglifyRenderer from 'components/renderers/trianglify'
import HorizontalBar from 'components/horizontalBar'
import GestureInteractionManager from 'components/interactionManager'

const Explorer = () => {
  return (
    <GestureInteractionManager>
      <HorizontalBar/>
      <TrianglifyRenderer/>
    </GestureInteractionManager>
  )
}

export default Explorer
