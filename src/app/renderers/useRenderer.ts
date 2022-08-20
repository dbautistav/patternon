import Renderer, {
  RendererProps
} from './Renderer'
import {ReactElement} from 'react'

interface RendererHook {
  Renderer: (props: RendererProps) => ReactElement
}

const useRenderer = (): RendererHook => {
  return {
    // FIXME: add `Renderer`-specific configuration!
    Renderer
  }
}

export default useRenderer
