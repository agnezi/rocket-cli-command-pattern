import type { Rocket } from '../cli/Rocket.js'
import { abortFrames } from '../renderer/animations/abortFrames.js'
import type { TerminalRenderer } from '../renderer/TerminalRenderer.js'
import { Command } from './Command.js'

export class AbortCommand extends Command {
  name = 'abort'
  description = 'ABORT'

  public async execute(
    rocket: Rocket,
    renderer: TerminalRenderer,
  ): Promise<void> {
    const state = rocket.getState()

    if (state === 'idle' || state === 'aborted') {
      renderer.print(`Cannot abort: rocket is currently "${state}"`)
      return
    }

    rocket.transition('aborted')
    renderer.hideCursor()
    await renderer.stream(abortFrames, 600)
    renderer.showCursor()
  }
}
