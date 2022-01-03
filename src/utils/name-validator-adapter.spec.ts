import { NameValidatorAdapter } from './name-validator-adapter'

const makeSut = (): NameValidatorAdapter => {
  return new NameValidatorAdapter()
}

describe('Name Validator', () => {
  test('Should return false if validator returns false', () => {
    const sut = makeSut()

    const name = 123

    const result = sut.isValid(name.toString())

    expect(result).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = makeSut()

    const name = 'abcde'

    const result = sut.isValid(name.toString())

    expect(result).toBe(true)
  })
})
