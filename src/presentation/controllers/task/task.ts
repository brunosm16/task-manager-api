import { InvalidParamError, MissingParamError, ServerError } from '../../errors'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  BooleanValidator
} from '../../protocols'
import { badRequest, serverError } from '../../helpers/http-helper'

export class TaskController implements Controller {
  private readonly booleanValidator: BooleanValidator

  constructor (booleanValidator: BooleanValidator) {
    this.booleanValidator = booleanValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'completed']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { completed } = httpRequest.body

      const completedIsValid = this.booleanValidator.isValid(completed.toString())

      if (!completedIsValid) {
        return badRequest(new InvalidParamError('completed'))
      }

      return badRequest(new Error('Request Not Found'))
    } catch (error) {
      return serverError(new ServerError())
    }
  }
}
