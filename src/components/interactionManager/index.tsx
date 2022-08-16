import React, {
  useEffect,
  useState
} from 'react'
import { useDrag } from '@use-gesture/react'
import { debounce } from 'lodash'
import * as d3 from 'd3'
import { BACKGROUND_WIDTH } from '@/modules/config/constants'
import { ConfigContext } from '@/modules/patternConfig/patternConfigContext'
import { COORDS } from './models'

const MIN_CELL_SIZE = 30
const MAX_CELL_SIZE = 80
const CELL_SIZE_INTERVAL = [MIN_CELL_SIZE, MAX_CELL_SIZE]
const SCREEN_INTERVAL = [0, BACKGROUND_WIDTH]

const px2CellSizeScale = d3.scaleLinear().domain(SCREEN_INTERVAL).range(CELL_SIZE_INTERVAL)
const cellSize2PxScale = d3.scaleLinear().domain(CELL_SIZE_INTERVAL).range(SCREEN_INTERVAL)

const GestureInteractionManager = (props) => {
  const [cellSize, setCellSize] = useState<number>(75)
  const [gestureState, setGestureState] = useState(null)

  useEffect(() => {
    const xAxisMovement = gestureState?.movement[COORDS.X]

    if (xAxisMovement) {
      setCellSize((currentCellSize) => {
        const deltaPx = Math.abs(xAxisMovement ?? 0)
        const updatedCellSize = // FIXME!!
          xAxisMovement < 0
            ? currentCellSize - px2CellSizeScale(deltaPx)
            : currentCellSize + px2CellSizeScale(deltaPx)
        return updatedCellSize > 0 ? updatedCellSize : MIN_CELL_SIZE / 2
      })
    }
  }, [gestureState])

  const debouncedGestureStateUpdater = debounce((state) => {
    setGestureState(state)
  }, 500)

  const bind = useDrag(debouncedGestureStateUpdater)

  const contextProviderValue = {
    cellSize,
    cellSize2PxScale,
    gestureState,
    px2CellSizeScale,
  }

  return (
    <ConfigContext.Provider value={contextProviderValue}>
      <div
        id="gestures-container"
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
        {props.children}
      </div>
    </ConfigContext.Provider>
  )
}

export default GestureInteractionManager
