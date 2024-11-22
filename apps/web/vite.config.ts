import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    test: {
        environment: 'jsdom',
        passWithNoTests: true,
        coverage: {
            include: ["src/**/*.tsx","!src/pages/_*.tsx"],
            provider: 'v8',
            thresholds: {
                branches: 100,
                lines: 100,
                statements: 100,
                functions: 100
            }
        }
    },
    plugins: [react()]
})