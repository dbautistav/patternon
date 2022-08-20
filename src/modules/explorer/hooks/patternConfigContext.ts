import { createContext } from 'react'

const config: {
  cellSize?: number,
  cellSize2PxScale?,
  variance?: number,
} = {}

export const ConfigContext = createContext(config)
