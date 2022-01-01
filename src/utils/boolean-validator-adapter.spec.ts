import { BooleanValidatorAdapter } from './boolean-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isBoolean (completed: true): boolean {
    return true
  }
}))

const makeSut = (): BooleanValidatorAdapter => {
  return new BooleanValidatorAdapter()
}

describe('BooleanValidatorAdapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = makeSut()

    jest.spyOn(validator, 'isBoolean').mockReturnValueOnce(false)

    const completed = true
    const result = sut.isValid(completed.toString())

    expect(result).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = makeSut()

    const completed = true
    const result = sut.isValid(completed.toString())

    expect(result).toBe(true)
  })
})
