import { InvalidParamError, MissingParamError, ServerError } from '../../errors'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  BooleanValidator
} from '../../protocols'
import { badRequest, serverError } from '../../helpers/http-helper'
import { NameValidator } from '../../protocols/name-validator'

export class TaskController implements Controller {
  private readonly booleanValidator: BooleanValidator
  private readonly nameValidator: NameValidator

  constructor (
    booleanValidator: BooleanValidator,
    nameValidator: NameValidator
  ) {
    this.booleanValidator = booleanValidator
    this.nameValidator = nameValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'completed']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, completed } = httpRequest.body

      const completedIsValid = this.booleanValidator.isValid(
        completed.toString()
      )

      const nameIsValid = this.nameValidator.isValid(name)

      if (!completedIsValid) {
        return badRequest(new InvalidParamError('completed'))
      }

      if (!nameIsValid) {
        return badRequest(new InvalidParamError('name'))
      }

      return badRequest(new Error('Request Not Found'))
    } catch (error) {
      return serverError(new ServerError())
    }
  }
}
