import type { Rocket } from '../cli/Rocket.js'
import { Command } from './Command.js'
import type { TerminalRenderer } from '../renderer/TerminalRenderer.js'

export class HelpCommand extends Command {
  name = 'help'
  description = 'List all available commands'

  constructor(private registry: Map<string, Command>) {
    super()
  }

  public async execute(
    _rocket: Rocket,
    renderer: TerminalRenderer,
  ): Promise<void> {
    renderer.print('\nAvailable commands:\n')

    for (const command of this.registry.values()) {
      renderer.print(`  ${command.name.padEnd(12)} ${command.description}`)
    }
    renderer.print('')
  }
}
