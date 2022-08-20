import TrianglifyRenderer from './trianglify/TrianglifyRenderer'
import {ReactElement} from 'react'

export type RendererConfig = {
  backgroundHeight: number
  backgroundWidth: number
}

export const DEFAULT_RENDERER_TYPE = 'DEFAULT'

export enum RENDERER_TYPES {
  TRIANGLIFY = 'TRIANGLIFY'
}

export const PATTERN_RENDERERS = {
  [DEFAULT_RENDERER_TYPE]: TrianglifyRenderer,
  [RENDERER_TYPES.TRIANGLIFY]: TrianglifyRenderer
}

export type PatternRenderer = (props: { config: RendererConfig }) => ReactElement

export interface PatternRendererProps {
  config: RendererConfig
}
