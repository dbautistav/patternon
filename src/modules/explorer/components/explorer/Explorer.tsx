import React, { ReactElement } from 'react'
import HorizontalBar from '../horizontalBar/HorizontalBar'
import useGestureManager from '../../hooks/useGestureManager'
import { Renderer } from '../../models'

const Explorer = ({ config, children }): ReactElement => {
  const {
    GestureManager,
    gestureState,
  } = useGestureManager()
  const [ChildComponent]: [Renderer] = children

  return (
    <GestureManager>
      <HorizontalBar config={config}/>
      <ChildComponent {...gestureState} />
    </GestureManager>
  )
}

export default Explorer
