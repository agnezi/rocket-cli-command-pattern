import { Rocket } from '../cli/Rocket.js'
import type { TerminalRenderer } from '../renderer/TerminalRenderer.js'
import { Command } from './Command.js'

export class DemoCommand extends Command {
  name = 'demo'
  description = 'Runs all commands in sequence'

  constructor(private registry: Map<string, Command>) {
    super()
  }

  async execute(_rocket: Rocket, renderer: TerminalRenderer): Promise<void> {
    const demoRocket = new Rocket()
    demoRocket.disablePersisntece()

    const sequence = ['rollout', 'fuel', 'launch', 'orbit', 'abort']

    for (const name of sequence) {
      const command = this.registry.get(name)
      if (!command) throw new Error(`Command "${name}" not found in registry`)
      await command.execute(demoRocket, renderer)
    }
  }
}
