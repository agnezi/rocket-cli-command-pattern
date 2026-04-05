# 🚀 Rocket CLI

A terminal-based CLI where you send commands to a rocket and watch animated responses play out in real time. Every command triggers a unique ASCII animation sequence — from rolling the rocket out to the launch pad, fueling both propellants simultaneously, lifting off, and reaching orbit.

## Installation

```bash
npm install
```

## Running

```bash
npm run dev <command>
```

## Commands

The rocket follows a strict launch sequence. Commands must be executed in order — the state machine enforces valid transitions and will reject commands that don't make sense for the current state.

| Command   | Description                          | Valid from state        |
|-----------|--------------------------------------|-------------------------|
| `rollout` | Moves rocket to the launch pad       | `idle`                  |
| `fuel`    | Fuels LOX and RP-1 simultaneously    | `on_pad`                |
| `launch`  | Ignites engines and lifts off        | `fueled`                |
| `orbit`   | Shows the orbital path animation     | `orbiting`              |
| `abort`   | Emergency abort sequence             | any (except idle)       |
| `status`  | Displays current rocket state        | any                     |
| `reset`   | Resets rocket back to idle           | any                     |
| `demo`    | Runs all commands in sequence        | any                     |
| `help`    | Lists all available commands         | any                     |

### Full launch sequence

```bash
npm run dev rollout   # idle → on_pad
npm run dev fuel      # on_pad → fueled
npm run dev launch    # fueled → orbiting
npm run dev orbit     # watch the orbital animation
npm run dev status    # orbiting
npm run dev abort     # orbiting → aborted
npm run dev reset     # back to idle
```

### Or just run the demo

```bash
npm run dev demo
```

Runs the full sequence automatically without persisting state changes.

## State machine

The rocket's state is persisted between CLI invocations in `.rocket-state.json` at the project root. This means you can run commands one at a time and the rocket remembers where it left off.

```
idle → on_pad → fueling → fueled → launching → orbiting
                                             ↘ aborted
```

Invalid transitions throw an error:

```bash
npm run dev launch  # Error: Invalid transition: idle → launching
```

To start over, run `npm run dev reset` or delete `.rocket-state.json`.

---

## Architecture: Command Pattern

> Full pattern reference: https://refactoring.guru/design-patterns/command

This project is built around the **Command Pattern** — a behavioral design pattern that turns each user request into a self-contained object.

### The core idea

Instead of the CLI directly calling functions when a user types `launch`, it creates a `LaunchCommand` object and calls `execute()` on it. The command object knows everything it needs: what state to transition the rocket to, what animation to play, and in what order.

```
user input → CommandParser → Command object → execute(rocket, renderer)
```

This indirection is what makes the pattern powerful.

### Why it fits a CLI perfectly

A command-line interface is, at its core, a stream of named requests. The Command Pattern maps naturally onto this:

- Each CLI argument becomes a **Command object**
- The **invoker** (`CLI`) only knows how to call `execute()` — it doesn't care what the command does
- The **receiver** (`Rocket`) holds the state and responds to transitions
- New commands can be added by creating a new file — nothing else changes

### The roles in this project

```
┌─────────────────────────────────────────────────────────┐
│                     src/index.ts                        │
│  Client: builds the registry, wires everything up       │
└────────────────────────┬────────────────────────────────┘
                         │ creates & registers
                         ▼
┌─────────────────────────────────────────────────────────┐
│              LaunchCommand / FuelCommand / ...           │
│  ConcreteCommand: encapsulates one action               │
│  implements execute(rocket, renderer): Promise<void>    │
└──────────────┬──────────────────────┬───────────────────┘
               │ transitions          │ renders
               ▼                      ▼
┌──────────────────────┐  ┌───────────────────────────────┐
│        Rocket        │  │       TerminalRenderer        │
│  Receiver: holds     │  │  Draws frames, controls       │
│  state, enforces     │  │  timing, hides cursor         │
│  valid transitions   │  │                               │
└──────────────────────┘  └───────────────────────────────┘
               ▲
               │ parses input into a Command
┌──────────────────────┐
│    CommandParser     │
│  Invoker: maps       │
│  argv[2] → Command   │
└──────────────────────┘
```

| Pattern role        | This project                                      |
|---------------------|---------------------------------------------------|
| **Command**         | `abstract class Command`                          |
| **ConcreteCommand** | `LaunchCommand`, `FuelCommand`, `AbortCommand`... |
| **Receiver**        | `Rocket` — holds state, responds to transitions   |
| **Invoker**         | `CLI` — calls `command.execute()`                 |
| **Client**          | `src/index.ts` — builds the registry             |

### Open/Closed Principle in practice

Adding a new rocket command requires exactly one thing: a new file in `src/commands/`. The parser, the CLI, the renderer, and the Rocket class are never touched. This is the **Open/Closed Principle** — open for extension, closed for modification.

### Commands as first-class objects

Because commands are objects, they can be composed. `DemoCommand` demonstrates this: it holds a reference to the registry and calls each command's `execute()` in sequence, running the full launch sequence in a single invocation — without any of the commands knowing they're being orchestrated.

```typescript
for (const name of ['rollout', 'fuel', 'launch', 'orbit', 'abort']) {
  await this.registry.get(name)?.execute(demoRocket, renderer)
}
```

This composition would be impossible with plain functions — it only works because commands are objects with a shared interface.

---

## Tech stack

- **Runtime:** Node.js
- **Language:** TypeScript (strict mode)
- **Module system:** ESM (`"type": "module"`, `module: NodeNext`)
- **Dev runner:** `tsx`
- **Linting:** ESLint + typescript-eslint
- **Formatting:** Prettier
