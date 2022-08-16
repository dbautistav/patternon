import * as React from 'react'
import { useContext } from 'react'
import * as d3 from 'd3'
import { ConfigContext } from 'modules/patternConfig/patternConfigContext'
import { BACKGROUND_HEIGHT, BACKGROUND_WIDTH } from 'modules/config/constants'

const HorizontalBar = () => {
  const { cellSize } = useContext(ConfigContext)

  const data = React.useMemo(() => [cellSize], [cellSize])

  const containerId = 'horizontal-bar-chart'

  const _cleanUp = (): void => {
    d3.selectAll(`svg#${containerId} > rect`).remove()
  }

  const _renderChart = (): void => {
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
      .attr('width', (d) => 3 * d)
      .attr('transform', (d, i) => {
        const translate = [0, barHeight * i]
        return `translate(${translate})`
      })
  }

  React.useEffect(() => {
    if (!data || data.length === 0) return

    _cleanUp()
    _renderChart()
  }, [data])

  return (
    <svg
      id={containerId}
      style={{
        position: 'absolute',
      }}
    />
  )
}

export default HorizontalBar
