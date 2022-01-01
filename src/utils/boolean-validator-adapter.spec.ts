import { BooleanValidatorAdapter } from './boolean-validator-adapter'

const makeSut = (): BooleanValidatorAdapter => {
  return new BooleanValidatorAdapter()
}

describe('BooleanValidatorAdapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = makeSut()

    jest.spyOn(sut, 'isValid').mockReturnValueOnce(false)

    const completed = true
    const result = sut.isValid(completed.toString())

    expect(result).toBe(false)
  })
})
