import { CLI } from './cli/CLI.js'
import { LaunchCommand } from './commands/LaunchCommand.js'
import { HelpCommand } from './commands/HelpCommand.js'
import { RolloutCommand } from './commands/RolloutCommand.js'
import { FuelCommand } from './commands/FuelCommand.js'
import { StatusCommand } from './commands/StatusCommand.js'
import { AbortCommand } from './commands/AbortCommand.js'
import { OrbitCommand } from './commands/OrbitCommand.js'
import { DemoCommand } from './commands/DemoCommand.js'
import { ResetCommand } from './commands/ResetCommand.js'

const registry = new Map()

const help = new HelpCommand(registry)
registry.set(help.name, help)

const launch = new LaunchCommand(registry)
registry.set(launch.name, launch)

const rollout = new RolloutCommand(registry)
registry.set(rollout.name, rollout)

const fuel = new FuelCommand(registry)
registry.set(fuel.name, fuel)

const status = new StatusCommand()
registry.set(status.name, status)

const abort = new AbortCommand()
registry.set(abort.name, abort)

const orbit = new OrbitCommand()
registry.set(orbit.name, orbit)

const demo = new DemoCommand(registry)
registry.set(demo.name, demo)

const reset = new ResetCommand()
registry.set(reset.name, reset)

const cli = new CLI(registry)

cli.run()
