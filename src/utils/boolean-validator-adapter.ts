import { BooleanValidator } from '../presentation/protocols'
import validator from 'validator'

export class BooleanValidatorAdapter implements BooleanValidator {
  isValid (completed: string): boolean {
    return validator.isBoolean(completed)
  }
}
