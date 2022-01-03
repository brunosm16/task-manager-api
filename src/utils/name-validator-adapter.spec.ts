import validator from 'validator'
import { NameValidatorAdapter } from './name-validator-adapter'

jest.mock('validator', () => ({
  isNumeric (value: string) {
    return true
  }
}))

const makeSut = (): NameValidatorAdapter => {
  return new NameValidatorAdapter()
}

describe('Name Validator', () => {
  test('Should return false if isNumeric returns false', () => {
    const sut = makeSut()

    jest.spyOn(validator, 'isNumeric').mockReturnValueOnce(false)

    const name = 123

    const result = sut.isValid(name.toString())

    expect(result).toBe(false)
  })
})
