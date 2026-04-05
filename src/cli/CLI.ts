import { TerminalRenderer } from '../renderer/TerminalRenderer.js'
import { Rocket } from './Rocket.js'
import { CommandParser } from '../parser/ComandParser.js'
import type { Command } from '../commands/Command.js'

export class CLI {
  private rocket: Rocket
  private renderer: TerminalRenderer
  private parser: CommandParser

  constructor(registry: Map<string, Command>) {
    this.rocket = new Rocket()
    this.renderer = new TerminalRenderer()
    this.parser = new CommandParser(registry)
  }

  public async run(): Promise<void> {
    try {
      const command = this.parser.parse(process.argv)
      await command.execute(this.rocket, this.renderer)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
      process.exit(1)
    }
  }
}
