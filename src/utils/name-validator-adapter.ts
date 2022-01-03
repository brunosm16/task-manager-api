import validator from 'validator'
import { NameValidator } from '../presentation/protocols/name-validator'

export class NameValidatorAdapter implements NameValidator {
  isValid (name: string): boolean {
    const isString = !validator.isNumeric(name)
    const isCorrectLength = name.length >= 5 && name.length >= 500

    return isString && isCorrectLength
  }
}
