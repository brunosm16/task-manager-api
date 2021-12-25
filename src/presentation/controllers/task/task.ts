import { MissingParamError } from '../../errors/missing-param-error'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class TaskController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }

    if (!httpRequest.body.completed) {
      return {
        statusCode: 400,
        body: new MissingParamError('completed')
      }
    }

    return { statusCode: 400, body: new Error('Request Not Found') }
  }
}
