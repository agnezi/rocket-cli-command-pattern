import type { Rocket } from '../cli/Rocket.js'
import type { TerminalRenderer } from '../renderer/TerminalRenderer.js'

export abstract class Command {
  abstract name: string
  abstract description: string
  abstract execute(rocket: Rocket, renderer: TerminalRenderer): Promise<void>
}
