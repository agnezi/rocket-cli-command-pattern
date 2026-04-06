import type { Rocket } from '../cli/Rocket.js'
import { launchFrames } from '../renderer/animations/lauchFrames.js'
import type { TerminalRenderer } from '../renderer/TerminalRenderer.js'
import { Command } from './Command.js'

export class LaunchCommand extends Command {
  name = 'launch'
  description = 'Ignites engines and lifts off'

  public async execute(
    rocket: Rocket,
    renderer: TerminalRenderer,
  ): Promise<void> {
    rocket.transition('launching')
    renderer.hideCursor()
    await renderer.animate(launchFrames, 500)
    rocket.transition('orbiting')
    renderer.showCursor()
  }
}
