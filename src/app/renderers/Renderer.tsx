import React, {
  ReactElement
} from 'react'
import {
  DEFAULT_RENDERER_TYPE,
  PATTERN_RENDERERS,
  PatternRenderer,
  PatternRendererProps, RENDERER_TYPES, RendererConfig,
} from './models'

export interface RendererProps {
  config: RendererConfig
  rendererType?: RENDERER_TYPES.TRIANGLIFY
}

const Renderer = ({ ...props }: RendererProps): ReactElement => {
  console.log("props", props)

  const _render = (): ReactElement => {
    const { config, rendererType = DEFAULT_RENDERER_TYPE } = props
    const RendererComponent: PatternRenderer = PATTERN_RENDERERS[rendererType]
    const rendererProps: PatternRendererProps = { config }
    return (
      <RendererComponent {...rendererProps} />
    )
  }

  return _render()
}

export default Renderer
