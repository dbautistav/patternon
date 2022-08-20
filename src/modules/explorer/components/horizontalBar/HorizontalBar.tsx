import {ReactElement} from 'react'
const HorizontalBar = (config): ReactElement => {
  return null
}
export default HorizontalBar

// FIXME!!

// import React, {
//   ReactElement,
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
// } from 'react'
// import * as d3 from 'd3'
//
// const HorizontalBar = ({ config: { backgroundHeight, backgroundWidth } }): ReactElement => {
//   const { cellSize, cellSize2PxScale } = useContext(ExplorerContext)
//
//   const data = useMemo(() => [cellSize], [cellSize])
//
//   const containerId = 'horizontal-bar-chart'
//
//   const _cleanUp = (): void => {
//     d3.selectAll(`svg#${containerId} > rect`).remove()
//   }
//
//   const _renderChart = useCallback((): void => {
//     const svgWidth = backgroundWidth
//     const svgHeight = backgroundHeight / 30
//
//     const svg = d3
//       .select('svg')
//       .attr('width', svgWidth)
//       .attr('height', svgHeight)
//       .attr('class', 'horizontal-bar')
//
//     const barPadding = 3
//     const barHeight = svgHeight / data.length
//
//     svg
//       .selectAll('rect')
//       .data(data)
//       .enter()
//       .append('rect')
//       .attr('height', barHeight - barPadding)
//       .attr('width', cellSize2PxScale)
//       .attr('transform', (d, i) => {
//         const translate = [0, barHeight * i]
//         return `translate(${translate})`
//       })
//   }, [
//     backgroundHeight,
//     backgroundWidth,
//     cellSize2PxScale,
//     data
//   ])
//
//   useEffect(() => {
//     if (!data || data.length === 0) return
//
//     _cleanUp()
//     _renderChart()
//   }, [
//     data,
//     _renderChart
//   ])
//
//   return (
//     <div>
//       <svg
//         id={containerId}
//         style={{
//           position: 'absolute'
//         }}
//       />
//       <span
//         style={{
//           position: 'absolute',
//           right: '20px',
//           top: '35px'
//         }}
//       >
//         {cellSize}
//       </span>
//     </div>
//   )
// }
//
// export default HorizontalBar
