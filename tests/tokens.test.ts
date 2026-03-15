import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const css = readFileSync(resolve(__dirname, '../src/tokens/tokens.css'), 'utf-8')

describe('tokens source', () => {
  it('defines --color-primary', () => {
    expect(css).toContain('--color-primary')
  })

  it('defines dark mode tokens', () => {
    expect(css).toContain('prefers-color-scheme: dark')
  })

  it('defines spacing tokens', () => {
    expect(css).toContain('--space-4')
  })

  it('defines border radius tokens', () => {
    expect(css).toContain('--radius-md')
  })
})
