import * as React from 'react'
import { useContext } from 'react'
import trianglify from 'trianglify'
import { ConfigContext } from '../../../modules/patternConfig/patternConfigContext'

const TrianglifyRenderer = () => {
  const { cellSize } = useContext(ConfigContext)
  const [canvas, setCanvas] = React.useState<HTMLCanvasElement | null>(null)

  React.useEffect(() => {
    console.log('.. cellSize', cellSize)
    const pattern = trianglify({
      width: window.innerWidth,
      height: window.innerHeight,
      cellSize
    })
    pattern.toCanvas(canvas)
  }, [canvas, cellSize])

  return (
    <canvas
      width={window.innerWidth}
      height={window.innerHeight}
      ref={(canvasRef) => {
        setCanvas(canvasRef)
      }}
    />
  )
}

export default TrianglifyRenderer
