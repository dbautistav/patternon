import { createContext } from 'react'
const config: {
  cellSize?: number
} = {}
export const ConfigContext = createContext(config)
