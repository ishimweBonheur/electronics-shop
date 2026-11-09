export const clampProgress = (value: number) => Math.min(1, Math.max(0, value))
export const scrollProgress = (scroll: number, start: number, end: number) =>
  end <= start ? (scroll >= end ? 1 : 0) : clampProgress((scroll - start) / (end - start))
export const interpolate = (from: number, to: number, progress: number) =>
  from + (to - from) * clampProgress(progress)
