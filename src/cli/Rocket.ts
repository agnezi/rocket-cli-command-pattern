import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'fs'
import { join } from 'path'

export type RocketState =
  | 'idle'
  | 'on_pad'
  | 'fueling'
  | 'fueled'
  | 'launching'
  | 'orbiting'
  | 'aborted'

const STATE_FILE = join(process.cwd(), '.rocket-state.json')

export class Rocket {
  constructor() {
    if (existsSync(STATE_FILE)) {
      const data = JSON.parse(readFileSync(STATE_FILE, 'utf-8'))
      this.state = data.state
    }
  }

  private state: RocketState = 'idle'
  private shouldPersist = true

  private static readonly validTransitions: Record<RocketState, RocketState[]> =
    {
      idle: ['on_pad'],
      on_pad: ['fueling', 'aborted'],
      fueling: ['fueled', 'aborted'],
      fueled: ['launching', 'aborted'],
      launching: ['orbiting', 'aborted'],
      orbiting: ['aborted'],
      aborted: [],
    }

  public disablePersisntece(): void {
    this.shouldPersist = false
  }

  public getState(): RocketState {
    return this.state
  }

  public transition(next: RocketState): void {
    const allowed = Rocket.validTransitions[this.state]

    if (!allowed.includes(next)) {
      throw new Error(`Invalid transition: ${this.state} -> ${next}`)
    }

    this.state = next

    if (this.shouldPersist) {
      writeFileSync(STATE_FILE, JSON.stringify({ state: this.state }))
    }
  }

  public reset(): void {
    this.state = 'idle'
    if (existsSync(STATE_FILE)) {
      unlinkSync(STATE_FILE)
    }
  }
}
