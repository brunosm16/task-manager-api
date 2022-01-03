import { NameValidator } from '../presentation/protocols/name-validator'

export class NameValidatorAdapter implements NameValidator {
  isValid (name: string): boolean {
    const isString = parseInt(name, 10)

    const isCorrectLength = name.length >= 4 && name.length <= 500

    return !isString && isCorrectLength
  }
}
