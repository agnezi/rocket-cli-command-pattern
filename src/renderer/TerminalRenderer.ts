export class TerminalRenderer {
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  public clear(): void {
    process.stdout.write('\x1Bc')
  }

  public hideCursor(): void {
    process.stdout.write('\x1B[?25l')
  }

  public showCursor(): void {
    process.stdout.write('\x1B[?25h')
  }

  public print(text: string): void {
    process.stdout.write(text + '\n')
  }

  public async stream(frames: string[], intervalMs: number): Promise<void> {
    for (const frame of frames) {
      this.print(frame)
      await this.sleep(intervalMs)
    }
  }

  public async animate(frames: string[], intervalMs: number): Promise<void> {
    for (const frame of frames) {
      this.clear()
      this.print(frame)
      await this.sleep(intervalMs)
    }
  }
}
