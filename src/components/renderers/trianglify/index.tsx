import * as React from 'react'
import { useContext } from 'react'
import trianglify from 'trianglify'
import { BACKGROUND_HEIGHT, BACKGROUND_WIDTH } from '../../../modules/config/constants'
import { ConfigContext } from '../../../modules/patternConfig/patternConfigContext'

const TrianglifyRenderer = () => {
  const { cellSize } = useContext(ConfigContext)
  const [canvas, setCanvas] = React.useState<HTMLCanvasElement | null>(null)

  React.useEffect(() => {
    console.log('.. cellSize', cellSize)
    const pattern = trianglify({
      width: BACKGROUND_WIDTH,
      height: BACKGROUND_HEIGHT,
      cellSize
    })
    pattern.toCanvas(canvas)
  }, [canvas, cellSize])

  return (
    <canvas
      width={BACKGROUND_WIDTH}
      height={BACKGROUND_HEIGHT}
      ref={(canvasRef) => {
        setCanvas(canvasRef)
      }}
    />
  )
}

export default TrianglifyRenderer
