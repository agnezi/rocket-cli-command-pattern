import type { Rocket } from '../cli/Rocket.js'
import { rolloutFrames } from '../renderer/animations/rolloutFrames.js'
import type { TerminalRenderer } from '../renderer/TerminalRenderer.js'
import { Command } from './Command.js'

export class RolloutCommand extends Command {
  name = 'rollout'
  description = 'Moves rocket to the launch pad'

  constructor(private registry: Map<string, Command>) {
    super()
  }

  public async execute(
    rocket: Rocket,
    renderer: TerminalRenderer,
  ): Promise<void> {
    await renderer.stream(rolloutFrames, 400)
    rocket.transition('on_pad')
  }
}
