import { InvalidParamError } from '../../errors/invalid-param-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest } from '../../helpers/http-helper'
import { BooleanValidator } from '../../protocols/boolean-validator'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class TaskController implements Controller {
  private readonly booleanValidator: BooleanValidator

  constructor (booleanValidator: BooleanValidator) {
    this.booleanValidator = booleanValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'completed']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const { completed } = httpRequest.body

    const completedIsValid = this.booleanValidator.isValid(completed)

    if (!completedIsValid) {
      return badRequest(new InvalidParamError('completed'))
    }

    return badRequest(new Error('Request Not Found'))
  }
}
