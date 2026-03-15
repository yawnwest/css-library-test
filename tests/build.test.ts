import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const dist = readFileSync(resolve(__dirname, '../dist/style.css'), 'utf-8')

describe('dist/style.css', () => {
  it('contains color tokens', () => {
    expect(dist).toContain('--color-primary')
  })

  it('contains dark mode tokens', () => {
    expect(dist).toContain('prefers-color-scheme:dark')
  })

  it('contains button styles', () => {
    expect(dist).toContain('.btn')
  })

  it('contains button variants', () => {
    expect(dist).toContain('.btn-primary')
    expect(dist).toContain('.btn-secondary')
    expect(dist).toContain('.btn-ghost')
  })
})
