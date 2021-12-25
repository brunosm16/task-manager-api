/* eslint-disable @typescript-eslint/strict-boolean-expressions */
export class TaskController {
  handle (httpRequest: any): any {
    if (!httpRequest.body.name) {
      return { statusCode: 400, body: new Error('Missing Param: name') }
    }

    if (!httpRequest.body.completed) {
      return { statusCode: 400, body: new Error('Missing Param: completed') }
    }
  }
}
