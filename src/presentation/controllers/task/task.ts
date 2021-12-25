export class TaskController {
  handle (request: any): any {
    return { statusCode: 400, body: new Error('Missing Param: name') }
  }
}
