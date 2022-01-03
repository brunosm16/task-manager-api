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

    const name = 'valid_name'

    const result = sut.isValid(name.toString())

    expect(result).toBe(true)
  })

  test('Should call validator with correct value', () => {
    const sut = makeSut()

    const name = 'valid_name'

    const isValidSpy = jest.spyOn(sut, 'isValid')

    sut.isValid(name.toString())

    expect(isValidSpy).toHaveBeenCalledWith(name.toString())
  })
})
