import type { Command } from '../commands/Command.js'

export class CommandParser {
  constructor(private registry: Map<string, Command>) {}

  public parse(argv: string[]): Command {
    const name = argv[2]

    if (!name) {
      throw new Error(
        'No command provided. Run with --help to see available commands.',
      )
    }

    const command = this.registry.get(name)

    if (!command) {
      throw new Error(`Unknown command: "${name}"`)
    }

    return command
  }
}
