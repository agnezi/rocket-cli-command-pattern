#!/usr/bin/env node

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

const launch = new LaunchCommand()
const rollout = new RolloutCommand()
const status = new StatusCommand()
const abort = new AbortCommand()
const orbit = new OrbitCommand()
const reset = new ResetCommand()
const help = new HelpCommand(registry)
const fuel = new FuelCommand(registry)
const demo = new DemoCommand(registry)

registry.set(help.name, help)
registry.set(launch.name, launch)
registry.set(rollout.name, rollout)
registry.set(fuel.name, fuel)
registry.set(status.name, status)
registry.set(abort.name, abort)
registry.set(orbit.name, orbit)
registry.set(demo.name, demo)
registry.set(reset.name, reset)

const cli = new CLI(registry)

cli.run()
