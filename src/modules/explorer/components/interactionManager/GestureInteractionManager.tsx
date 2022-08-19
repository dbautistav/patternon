import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useDrag } from '@use-gesture/react'
import { debounce } from 'lodash'
import * as d3 from 'd3'
import { ConfigContext } from '../../hooks/patternConfigContext'
import { COORDS } from './models'

const MIN_CELL_SIZE = 30
const MAX_CELL_SIZE = 1003

const GestureInteractionManager = ({ config, children }) => {
  const [cellSize, setCellSize] = useState<number>(75)
  const [gestureState, setGestureState] = useState(null)

  const SCREEN_INTERVAL = useMemo(() => [0, config.backgroundWidth], [config.backgroundWidth])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const px2CellSizeScale = useCallback(
    d3.scaleLinear().domain(SCREEN_INTERVAL).range([MIN_CELL_SIZE, MAX_CELL_SIZE / 2]), [
    SCREEN_INTERVAL
  ])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cellSize2PxScale = useCallback(
    d3.scaleLinear().domain([MIN_CELL_SIZE, MAX_CELL_SIZE]).range(SCREEN_INTERVAL), [
    SCREEN_INTERVAL
  ])

  useEffect(() => {
    const xAxisMovement = gestureState?.movement[COORDS.X]

    if (xAxisMovement) {
      setCellSize((currentCellSize) => {
        const deltaPx = Math.abs(xAxisMovement)
        let updatedCellSize =
          xAxisMovement < 0
            ? currentCellSize - px2CellSizeScale(deltaPx)
            : currentCellSize + px2CellSizeScale(deltaPx)
        if (updatedCellSize < MIN_CELL_SIZE) {
          updatedCellSize = MIN_CELL_SIZE
        }
        if (updatedCellSize > MAX_CELL_SIZE) {
          updatedCellSize = MAX_CELL_SIZE
        }
        return updatedCellSize
      })
    }
  }, [
    gestureState,
    px2CellSizeScale
  ])

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
    </ConfigContext.Provider>
  )
}

export default GestureInteractionManager
