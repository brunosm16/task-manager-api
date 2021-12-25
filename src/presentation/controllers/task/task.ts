import { HttpRequest, HttpResponse } from '../../protocols/http'

export class TaskController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return { statusCode: 400, body: new Error('Missing Param: name') }
    }

    if (!httpRequest.body.completed) {
      return { statusCode: 400, body: new Error('Missing Param: completed') }
    }

    return { statusCode: 404, body: new Error('Not Found') }
  }
}
