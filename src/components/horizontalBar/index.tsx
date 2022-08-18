import * as React from 'react'
import {
  useCallback,
  useContext
} from 'react'
import * as d3 from 'd3'
import { BACKGROUND_HEIGHT, BACKGROUND_WIDTH } from '../../modules/config/constants'
import { ConfigContext } from '../../modules/patternConfig/patternConfigContext'

const HorizontalBar = () => {
  const { cellSize, cellSize2PxScale } = useContext(ConfigContext)

  const data = React.useMemo(() => [cellSize], [cellSize])

  const containerId = 'horizontal-bar-chart'

  const _cleanUp = (): void => {
    d3.selectAll(`svg#${containerId} > rect`).remove()
  }

  const _renderChart = useCallback((): void => {
    const svgWidth = BACKGROUND_WIDTH
    const svgHeight = BACKGROUND_HEIGHT / 30

    const svg = d3
      .select('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .attr('class', 'horizontal-bar')

    const barPadding = 3
    const barHeight = svgHeight / data.length

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('height', barHeight - barPadding)
      .attr('width', (d) => cellSize2PxScale(d))
      .attr('transform', (d, i) => {
        const translate = [0, barHeight * i]
        return `translate(${translate})`
      })
  }, [
    data,
    cellSize2PxScale
  ])

  React.useEffect(() => {
    if (!data || data.length === 0) return

    _cleanUp()
    _renderChart()
  }, [
    data,
    _renderChart
  ])

  return (
    <div>
      <svg
        id={containerId}
        style={{
          position: 'absolute'
        }}
      />
      <span
        style={{
          position: 'absolute',
          right: '20px',
          top: '35px'
        }}
      >
        {cellSize}
      </span>
    </div>
  )
}

export default HorizontalBar
