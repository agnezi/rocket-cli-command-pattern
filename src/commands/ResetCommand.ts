import type { Rocket } from '../cli/Rocket.js'
import type { TerminalRenderer } from '../renderer/TerminalRenderer.js'
import { Command } from './Command.js'

export class ResetCommand extends Command {
  name = 'reset'
  description = 'Resets rocket state back to idle'

  async execute(rocket: Rocket, renderer: TerminalRenderer): Promise<void> {
    rocket.reset()
    renderer.print('\nRocket state reset. Back to idle.\n')
  }
}
