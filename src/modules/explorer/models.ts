import {ReactElement} from 'react'

export enum COORDS {
  X = 0,
  Y = 1
}

export type ExplorerConfig = {
  backgroundHeight: number
  backgroundWidth: number
}

export type Renderer = (props: { config: ExplorerConfig }) => ReactElement
