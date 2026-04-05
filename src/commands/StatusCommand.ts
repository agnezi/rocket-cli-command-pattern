import type { Rocket } from '../cli/Rocket.js'
import type { TerminalRenderer } from '../renderer/TerminalRenderer.js'
import { Command } from './Command.js'

export class StatusCommand extends Command {
  name = 'status'
  description = 'Displays current rocket state'

  public async execute(rocket: Rocket, renderer: TerminalRenderer): Promise<void> {
    const state = rocket.getState()
    renderer.print(`\nRocket status: ${state}\n`)
  }
}
