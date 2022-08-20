import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useDrag } from '@use-gesture/react'
import { debounce, throttle } from 'lodash'
import * as d3 from 'd3'
import { ConfigContext } from '../../hooks/patternConfigContext'
import { COORDS } from './models'

const MIN_CELL_SIZE = 2
const MAX_CELL_SIZE = 25

const MIN_VARIANCE = 0
const MAX_VARIANCE = 100

const GestureInteractionManager = ({ config, children }) => {
  const [cellSize, setCellSize] = useState<number>(7)
  const [variance, setVariance] = useState<number>(30)
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
        let updatedCellSize =
          xAxisMovement < 0
            ? currentCellSize - 1
            : currentCellSize + 1
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
  ])

  useEffect(() => {
    const yAxisMovement = gestureState?.movement[COORDS.Y]

    if (yAxisMovement) {
      setVariance((currentVariance) => {
        let updatedVariance =
          yAxisMovement < 0
            ? currentVariance - 1
            : currentVariance + 1
        if (updatedVariance < MIN_VARIANCE) {
          updatedVariance = MIN_VARIANCE
        }
        if (updatedVariance > MAX_VARIANCE) {
          updatedVariance = MAX_VARIANCE
        }
        return updatedVariance
      })
    }
  }, [
    gestureState,
  ])

  const debouncedGestureStateUpdater = useCallback(throttle((state) => {
    setGestureState(state)
  }, 200), [setGestureState])

  const bind = useDrag(debouncedGestureStateUpdater)

  const contextProviderValue = {
    cellSize,
    cellSize2PxScale,
    gestureState,
    px2CellSizeScale,
    variance,
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
