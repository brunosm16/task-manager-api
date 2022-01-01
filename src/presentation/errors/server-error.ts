export class ServerError extends Error {
  constructor () {
    super('Invalid Server Error')
    this.name = 'ServerError'
  }
}
