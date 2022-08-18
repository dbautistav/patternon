import { createContext } from 'react'

const config: {
  cellSize?: number,
  cellSize2PxScale?
} = {}

export const ConfigContext = createContext(config)
