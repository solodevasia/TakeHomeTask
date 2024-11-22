import { describe, expect, it } from 'vitest'
import {render} from '@testing-library/react'
import PageIndex from '../../pages'

describe("PageIndex", () => {
    it('should to be defined', () => expect(render(<PageIndex/>)).toBeDefined())

    it('should to be defined', () => expect(render(<PageIndex/>)).toMatchSnapshot())
})