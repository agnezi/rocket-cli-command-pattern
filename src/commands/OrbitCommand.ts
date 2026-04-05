import type { Rocket } from '../cli/Rocket.js'
import { orbitFrames } from '../renderer/animations/orbitFrames.js'
import type { TerminalRenderer } from '../renderer/TerminalRenderer.js'
import { Command } from './Command.js'

export class OrbitCommand extends Command {
  name = 'orbit'
  description = 'Shows orbital path animation'

  async execute(rocket: Rocket, renderer: TerminalRenderer): Promise<void> {
    if (rocket.getState() !== 'orbiting') {
      renderer.print(
        `Cannot show orbit: rocket is currently "${rocket.getState()}`,
      )
      return
    }
    renderer.hideCursor()
    await renderer.animate(orbitFrames, 300)
    renderer.showCursor()
  }
}
