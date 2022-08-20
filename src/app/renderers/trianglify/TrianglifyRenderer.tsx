import * as React from 'react'
import { useContext } from 'react'
import trianglify from 'trianglify'
import { ConfigContext } from '../../../modules/explorer/hooks/patternConfigContext'

const TrianglifyRenderer = ({ config: { backgroundHeight, backgroundWidth } }) => {
  const { cellSize, variance } = useContext(ConfigContext)
  const [canvas, setCanvas] = React.useState<HTMLCanvasElement | null>(null)

  React.useEffect(() => {
    const pattern = trianglify({
      width: backgroundWidth,
      height: backgroundHeight,
      cellSize: Math.max(backgroundHeight, backgroundWidth) * (cellSize / 100),
      variance: variance / 100,
    })
    pattern.toCanvas(canvas)
  }, [
    backgroundHeight,
    backgroundWidth,
    canvas,
    cellSize,
    variance,
  ])

  return (
    <canvas
      width={backgroundWidth}
      height={backgroundHeight}
      ref={(canvasRef) => {
        setCanvas(canvasRef)
      }}
    />
  )
}

export default TrianglifyRenderer
