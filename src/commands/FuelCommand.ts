import type { Rocket } from '../cli/Rocket.js'
import { generateFuelFrames } from '../renderer/animations/fuelFrames.js'
import type { TerminalRenderer } from '../renderer/TerminalRenderer.js'
import { Command } from './Command.js'

export class FuelCommand extends Command {
  name = 'fuel'
  description = 'Fuel the Rocket'

  constructor(private registry: Map<string, Command>) {
    super()
  }

  public async execute(
    rocket: Rocket,
    renderer: TerminalRenderer,
  ): Promise<void> {
    rocket.transition('fueling')
    await renderer.animate(generateFuelFrames(), 400)
    rocket.transition('fueled')
  }
}
