# Rocket CLI — Project Guide

## Vision

A terminal-based CLI where the user sends commands to a rocket and sees animated responses in the terminal. Think: launch, orbit, fuel check, abort — each command triggers a unique ASCII animation sequence.

## Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript (strict mode)
- **Package manager:** npm
- **Module system:** ESM (`"type": "module"`, `module: NodeNext`)
- **Dev runner:** `tsx` (instead of `ts-node` — handles ESM natively)

## Architecture: Command Pattern + Chain of Responsibility

> **Reference:** https://refactoring.guru/design-patterns/command

### What is the Command Pattern?

The **Command Pattern** is a behavioral design pattern that turns a request into a standalone object. Instead of calling a function directly, you wrap the request — along with all the information needed to perform it — inside a class.

This means:
- The **caller** (CLI) doesn't know how a command works internally, only that it can call `execute()`
- The **command** encapsulates everything: what to do, what state to transition, what to render
- New commands can be added without changing any existing code (**Open/Closed Principle**)
- Commands become first-class objects: they can be stored in a registry, queued, composed, or run in sequence (like `DemoCommand` does)

### How it maps to this project

| Pattern role     | This project              |
|------------------|---------------------------|
| **Command**      | `abstract class Command`  |
| **ConcreteCommand** | `LaunchCommand`, `FuelCommand`, `AbortCommand`, etc. |
| **Receiver**     | `Rocket` (holds state, responds to transitions) |
| **Invoker**      | `CLI` (calls `command.execute()`) |
| **Client**       | `src/index.ts` (builds the registry and wires everything up) |

### Why this pattern fits a CLI perfectly

A CLI is essentially a stream of named requests. The Command Pattern makes each request self-contained: the `CommandParser` maps a string to a `Command` object, and the `CLI` calls `execute()` without knowing anything else. Adding a new rocket command means creating a new file — nothing else changes.

### Supporting patterns

- **Chain of Responsibility** — `CommandParser` walks the registry looking for a match, decoupling input parsing from execution logic
- **Renderer abstraction** — a single `TerminalRenderer` handles all drawing/animation concerns, keeping it out of command logic
- **State Machine** — `Rocket` enforces valid transitions, ensuring commands can only run in the right order

## Core Class Structure

```
src/
  commands/
    Command.ts          # Abstract base class / interface
    LaunchCommand.ts    # Example: launch the rocket
    FuelCommand.ts      # Example: check fuel levels
    AbortCommand.ts     # Example: abort sequence
    index.ts            # Command registry
  renderer/
    TerminalRenderer.ts # Clears screen, draws frames, controls timing
    Animation.ts        # Animation frame sequences (ASCII art arrays)
  parser/
    CommandParser.ts    # Parses raw argv into a Command instance
  cli/
    Rocket.ts           # The main "rocket" entity — state machine
    CLI.ts              # Entry point: reads input, delegates to parser
  index.ts              # Bootstraps and runs CLI
```

## Key Contracts

### Command interface
Every command must implement:
- `execute(rocket: Rocket, renderer: TerminalRenderer): Promise<void>`
- `name: string`
- `description: string`

### Rocket state machine
The `Rocket` class holds state:

```
idle → on_pad → fueling → fueled → launching → orbiting
                                             ↘ aborted
```

Valid transitions are enforced by `Rocket.transition()` — invalid transitions throw an error.

State is persisted across CLI invocations in `.rocket-state.json` at the project root. `Rocket` reads this file on instantiation and writes it on every `transition()` call. Delete the file to reset state to `idle`.

### TerminalRenderer
Responsible for:
- Clearing the screen (`process.stdout.write('\x1Bc')`)
- Rendering frames at a given interval (using `setInterval` / `setTimeout`)
- Cursor hiding/showing during animations

## Development Workflow

We work **feature by feature**. Each feature follows this order:
1. Define the command contract and expected animation
2. Implement the Command class
3. Wire up the animation frames in `Animation.ts`
4. Register in the command registry
5. Test manually via `npx ts-node src/index.ts <command>`
6. Update this file with any new decisions

## Animations

Currently using placeholder ASCII frames. Full animations are planned after all commands are implemented.

Each command's frames live in `src/renderer/animations/` as a named export (e.g. `launchFrames`, `fuelFrames`).

TODO: replace placeholders with real multi-frame ASCII art animations once all commands are done.

**Convention:** every frame must include a descriptive text line explaining what is happening (e.g. `"🚀 Igniting engines..."`). This text stays even after ASCII art is added — it runs alongside the animation, not instead of it.

### TerminalRenderer methods

- `animate(frames, intervalMs)` — clears screen between frames. Use for visual animations (ASCII art replacing itself).
- `stream(frames, intervalMs)` — appends each frame without clearing. Use for status sequences that should accumulate (e.g. launch log).

## Commands Planned

| Command       | Description                              | Status      |
|---------------|------------------------------------------|-------------|
| `rollout`     | Moves rocket to the launch pad           | [x] done    |
| `fuel`        | Fuels LOX and RP-1 simultaneously        | [x] done    |
| `launch`      | Ignites engines, rocket lifts off        | [x] done    |
| `orbit`       | Shows orbital path animation             | [x] done    |
| `abort`       | Emergency abort sequence                 | [x] done    |
| `status`      | Displays rocket current state            | [x] done    |
| `help`        | Lists all available commands             | [x] done    |

## Conventions

- All commands live in `src/commands/`, one file per command
- Animation frames are plain string arrays, defined in `src/renderer/animations/`
- No `any` types — use strict TypeScript throughout
- Async/await only, no raw callbacks
- Do not mix rendering logic into command classes

## Claude Behavior in This Project

> **This is a learning project. The goal is to understand the Command Pattern and how to apply it to build a CLI in TypeScript. The user writes all the code. Claude's role is to teach, explain, and guide — never to implement.**

### Rules — no exceptions

- **Never write implementation code.** Do not write TypeScript classes, functions, methods, or logic on behalf of the user — even if asked directly. The user writes everything.
- **Never create or edit source files.** `src/` is the user's territory.
- **Guide with intent, not with answers.** When the user needs to implement something, explain what to do and why, show the structure or signature if needed, but leave the writing to them.
- **Teach the concept behind every step.** Before saying "add X", explain why X exists, what problem it solves, and how it fits the pattern.
- **Exceptions — documentation and visual content:** ASCII art frames, string arrays with visual content (like `orbitFrames`), and content in `CLAUDE.md` or `README.md` may be written and edited directly by Claude — documentation is content, not implementation.

### Learning objectives

Every feature and decision in this project exists to teach one or more of these concepts:

- What the Command Pattern is and why it exists
- How to separate concerns: parsing, execution, state, rendering
- How the Open/Closed Principle works in practice (add a command = add a file, nothing else changes)
- How a state machine enforces business rules
- How to structure a real CLI in TypeScript using ESM and strict mode

### How to guide

- Before any implementation, explain the concept and why it matters in the context of the Command Pattern
- Describe what the user needs to create and what contract it must satisfy
- Show method signatures or interfaces as reference, not as code to copy
- If the user gets an error, explain the root cause and what to look for — do not paste the fix
- Ask design questions before implementation starts, so decisions are made consciously
- Connect every new piece back to the pattern: "this is the Receiver", "this is why the Invoker doesn't need to know about this"
- Work one feature at a time, confirm before moving to the next

### Project hygiene

- Update the Commands table as features are completed
- Document every design decision in this file immediately when it is made
- Keep the `## Animations` section up to date with the current rendering approach
