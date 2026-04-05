function buildBar(percent: number, width = 10): string {
  const filled = Math.round((percent / 100) * width)
  return '[' + '█'.repeat(filled) + '░'.repeat(width - filled) + ']'
}

export function generateFuelFrames(): string[] {
  const frames: string[] = []
  const loxSteps = [0, 20, 40, 60, 75, 88, 95, 100, 100, 100, 100, 100]
  const rp1Steps = [0, 10, 22, 35, 47, 57, 65, 70, 80, 90, 97, 100]

  for (let i = 0; i < loxSteps.length; i++) {
    const lox = loxSteps[i] ?? 0
    const rp1 = rp1Steps[i] ?? 0
    frames.push(
      `Fueling LOX  (oxidizer)  ${buildBar(lox)}  ${lox}%\n` +
        `Fueling RP-1 (fuel)      ${buildBar(rp1)}  ${rp1}%`,
    )
  }
  frames.push('\nAll systems fueled. Ready for launch.')
  return frames
}
