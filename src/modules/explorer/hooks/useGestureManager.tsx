import React, {
  ReactElement,
  useState
} from 'react'
import { useDrag } from '@use-gesture/react'
import { debounce } from 'lodash'

const useGestureManager = () => {
  const [gestureState, setGestureState] = useState(null)

  const GestureManager = ({ children }): ReactElement => {
    const debouncedGestureStateUpdater = debounce((state) =>  setGestureState(state), 500)
    const bind = useDrag(debouncedGestureStateUpdater)

    return (
      <div
        id='gestures-container'
        style={{
          margin: '3px',

          // It is recommended to add `touch-action: 'none'` so that the drag gesture behaves correctly on touch-enabled devices.
          // For more information read this: https://use-gesture.netlify.app/docs/extras/#touch-action.
          touchAction: 'none'
        }}
        {// @ts-ignore
          ...bind()
        }
      >
        {children}
      </div>
    )
  }

  return {
    GestureManager,
    gestureState,
  }
}

export default useGestureManager
